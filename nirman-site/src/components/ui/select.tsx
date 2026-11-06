"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

/*
 * Custom select (replaces the browser's native dropdown, which looked out of
 * place). WAI-ARIA "select-only combobox": a button that opens a listbox.
 * Keyboard: Enter/Space/ArrowDown open; ArrowUp/Down move; Home/End; Enter
 * picks; Escape closes; typing a letter jumps to the next option starting
 * with it. A hidden input carries the value, so the surrounding form still
 * submits normally. Open/close motion: Framer Motion (DESIGN-PROTOCOL
 * section 5), off under reduced motion.
 */
export function Select({
  name,
  label,
  options,
  defaultValue,
  icon,
  className = "",
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(defaultValue ?? options[0])));
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (i: number) => {
    setValue(options[i]);
    setOpen(false);
    button.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    const move: Record<string, () => void> = {
      ArrowDown: () => setActive((a) => Math.min(last, a + 1)),
      ArrowUp: () => setActive((a) => Math.max(0, a - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      " ": () => choose(active),
    };
    if (move[e.key]) {
      e.preventDefault();
      move[e.key]();
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const next = options.findIndex((o, i) => i > active && o.toLowerCase().startsWith(k));
      const wrap = options.findIndex((o) => o.toLowerCase().startsWith(k));
      if (next >= 0 || wrap >= 0) setActive(next >= 0 ? next : wrap);
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      <span id={`${id}-label`} className="block text-[0.7rem] text-muted">
        {label}
      </span>
      <button
        ref={button}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="flex w-full items-center gap-2 rounded-md text-left text-[0.85rem] font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {icon}
        <span id={`${id}-value`} className="min-w-0 flex-1 truncate">
          {value}
        </span>
        <ChevronDown
          className={`size-3.5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-[-0.75rem] z-40 mt-3 w-[max(100%_+_1.5rem,15rem)] origin-top-left rounded-2xl bg-white p-1.5 shadow-[0_24px_48px_-20px_rgb(5_7_12/0.35),0_2px_6px_rgb(5_7_12/0.06)] ring-1 ring-line"
          >
            {options.map((o, i) => {
              const selected = o === value;
              return (
                <li
                  key={o}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.85rem] transition-colors ${
                    i === active ? "bg-wash" : ""
                  } ${selected ? "font-medium text-brand" : "text-ink"}`}
                >
                  {o}
                  {selected && <Check className="size-4 shrink-0" aria-hidden />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
