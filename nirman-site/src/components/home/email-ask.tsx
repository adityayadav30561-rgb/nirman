"use client";

import { useId, useState, type FormEvent } from "react";
import { mailtoLead, sendLead, Trap } from "@/lib/lead";

/*
 * Email field joined to a dark Submit pill (reference FAQ). Submit sends the
 * address through /api/lead/ (lib/lead.tsx, docs/sections/s1-forms.md) and
 * confirms in place; if sending is not possible it opens the visitor's email
 * app with a prepared message.
 */
export function EmailAsk() {
  const id = useId();
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!input.checkValidity()) {
      setError("Please enter an email address like name@company.com.");
      input.focus();
      return;
    }
    setError("");
    if (state !== "idle") return;
    const email = input.value;
    setState("sending");
    void sendLead("question", { email, lines: [`Email: ${email}`, "", "This visitor left their email on the homepage (Questions section) and would like us to write to them."] }).then((sent) => {
      if (sent) return setState("sent");
      mailtoLead("A question for Nirman", [`Please reply to: ${email}`, "", "My question:", ""]);
      setState("idle");
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative w-full max-w-[28rem]">
      <Trap />
      <label htmlFor={id} className="sr-only">
        Your email
      </label>
      <div
        className="flex h-14 items-center rounded-full p-1.5 pl-5 ring-1 transition-shadow focus-within:ring-2 focus-within:ring-brand bg-surface ring-line"
      >
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-note`}
          className="min-w-0 flex-1 bg-transparent text-[0.95rem] outline-none text-ink placeholder:text-[#6b7079]"
        />
        <button
          type="submit"
          disabled={state !== "idle"}
          aria-busy={state === "sending" || undefined}
          className="h-11 shrink-0 rounded-full px-6 disabled:opacity-60 text-[0.9rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand bg-ink-2 text-white hover:bg-brand"
        >
          {state === "sending" ? "Sending" : state === "sent" ? "Sent" : "Submit"}
        </button>
      </div>
      <p id={`${id}-note`} className="mt-2.5 pl-5 text-[0.78rem] text-[#6b7079]" aria-live="polite">
        {error || (state === "sent" ? "Thank you. We will write to you within 2 working hours (IST)." : "We will write back within 2 working hours (IST).")}
      </p>
    </form>
  );
}
