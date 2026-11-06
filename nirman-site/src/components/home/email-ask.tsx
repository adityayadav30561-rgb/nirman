"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";

/*
 * Email field joined to a dark Submit pill (reference FAQ). There is no lead
 * API yet (BUILD-PLAN S1), so Submit opens the visitor's email app with a
 * prepared message to Nirman, and the note under the field says so. No fake
 * success state.
 */
export function EmailAsk() {
  const id = useId();
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!input.checkValidity()) {
      setError("Please enter an email address like name@company.com.");
      input.focus();
      return;
    }
    setError("");
    const subject = encodeURIComponent("A question for Nirman");
    const body = encodeURIComponent(`Please reply to: ${input.value}\n\nMy question:\n`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[28rem]">
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
          className="h-11 shrink-0 rounded-full px-6 text-[0.9rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand bg-ink-2 text-white hover:bg-brand"
        >
          Submit
        </button>
      </div>
      <p id={`${id}-note`} className="mt-2.5 pl-5 text-[0.78rem] text-[#6b7079]" aria-live="polite">
        {error || "Opens your email app for now; an online form is coming."}
      </p>
    </form>
  );
}
