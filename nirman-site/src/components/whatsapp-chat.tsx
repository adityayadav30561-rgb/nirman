"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { site } from "@/content/site";

/*
 * Floating WhatsApp chat (docs/sections/s6-brand-contact.md; user,
 * 2026-11-12). A button at the bottom right opens a small chat window; the
 * visitor types a message and presses Enter (or Send), and WhatsApp opens in
 * a new tab with the message ready for site.whatsapp. Shift+Enter makes a
 * new line. Nothing is sent from this site: WhatsApp does the sending.
 * The button follows the visitor's reference (WhatsApp green, a chat
 * bubble, "Chat with us") and uses a generic bubble, not the WhatsApp logo
 * (client rule: no WhatsApp logos in our own artwork).
 * A "whatsapp_chat" event goes to the data layer (no message text).
 * Hidden on /studio/. Motion: Framer Motion; instant under reduced motion.
 */
const GREEN = "#25d366";

export function WhatsAppChat() {
  const id = useId();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [hint, setHint] = useState("");
  const box = useRef<HTMLTextAreaElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    box.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!site.whatsapp || pathname.startsWith("/studio")) return null;

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const message = text.trim();
    if (!message) {
      setHint("Type a message first.");
      box.current?.focus();
      return;
    }
    const page = typeof window !== "undefined" ? window.location.href : site.url;
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${message}\n\n(From ${page.replace(/^https?:\/\//, "")})`)}`;
    const w = window as unknown as { dataLayer?: unknown[] };
    (w.dataLayer = w.dataLayer || []).push({ event: "whatsapp_chat", page_path: window.location.pathname });
    // Not "noopener" in the features: with it, window.open returns null even when the tab opened, and
    // this page would also navigate away. Cut the link to this page by hand instead.
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = url; // pop-up blocked: open WhatsApp here instead
    setText("");
    setHint("");
    setOpen(false);
  };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-[70] flex flex-col items-end sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="dialog"
            aria-labelledby={`${id}-t`}
            className="mb-3 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-[0_2rem_4rem_-1rem_rgba(18,20,24,0.45)] ring-1 ring-line"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ background: "#075e54" }}>
              <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
                <Image src="/images/brand/nirman-logo.png" alt="" width={496} height={330} className="w-[2.6rem]" />
              </span>
              <span className="min-w-0 flex-1">
                <span id={`${id}-t`} className="block text-[0.98rem] leading-tight font-semibold">{site.name}</span>
                <span className="flex items-center gap-1.5 text-[0.76rem] text-white/80"><span className="size-1.5 rounded-full" style={{ background: GREEN }} />Replies within 2 working hours (IST)</span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-10 shrink-0 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="bg-[#efeae2] px-4 py-5">
              <motion.p initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.15, duration: 0.3 }} className="relative max-w-[85%] rounded-[0.9rem] rounded-tl-sm bg-white px-3.5 py-2.5 text-[0.9rem] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                Hi! How can we help? Type your message below and press Enter; it opens in WhatsApp, ready to send to our team.
              </motion.p>
            </div>

            <form onSubmit={send} className="flex items-end gap-2 border-t border-line bg-white p-3">
              <label htmlFor={`${id}-m`} className="sr-only">Your message</label>
              <textarea
                ref={box}
                id={`${id}-m`}
                rows={2}
                value={text}
                maxLength={1000}
                onChange={(e) => {
                  setText(e.target.value);
                  if (hint) setHint("");
                }}
                onKeyDown={onKey}
                aria-describedby={`${id}-h`}
                placeholder="Type a message"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-[1.1rem] bg-[#f0f2f5] px-4 py-2.5 text-[0.93rem] outline-none placeholder:text-muted focus:ring-2 focus:ring-[#25d366]/60"
              />
              <button type="submit" aria-label="Send on WhatsApp" className="grid size-11 shrink-0 place-items-center rounded-full text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128c7e]" style={{ background: GREEN }}>
                <SendHorizontal className="size-5" />
              </button>
            </form>
            <p id={`${id}-h`} className="bg-white px-4 pb-3 text-[0.72rem] text-muted" aria-live="polite">{hint || "Enter sends · Shift+Enter for a new line"}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? `${id}-panel` : undefined}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="flex h-14 items-center gap-2.5 rounded-full px-5 text-[0.95rem] font-semibold text-white shadow-[0_1rem_2rem_-0.5rem_rgba(18,140,126,0.55)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128c7e]"
        style={{ background: GREEN }}
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: reduce ? 0 : 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "chat"} initial={reduce ? false : { rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={reduce ? undefined : { rotate: 60, opacity: 0 }} transition={{ duration: 0.18 }} className="grid place-items-center">
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
        <span className="hidden sm:inline">{open ? "Close" : "Chat with us"}</span>
      </motion.button>
    </div>
  );
}
