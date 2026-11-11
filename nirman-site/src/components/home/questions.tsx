import { EmailAsk } from "@/components/home/email-ask";
import { QuestionList } from "@/components/home/question-list";
import { QuestionsMotion } from "@/components/motion/questions-motion";
import { faqIntro, faqs } from "@/content/faq";

/*
 * Questions (docs/sections/07-questions.md, variant A chosen per the design
 * protocol): left, heading with an orange spark, a sentence and the email
 * pill; right, a sentence and question rows that open short answers. Outputs
 * FAQPage JSON-LD from the same list. The email form sends through /api/lead/
 * (components/home/email-ask.tsx).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Questions() {
  return (
    <QuestionsMotion aria-labelledby="questions-title" className="py-20 lg:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden className="q-spark draw mb-2 size-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path pathLength={1} d="M5 9 L10 14" />
            <path pathLength={1} d="M12 4 L13 12" />
            <path pathLength={1} d="M15 13 L20 11" />
          </svg>
          <h2
            id="questions-title"
            className="q-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink"
          >
            {faqIntro.title}
          </h2>
          <p className="q-in mt-3 max-w-[26rem] text-[0.95rem] text-[#6b7079]">{faqIntro.line}</p>
          <div className="q-in mt-8">
            <EmailAsk />
          </div>
        </div>
        <div>
          <p className="q-in mb-5 text-[0.95rem] text-[#6b7079]">{faqIntro.listLine}</p>
          <QuestionList faqs={faqs} />
        </div>
      </div>
    </QuestionsMotion>
  );
}
