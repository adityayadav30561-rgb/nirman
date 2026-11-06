// Sample testimonials for the homepage Results section
// (docs/sections/06-results.md). ALL SAMPLE: shown with a "SAMPLE" chip until
// the client supplies real quotes. No personal names, no star ratings, no
// numbers (they would read as real results). Replace, never extend, with
// invented content.

export type SampleQuote = { quote: string; who: string; place: string; tags: string[]; initials: string; tone: string };

export const resultsIntro = {
  title: "Results our customers can see.",
  line: "Sample reviews for now: real client quotes will replace them.",
};

export const sampleQuotes: SampleQuote[] = [
  {
    quote: "They rebuilt our clinic website and set up enquiry follow-ups. Patients book from their phones now, and no message waits until the next day.",
    who: "Clinic owner",
    place: "Pune",
    tags: ["Website", "Nirman CRM"],
    initials: "CO",
    tone: "bg-[#fbe9df] text-brand",
  },
  {
    quote: "Product pages load fast and search traffic is finally growing. The team explained every step in plain words.",
    who: "Online store founder",
    place: "Dubai",
    tags: ["E-commerce", "SEO"],
    initials: "SF",
    tone: "bg-[#fde2e7] text-[#b4234a]",
  },
  {
    quote: "Every lead from our site and WhatsApp lands in one place now. Nothing gets lost between the office and the field team.",
    who: "Real-estate broker",
    place: "Mumbai",
    tags: ["Nirman CRM"],
    initials: "RB",
    tone: "bg-[#ddf3e6] text-[#1f8a55]",
  },
  {
    quote: "We needed a custom order-tracking app. They delivered it in phases, so our team was using the first part within weeks.",
    who: "Manufacturer",
    place: "Ludhiana",
    tags: ["Custom software"],
    initials: "MF",
    tone: "bg-[#ece6fc] text-[#6b4fd8]",
  },
  {
    quote: "Calls in my working hours and a clear written plan made working with a team in India easy.",
    who: "Consultant",
    place: "London",
    tags: ["Website", "SEO"],
    initials: "CN",
    tone: "bg-[#fdf3d4] text-[#a06a00]",
  },
  {
    quote: "Our Google Business Profile and local pages now show up when people nearby search for us.",
    who: "Restaurant owner",
    place: "Bengaluru",
    tags: ["Local SEO"],
    initials: "RO",
    tone: "bg-[#fde2e2] text-[#c0392b]",
  },
];
