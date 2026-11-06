"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Faq } from "@/content/faq";

/*
 * Questions accordion (docs/sections/07-questions.md, variant A): rows with
 * thin dividers and a blue arrow that turns down when the row opens. One row
 * open at a time. Framer Motion animates the height and the arrow; reduced
 * motion switches instantly. Closed answers stay in the HTML (inert, height 0)
 * so the text is there for search as well as for the FAQPage JSON-LD.
 */
export function QuestionList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(-1);
  const reduce = useReducedMotion();
  const base = useId();
  const ease = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <ul className="border-t border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={f.q} className="q-row border-b border-line">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex min-h-16 w-full items-center gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className={`flex-1 text-[1rem] font-medium transition-colors sm:text-[1.05rem] ${isOpen ? "text-brand" : "text-ink group-hover:text-brand"}`}>
                  {f.q}
                </span>
                <motion.svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-6 shrink-0 text-brand"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 26 }}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </motion.svg>
              </button>
            </h3>
            <motion.div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={ease}
              className="h-0 overflow-hidden opacity-0"
            >
              <div className="max-w-[38rem] pb-5 text-[0.95rem] leading-relaxed text-ink/75">
                <p>{f.a}</p>
                {f.link && (
                  <Link href={f.link.href} className="mt-3 inline-flex items-center gap-1.5 font-medium text-brand underline-offset-4 hover:underline">
                    {f.link.label}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
