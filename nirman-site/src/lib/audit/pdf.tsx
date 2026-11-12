import { Circle, Document, Font, Image, Link, Page, Path, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { pillarsOf, priorities, verdict } from "@/lib/audit/checks";
import { CATS, scoreColour, type Check, type Report, type Status } from "@/lib/audit/types";
import { site } from "@/content/site";

/*
 * The audit report as a PDF (docs/sections/p6-seo-audit.md), built on the
 * server with @react-pdf/renderer. A4 pages: cover with the score and the
 * score by area, then what to fix first and one section per category with
 * every check (what we found, why
 * it matters, how to fix it), and a last page on method and next steps.
 * Fonts: Poppins, served by the site itself from /fonts/.
 */

const INK = "#121418";
const MUTED = "#6b7079";
const LINE = "#e3e7ed";
const BRAND = "#c2410c";
const WASH = "#f6efe9";
const TONE: Record<Status, { fg: string; bg: string; label: string }> = {
  pass: { fg: "#1f8a55", bg: "#e6f4ec", label: "PASSED" },
  warn: { fg: "#8a5a00", bg: "#fff3d6", label: "IMPROVE" },
  fail: { fg: "#b42318", bg: "#fde8e6", label: "FIX" },
  info: { fg: "#4b5563", bg: "#eef1f5", label: "NOTE" },
};

let fontsFrom = "";
function fonts(origin: string) {
  if (fontsFrom === origin) return;
  fontsFrom = origin;
  Font.register({
    family: "Poppins",
    fonts: [
      { src: `${origin}/fonts/Poppins-Light.ttf`, fontWeight: 300 },
      { src: `${origin}/fonts/Poppins-Regular.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/Poppins-Medium.ttf`, fontWeight: 500 },
      { src: `${origin}/fonts/Poppins-SemiBold.ttf`, fontWeight: 600 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]); // never split words with hyphens
}

const st = StyleSheet.create({
  page: { fontFamily: "Poppins", fontSize: 9.5, color: INK, paddingTop: 48, paddingBottom: 56, paddingHorizontal: 44, lineHeight: 1.5 },
  footer: { position: "absolute", left: 44, right: 44, bottom: 24, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: MUTED, borderTopWidth: 0.6, borderTopColor: LINE, paddingTop: 8 },
  eyebrow: { fontSize: 7.5, fontWeight: 600, letterSpacing: 1, color: BRAND, textTransform: "uppercase" },
  h1: { fontSize: 24, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15 },
  h2: { fontSize: 16, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.2 },
  muted: { color: MUTED },
  card: { borderWidth: 0.8, borderColor: LINE, borderRadius: 10, padding: 14, backgroundColor: "#ffffff" },
  chip: { fontSize: 6.5, fontWeight: 600, letterSpacing: 0.6, paddingVertical: 2.5, paddingHorizontal: 6, borderRadius: 8 },
});

function Ring({ score, size = 132, light = false }: { score: number; size?: number; light?: boolean }) {
  const r = 44;
  const len = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size }}>
      <Svg viewBox="0 0 100 100" width={size} height={size}>
        <Circle cx={50} cy={50} r={r} stroke={light ? "#2b303a" : LINE} strokeWidth={8} fill="none" />
        <Circle cx={50} cy={50} r={r} stroke={scoreColour(score)} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={`${(len * score) / 100} ${len}`} transform="rotate(-90 50 50)" />
      </Svg>
      <View style={{ position: "absolute", top: 0, left: 0, width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: size * 0.3, fontWeight: 300, letterSpacing: -1.5, lineHeight: 1.25, color: light ? "#ffffff" : INK }}>{score}</Text>
        <Text style={{ fontSize: 7, lineHeight: 1.2, color: light ? "#aab0bb" : MUTED }}>out of 100</Text>
      </View>
    </View>
  );
}

function Bar({ label, score }: { label: string; score: number | null }) {
  return (
    <View style={{ marginBottom: 9 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
        <Text style={{ fontSize: 9, fontWeight: 500 }}>{label}</Text>
        <Text style={{ fontSize: 9, fontWeight: 600, color: score === null ? MUTED : scoreColour(score) }}>{score === null ? "not measured" : score}</Text>
      </View>
      <View style={{ height: 5, borderRadius: 3, backgroundColor: "#eef1f5" }}>
        {score !== null && <View style={{ height: 5, borderRadius: 3, width: `${Math.max(score, 3)}%`, backgroundColor: scoreColour(score) }} />}
      </View>
    </View>
  );
}

function Mark() {
  return (
    <Svg viewBox="0 0 32 32" width={20} height={20}>
      <Path d="M9 0h14a9 9 0 0 1 9 9v14a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9z" fill="#ffffff" />
      <Path d="M9 24V11.5A3.5 3.5 0 0 1 12.5 8h7a3.5 3.5 0 0 1 3.5 3.5V24" fill="none" stroke={INK} strokeWidth={3} />
    </Svg>
  );
}

function Footer({ host }: { host: string }) {
  return (
    <View style={st.footer} fixed>
      <Text>SEO audit of {host} · {site.name}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

function CheckRow({ k }: { k: Check }) {
  const t = TONE[k.status];
  return (
    <View wrap={false} style={{ borderTopWidth: 0.6, borderTopColor: LINE, paddingVertical: 10, flexDirection: "row" }}>
      <View style={{ width: 58 }}>
        <Text style={[st.chip, { color: t.fg, backgroundColor: t.bg, alignSelf: "flex-start" }]}>{t.label}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10.5, fontWeight: 600 }}>{k.title}</Text>
        <Text style={{ marginTop: 2 }}>{k.found}</Text>
        <Text style={[st.muted, { marginTop: 2, fontSize: 8.5 }]}>Why it matters: {k.why}</Text>
        {k.fix && (
          <View style={{ marginTop: 6, backgroundColor: WASH, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 9 }}>
            <Text style={{ fontSize: 9 }}><Text style={{ fontWeight: 600, color: BRAND }}>How to fix: </Text>{k.fix}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function ReportDoc({ r }: { r: Report }) {
  const host = r.facts.host;
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(r.date));
  const count = (s: Status) => r.checks.filter((k) => k.status === s).length;
  const first = priorities(r, 5);
  const pillars = pillarsOf(r.cats);
  return (
    <Document title={`SEO audit of ${host}`} author={site.name} subject="SEO audit report" creator={`${site.name} free SEO audit`}>
      {/* cover */}
      <Page size="A4" style={[st.page, { paddingTop: 0, paddingHorizontal: 0 }]}>
        <View style={{ backgroundColor: INK, color: "#ffffff", paddingHorizontal: 44, paddingTop: 40, paddingBottom: 36 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mark />
              <Text style={{ marginLeft: 8, fontSize: 15, fontWeight: 600, letterSpacing: -0.4 }}>{site.name.toLowerCase()}</Text>
            </View>
            <Text style={{ fontSize: 8, color: "#aab0bb" }}>{date}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 34 }}>
            <View style={{ flex: 1, paddingRight: 24 }}>
              <Text style={[st.eyebrow, { color: "#ff9a62" }]}>SEO audit report</Text>
              <Text style={[st.h1, { marginTop: 8, fontSize: host.length > 26 ? 20 : 26 }]}>{host}</Text>
              {r.facts.title ? <Text style={{ marginTop: 8, color: "#c9ced6", fontSize: 9.5 }}>{r.facts.title.slice(0, 110)}</Text> : null}
              <Text style={{ marginTop: 16, fontSize: 13, fontWeight: 500 }}>{verdict(r.overall)}</Text>
              <Text style={{ marginTop: 3, color: "#c9ced6", fontSize: 9 }}>{count("pass")} passed · {count("warn")} to improve · {count("fail")} to fix</Text>
            </View>
            <Ring score={r.overall} light />
          </View>
        </View>

        {/* three scores in one */}
        <View style={{ paddingHorizontal: 44, paddingTop: 22, flexDirection: "row" }}>
          {(
            [
              ["SEO", "Search engines", pillars.seo],
              ["AEO", "Answer engines", pillars.aeo],
              ["GEO", "Generative engines (AI)", pillars.geo],
            ] as const
          ).map(([k, label, v], i) => (
            <View key={k} style={{ flex: 1, marginLeft: i ? 8 : 0, borderWidth: 0.8, borderColor: LINE, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 22, fontWeight: 300, letterSpacing: -1, lineHeight: 1.25, color: v === null ? MUTED : scoreColour(v), width: 40 }}>{v === null ? "–" : v}</Text>
              <View style={{ marginLeft: 6 }}>
                <Text style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.2 }}>{k}</Text>
                <Text style={{ fontSize: 7, color: MUTED, lineHeight: 1.2 }}>{label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ paddingHorizontal: 44, paddingTop: 20, flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: r.speed.screenshot ? 26 : 0 }}>
            <Text style={st.eyebrow}>Score by area</Text>
            <View style={{ marginTop: 12 }}>
              {r.cats.map((c) => <Bar key={c.key} label={c.label} score={c.score} />)}
            </View>
            <Text style={[st.muted, { fontSize: 8, marginTop: 6 }]}>
              Page audited: {r.facts.finalUrl}. {r.speed.available ? "Speed measured by Google Lighthouse on a simulated mid-range phone." : "The speed test could not be run for this report, so speed is not part of the score."}
            </Text>
          </View>
          {r.speed.screenshot ? (
            <View style={{ width: 132 }}>
              <View style={{ borderWidth: 4, borderColor: "#0b0d10", borderRadius: 16, backgroundColor: "#0b0d10", overflow: "hidden" }}>
                {/* eslint-disable-next-line jsx-a11y/alt-text -- a PDF image, not an HTML one */}
                <Image src={r.speed.screenshot} style={{ width: 124, borderRadius: 12 }} />
              </View>
              <Text style={[st.muted, { fontSize: 7, marginTop: 5, textAlign: "center" }]}>The page on a phone, as tested</Text>
            </View>
          ) : null}
        </View>

        <Footer host={host} />
      </Page>

      {/* one section per category */}
      <Page size="A4" style={st.page}>
        {first.length > 0 && (
          <View style={{ marginBottom: 26 }}>
            <Text style={st.eyebrow}>Start here</Text>
            <Text style={[st.h2, { marginTop: 4 }]}>What to fix first</Text>
            <Text style={[st.muted, { marginTop: 2 }]}>The items that cost this page the most, in order.</Text>
            <View style={{ marginTop: 8 }}>
              {first.map((k, i) => (
                <View key={k.id} wrap={false} style={{ flexDirection: "row", paddingVertical: 6, borderTopWidth: 0.6, borderTopColor: LINE }}>
                  <Text style={{ width: 20, fontSize: 11, fontWeight: 300, color: BRAND }}>{i + 1}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 600 }}>{k.title} <Text style={{ color: TONE[k.status].fg, fontWeight: 500, fontSize: 8 }}> {TONE[k.status].label}</Text></Text>
                    <Text style={{ fontSize: 8.5, color: MUTED }}>{k.found.slice(0, 260)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {r.cats.map((c, i) => {
          const mine = r.checks.filter((k) => k.cat === c.key);
          if (!mine.length) return null;
          const order: Status[] = ["fail", "warn", "pass", "info"];
          return (
            <View key={c.key} style={{ marginTop: i > 0 ? 30 : 0 }}>
              <View wrap={false} minPresenceAhead={150} style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flex: 1, paddingRight: 20 }}>
                  <Text style={st.eyebrow}>Area {i + 1} of {r.cats.length}</Text>
                  <Text style={[st.h2, { marginTop: 4 }]}>{c.label}</Text>
                  <Text style={[st.muted, { marginTop: 2 }]}>{CATS.find((x) => x.key === c.key)?.line}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 26, fontWeight: 300, letterSpacing: -1, lineHeight: 1.25, color: c.score === null ? MUTED : scoreColour(c.score) }}>{c.score === null ? "–" : c.score}</Text>
                  <Text style={{ fontSize: 7.5, lineHeight: 1.2, color: MUTED }}>{c.score === null ? "not measured" : "out of 100"}</Text>
                </View>
              </View>
              {[...mine].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status)).map((k) => <CheckRow key={k.id} k={k} />)}
            </View>
          );
        })}
        <Footer host={host} />
      </Page>

      {/* method and next steps */}
      <Page size="A4" style={st.page}>
        <Text style={st.eyebrow}>About this report</Text>
        <Text style={[st.h2, { marginTop: 4 }]}>How the audit was done</Text>
        <Text style={{ marginTop: 8 }}>
          This report covers one page, {r.facts.finalUrl}, as it was on {date}. Our crawler loaded the page the way a search engine does, followed its redirects, and read its robots.txt, sitemap and llms.txt.{r.speed.available ? ` Speed, accessibility and best-practice scores come from Google PageSpeed Insights (Lighthouse${r.speed.lighthouseVersion ? ` ${r.speed.lighthouseVersion}` : ""}) on a simulated mid-range phone; real-visitor figures, where shown, are Google's own 28-day Chrome data.` : ""}
        </Text>
        <Text style={{ marginTop: 6 }}>
          Each check is scored as passed (full marks), to improve (half) or to fix (none), weighted by how much it matters inside its area. The seven areas are then combined into the overall score: crawling and indexing 20%, speed 20%, on-page content 15%, answer engines (AEO) 15%, generative engines (GEO) 15%, mobile 8% and structured data 7%. An automated audit cannot judge everything: it does not read your other pages, your competitors, your backlinks or how well your text answers what people search for.
        </Text>

        <Text style={[st.h2, { marginTop: 20, fontSize: 13 }]}>AEO and GEO</Text>
        <Text style={{ marginTop: 6 }}>
          Answer engine optimisation (AEO) is about being the direct answer: in Google’s featured snippets, People Also Ask, AI Overviews and voice assistants. Generative engine optimisation (GEO) is about being read, trusted and cited by AI assistants such as ChatGPT, Claude, Perplexity and Gemini.
        </Text>
        <Text style={{ marginTop: 6 }}>
          Neither has a published formula. These checks follow Google’s documentation on snippets and AI features, the crawler documentation of OpenAI, Anthropic, Perplexity and Microsoft, and published research on generative engines (Aggarwal and others, 2024), which found that statistics, quotations and cited sources make a page more likely to be cited. Treat the AEO and GEO scores as a readiness check, not a measure of how often you are cited today.
        </Text>

        <View style={[st.card, { marginTop: 22, backgroundColor: INK, borderColor: INK }]}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", letterSpacing: -0.3 }}>Want these fixed for you?</Text>
          <Text style={{ marginTop: 5, color: "#c9ced6" }}>
            {site.name} builds websites and runs SEO for businesses in India and abroad. Tell us about your site and we will reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}>
            <Link src={`${site.url}/get-a-quote/`} style={{ backgroundColor: "#ffffff", color: INK, fontSize: 9.5, fontWeight: 600, paddingVertical: 7, paddingHorizontal: 16, borderRadius: 14, textDecoration: "none" }}>Get a quote</Link>
            <Text style={{ marginLeft: 14, color: "#c9ced6", fontSize: 9 }}>{site.email} · {site.phone}</Text>
          </View>
        </View>
        <Text style={[st.muted, { fontSize: 8, marginTop: 14 }]}>
          This report is general information produced by an automated tool. It is not a guarantee of any ranking or result. {site.url.replace(/^https?:\/\//, "")}
        </Text>
        <Footer host={host} />
      </Page>
    </Document>
  );
}

export async function renderReportPdf(report: Report, origin: string): Promise<Buffer> {
  fonts(origin);
  return renderToBuffer(<ReportDoc r={report} />);
}
