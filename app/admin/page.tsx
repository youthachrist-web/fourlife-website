import type { Metadata } from "next";
import { AdminClient } from "./admin-client";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6">
      <AdminClient />
    </div>
  );
}
