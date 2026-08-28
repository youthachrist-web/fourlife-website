"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { LeadCta } from "@/components/lead/lead-cta";
import { cta, site } from "@/lib/content";

/**
 * Sticky bottom action bar on small screens (medjoy-style). Appears after the
 * hero scrolls away and hides on the contact/diagnostic pages where the form is
 * already the focus.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contato" || pathname === "/diagnostico") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <LeadCta size="lg" className="h-12 flex-1">
          {cta.primary.label} <ArrowRight className="h-4 w-4" />
        </LeadCta>
        <a
          href={site.contact.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-300 text-primary"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
