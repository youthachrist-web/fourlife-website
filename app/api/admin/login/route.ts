import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { getEnv } from "@/lib/env";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  createSessionToken,
  setAdminCookie,
  verifyPassword,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

const GENERIC = { ok: false, error: "E-mail ou senha inválidos." };

export async function POST(req: Request) {
  const env = getEnv();
  if (!env.AUTH_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Admin não configurado." },
      { status: 503 },
    );
  }

  const ip = clientIp(req.headers);
  const rl = rateLimit(`admin-login:${ip}`, 10, 5 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false, error: "Indisponível." }, { status: 503 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json(GENERIC, { status: 400 });

  const { email, password } = parsed.data;
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  // Constant-ish work factor even when the user does not exist.
  if (!user || user.disabled) {
    await verifyPassword(password, "$2a$12$0000000000000000000000000000000000000000000000000000a");
    return NextResponse.json(GENERIC, { status: 401 });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return NextResponse.json(
      { ok: false, error: "Conta temporariamente bloqueada. Tente mais tarde." },
      { status: 423 },
    );
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    const attempts = user.failedAttempts + 1;
    const lock =
      attempts >= env.ADMIN_LOCK_THRESHOLD
        ? new Date(Date.now() + env.ADMIN_LOCK_MINUTES * 60_000)
        : null;
    await db
      .update(adminUsers)
      .set({ failedAttempts: attempts, lockedUntil: lock, updatedAt: new Date() })
      .where(eq(adminUsers.id, user.id));
    return NextResponse.json(GENERIC, { status: 401 });
  }

  await db
    .update(adminUsers)
    .set({
      failedAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(adminUsers.id, user.id));

  const token = await createSessionToken({ sub: user.id, email: user.email });
  await setAdminCookie(token);
  return NextResponse.json({ ok: true });
}
