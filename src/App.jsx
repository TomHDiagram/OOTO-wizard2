import { useState } from "react";

const TEAL = "#00B5AD";
const BG = "#F0EFEB";

const T = {
  en: {
    tagline: "This AI-powered tool may help you decide if the Ombudsman can help.",
    subtitle: "The Ombudsman can investigate some types of complaints about Government agencies and Councils.",
    s1q: "Which organisation would you like to complain about?",
    s1ph: "e.g. Ministry of Health, Auckland Council, ACC",
    s2q: org => `What did ${org} do, or not do?`,
    s2ph: "Briefly describe what happened...",
    s2bTitle: "The Ombudsman may not be able to help",
    s3q: org => `Have you tried to resolve this issue with ${org}?`,
    s3bTitle: "The Ombudsman may not be able to investigate this",
    callTitle: "Please call us",
    callMsg: "This situation may need more assessment than this tool can provide.",
    s4q: org => `Do you have a written response from ${org}?`,
    s4bTitle: "Contact the agency first",
    s4bMsg: org => `We are unable to take a complaint until you have tried to resolve the issue with ${org} first.`,
    s4bAdv: org => `Please contact ${org}, raise your concerns, and ask for a written response.`,
    s5q: "What would you like to happen?",
    s5opts: ["An apology or explanation", "A decision to be changed", "A mistake to be corrected", "Something else"],
    s5bTitle: "A written response may be needed first",
    s5bMsg: org => `We are unlikely to take a complaint unless we can see ${org}'s written response.`,
    s5bAdv: org => `Please contact ${org} and ask them to respond to your complaint in writing.`,
    s6bq: "Please describe what you would like to happen:",
    s6bph: "Describe your desired outcome...",
    s6q: "Would you like to make a complaint to the Ombudsman?",
    s6info: org => `If you have details of your situation and how you tried to resolve it with ${org}, we may be able to investigate.`,
    s7msg: "We hope this tool helped you decide what to do.",
    yes: "Yes", no: "No", next: "Next",
    startAgain: "Start again", close: "Close", checking: "Checking...",
    callUs: "You are welcome to call us to discuss your situation.",
    phone: "0800 802 602",
    makeComplaint: "Yes — take me to the complaint form",
    noThanks: "No thanks",
    complaintUrl: "https://www.ombudsman.parliament.nz/get-help-public/make-complaint-members-public",
  },
  mi: {
    tagline: "Mā tēnei taputapu AI pea e āwhina ana koe ki te whakatau, ka taea rānei e te Kaitiaki Mana Tangata te āwhina.",
    subtitle: "Ka tūhura te Kaitiaki Mana Tangata i ētahi momo amuamu mō ngā Tari Kāwanatanga me ngā Kaunihera.",
    s1q: "Ko tēhea whakahaere e hiahia ana koe ki te amuamu?",
    s1ph: "hei tauira, Manatū Hauora, Kaunihera o Tāmaki Makaurau",
    s2q: org => `He aha i mahia ai e ${org}, he aha rānei i kore ai e mahia?`,
    s2ph: "Whakamārama poto i ngā mea i puta...",
    s2bTitle: "Kāore pea e taea e te Kaitiaki Mana Tangata te āwhina",
    s3q: org => `Kua ngana koe ki te whakatau i tēnei take me ${org}?`,
    s3bTitle: "Kāore pea e taea e te Kaitiaki Mana Tangata te tūhura",
    callTitle: "Tūmau mai",
    callMsg: "Me kōrero koe ki ā mātou kaimahi mō tēnei āhuatanga.",
    s4q: org => `He whakautu ā-tuhi tōu mai i a ${org}?`,
    s4bTitle: "Me whakapā ki te whakahaere i te tuatahi",
    s4bMsg: org => `Kāore mātou e taea te tango i tētahi amuamu kia ngana koe ki te whakatau i te take me ${org}.`,
    s4bAdv: org => `Whakapā ki a ${org}, whakaatu i ōu āwangawanga, ā, tono i tētahi whakautu ā-tuhi.`,
    s5q: "He aha tāu e hiahia ana kia puta mai?",
    s5opts: ["He whakapāha, he whakamārama rānei", "Kia huritia tētahi whakataunga", "Kia whakatikatia tētahi hapa", "Ētahi atu mea"],
    s5bTitle: "Me tono whakautu ā-tuhi i te tuatahi",
    s5bMsg: org => `Kāore mātou e kōrero ana ka tango mātou i tētahi amuamu mēnā kāore e kitea ana te whakautu ā-tuhi a ${org}.`,
    s5bAdv: org => `Whakapā ki a ${org} ā, tono kia whakautu ā-tuhi mai rātou.`,
    s6bq: "Whakamāramatia mai he aha tāu e hiahia ana kia puta:",
    s6bph: "Tāurua tōu hua e hiahia ana...",
    s6q: "Ka hiahia ana koe ki te tuku amuamu ki te Kaitiaki Mana Tangata?",
    s6info: org => `Ki te whai kōrero ana koe mō tō āhuatanga me pēhea i ngana ai koe ki te whakatau me ${org}, ka taea pea e mātou te tūhura.`,
    s7msg: "E tūmanako ana mātou i āwhina tēnei taputapu i a koe.",
    yes: "Āe", no: "Kāo", next: "Haere tonu",
    startAgain: "Tīmata anō", close: "Kati", checking: "E tirotiro ana...",
    callUs: "Nau mai, waea mai ki a mātou ki te kōrero mō tō āhuatanga.",
    phone: "0800 802 602",
    makeComplaint: "Āe — mauria au ki te puka amuamu",
    noThanks: "Kāo, tēnā",
    complaintUrl: "https://www.ombudsman.parliament.nz/get-help-public/make-complaint-members-public",
  },
};

const ORG_PROMPT = `You are a jurisdiction checker for the New Zealand Ombudsman. Return ONLY valid JSON, no markdown, no other text.

{"inJurisdiction": true, false, or "uncertain", "reason": "1-2 short plain NZ English sentences if not in jurisdiction or uncertain", "alternative": "name and URL of alternative body if applicable, or null"}

IN jurisdiction: NZ government departments, ministries, councils, Crown entities, SOEs, NZ Police (for OIA), public hospitals, school boards, universities, wananga.
NOT in jurisdiction: private companies, private banks, private insurance, private landlords, private schools, courts, judges, private employers, lawyers.
"uncertain": name is unfamiliar or could be a renamed/restructured government agency.

Alternatives: private bank → Banking Ombudsman (bankomb.org.nz); private insurance → IFSO (ifso.nz); health treatment → Health and Disability Commissioner (hdc.org.nz); police conduct → IPCA (ipca.govt.nz); private employer → Employment NZ (employment.govt.nz); private landlord → Tenancy Services (tenancy.govt.nz).`;

const SCENARIO_PROMPT = `You are a complaint assessor for the New Zealand Ombudsman. Return ONLY valid JSON, no markdown, no other text.

{"canInvestigate": true, false, or "uncertain", "skipPriorComplaint": true or false, "reason": "1-2 short plain NZ English sentences if cannot investigate", "alternative": "alternative body name and URL or null", "specialHandling": "none", "children", "urgent", "complex", or "callPhone"}

skipPriorComplaint = true ONLY for OIA or LGOIMA information requests.
specialHandling: "children" = involves Oranga Tamariki/child removal/custody/child in care. "urgent" = deportation/detention/border refusal happening now. "complex" = multiple agencies or multiple distinct issues. "callPhone" = genuinely uncertain.

CANNOT investigate: private companies, courts, lawyers, private employers. ACC claim decisions — ACC service CAN be investigated. MSD benefit decisions — MSD service CAN be investigated. Health/disability treatment (HDC) — admin complaints CAN be investigated. Police conduct (IPCA) — OIA to Police CAN be investigated. Immigration residence refusals. Tax assessments. Resource consent refusals on merits. Minister decisions — OIA to Ministers CAN be investigated. Employment disputes where complainant is the agency's own employee.

CAN investigate: unfair government decisions, poor government service, failure to act, OIA/LGOIMA refusals or non-responses (skipPriorComplaint=true), student/visitor/work/transit visa decisions by INZ.`;

async function apiCall(sys, msg) {
  try {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300, system: sys, messages: [{ role: "user", content: msg }] }),
    });
    const d = await r.json();
    return JSON.parse((d.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim());
  } catch { return null; }
}

function PhoneBlock({ t }) {
  return (
    <div style={{ marginTop: 20, background: BG, borderRadius: 14, padding: "16px 20px", textAlign: "center" }}>
      <p style={{ margin: "0 0 8px", fontSize: 14, color: "#666", lineHeight: 1.5 }}>{t.callUs}</p>
      <a href={`tel:${t.phone}`} style={{ fontSize: 17, fontWeight: 700, color: TEAL, textDecoration: "none" }}>{t.phone}</a>
    </div>
  );
}

function PrimaryBtn({ onClick, label, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: "block", width: "100%", padding: "15px 20px", marginBottom: 10,
      borderRadius: 12, border: "none", background: disabled ? "#ccc" : TEAL,
      color: "#fff", fontSize: 16, fontWeight: 700, cursor: disabled ? "default" : "pointer", fontFamily: "inherit",
    }}>{label}</button>
  );
}

function SecondaryBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: "block", width: "100%", padding: "15px 20px", marginBottom: 10,
      borderRadius: 12, border: "1.5px solid #ddd", background: "#fff",
      color: "#333", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    }}>{label}</button>
  );
}

function OptionBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: "block", width: "100%", padding: "14px 18px", marginBottom: 10,
      borderRadius: 12, border: "1.5px solid #ddd", background: "#fff",
      color: "#333", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
    }}>{label}</button>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("1");
  const [transitioning, setTransitioning] = useState(false);
  const [org, setOrg] = useState("");
  const [orgInput, setOrgInput] = useState("");
  const [scenarioInput, setScenarioInput] = useState("");
  const [customOutcome, setCustomOutcome] = useState("");
  const [loading, setLoading] = useState(false);
  const [orgResult, setOrgResult] = useState(null);
  const [scenarioResult, setScenarioResult] = useState(null);
  const t = T[lang];

  const go = s => {
    setTransitioning(true);
    setTimeout(() => { setScreen(s); setTransitioning(false); }, 180);
  };

  const reset = () => {
    go("1"); setOrg(""); setOrgInput(""); setScenarioInput("");
    setCustomOutcome(""); setOrgResult(null); setScenarioResult(null);
  };

  const handleOrg = async () => {
    if (!orgInput.trim()) return;
    setLoading(true);
    const r = await apiCall(ORG_PROMPT, `Organisation: ${orgInput.trim()}`);
    setOrgResult(r); setOrg(orgInput.trim()); setLoading(false);
    go(!r || r.inJurisdiction !== true ? "2b" : "2");
  };

  const handleScenario = async () => {
    if (!scenarioInput.trim()) return;
    setLoading(true);
    const r = await apiCall(SCENARIO_PROMPT, `Organisation: ${org}\nScenario: ${scenarioInput.trim()}`);
    setScenarioResult(r); setLoading(false);
    if (!r || r.canInvestigate === "uncertain" || ["children","urgent","complex","callPhone"].includes(r?.specialHandling)) {
      go("call");
    } else if (r.canInvestigate === false) {
      go("3b");
    } else if (r.skipPriorComplaint) {
      go("4");
    } else {
      go("3");
    }
  };

  const inp = {
    width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #ddd",
    fontSize: 15, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14, display: "block",
  };

  const screens = {
    "1": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 20, lineHeight: 1.3 }}>{t.s1q}</p>
      <input value={orgInput} onChange={e => setOrgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleOrg()} placeholder={t.s1ph} style={inp} autoFocus />
      <PrimaryBtn onClick={handleOrg} label={t.next} disabled={!orgInput.trim()} />
    </>,

    "2": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 20, lineHeight: 1.3 }}>{t.s2q(org)}</p>
      <textarea value={scenarioInput} onChange={e => setScenarioInput(e.target.value)} placeholder={t.s2ph} rows={4} style={{ ...inp, resize: "vertical" }} autoFocus />
      <PrimaryBtn onClick={handleScenario} label={t.next} disabled={!scenarioInput.trim()} />
    </>,

    "2b": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#c0392b", marginBottom: 16, lineHeight: 1.3 }}>{t.s2bTitle}</p>
      {orgResult?.reason && <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{orgResult.reason}</p>}
      {orgResult?.alternative && <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65 }}>{orgResult.alternative}</p>}
      <PhoneBlock t={t} />
    </>,

    "3": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 28, lineHeight: 1.3 }}>{t.s3q(org)}</p>
      <PrimaryBtn onClick={() => go("4")} label={t.yes} />
      <SecondaryBtn onClick={() => go("4b")} label={t.no} />
    </>,

    "3b": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#c0392b", marginBottom: 16, lineHeight: 1.3 }}>{t.s3bTitle}</p>
      {scenarioResult?.reason && <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{scenarioResult.reason}</p>}
      {scenarioResult?.alternative && <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65 }}>{scenarioResult.alternative}</p>}
      <PhoneBlock t={t} />
    </>,

    "call": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 16, lineHeight: 1.3 }}>{t.callTitle}</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{t.callMsg}</p>
      {scenarioResult?.reason && <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65 }}>{scenarioResult.reason}</p>}
      <PhoneBlock t={t} />
    </>,

    "4": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 28, lineHeight: 1.3 }}>{t.s4q(org)}</p>
      <PrimaryBtn onClick={() => go("5")} label={t.yes} />
      <SecondaryBtn onClick={() => go(scenarioResult?.skipPriorComplaint ? "5" : "5b")} label={t.no} />
    </>,

    "4b": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#c0392b", marginBottom: 16, lineHeight: 1.3 }}>{t.s4bTitle}</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{t.s4bMsg(org)}</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65 }}>{t.s4bAdv(org)}</p>
      <PhoneBlock t={t} />
    </>,

    "5": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 20, lineHeight: 1.3 }}>{t.s5q}</p>
      {t.s5opts.map((opt, i) => (
        <OptionBtn key={i} onClick={() => go(i === t.s5opts.length - 1 ? "6b" : "6")} label={opt} />
      ))}
    </>,

    "5b": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#c0392b", marginBottom: 16, lineHeight: 1.3 }}>{t.s5bTitle}</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{t.s5bMsg(org)}</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65 }}>{t.s5bAdv(org)}</p>
      <PhoneBlock t={t} />
    </>,

    "6b": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 16, lineHeight: 1.3 }}>{t.s6bq}</p>
      <textarea value={customOutcome} onChange={e => setCustomOutcome(e.target.value)} placeholder={t.s6bph} rows={4} style={{ ...inp, resize: "vertical" }} autoFocus />
      <PrimaryBtn onClick={() => go("6")} label={t.next} disabled={!customOutcome.trim()} />
    </>,

    "6": <>
      <p style={{ fontSize: 21, fontWeight: 700, color: "#222", marginBottom: 12, lineHeight: 1.3 }}>{t.s6q}</p>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.65, marginBottom: 24 }}>{t.s6info(org)}</p>
      <PrimaryBtn onClick={() => window.open(t.complaintUrl, "_blank")} label={t.makeComplaint} />
      <SecondaryBtn onClick={() => go("7")} label={t.noThanks} />
    </>,

    "7": <div style={{ textAlign: "center", padding: "16px 0" }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>👋</div>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 16, lineHeight: 1.3 }}>{t.s7msg}</p>
      <PhoneBlock t={t} />
    </div>,
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: TEAL, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: -0.5 }}>OOTO</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>New Zealand Ombudsman</span>
        </div>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.15)", borderRadius: 22, padding: 3, gap: 2 }}>
          {[["en","English"],["mi","Te Reo Māori"]].map(([code, label]) => (
            <button key={code} onClick={() => setLang(code)} style={{
              padding: "5px 12px", borderRadius: 18, border: "none", fontSize: 12,
              fontWeight: lang === code ? 700 : 500, cursor: lang === code ? "default" : "pointer",
              fontFamily: "inherit", transition: "all 0.15s",
              background: lang === code ? "#fff" : "transparent",
              color: lang === code ? TEAL : "rgba(255,255,255,0.8)",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Intro — screen 1 only */}
      {screen === "1" && (
        <div style={{ background: "#fff", padding: "18px 20px", borderBottom: "1px solid #e4e0d8" }}>
          <p style={{ fontSize: 15, color: "#333", fontWeight: 500, margin: "0 0 5px", lineHeight: 1.5 }}>{t.tagline}</p>
          <p style={{ fontSize: 14, color: "#777", margin: 0, lineHeight: 1.5 }}>{t.subtitle}</p>
        </div>
      )}

      {/* API spinner */}
      {loading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ width: 44, height: 44, border: `4px solid ${TEAL}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", marginBottom: 14 }} />
          <p style={{ color: TEAL, fontWeight: 600, fontSize: 15 }}>{t.checking}</p>
        </div>
      )}

      {/* Card */}
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: 520, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "28px 24px" }}>
          <div key={screen} style={{ animation: transitioning ? "fadeOut 0.15s ease-out forwards" : "fadeIn 0.2s ease-out" }}>
            {screens[screen]}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={reset} style={{ flex: 1, padding: "10px 8px", background: "none", border: "1.5px solid #ddd", borderRadius: 10, fontSize: 13, cursor: "pointer", color: "#666", fontFamily: "inherit", fontWeight: 500 }}>
              ↺ {t.startAgain}
            </button>
            <button onClick={() => window.open("https://www.ombudsman.parliament.nz", "_blank")} style={{ flex: 1, padding: "10px 8px", background: "none", border: "1.5px solid #ddd", borderRadius: 10, fontSize: 13, cursor: "pointer", color: "#666", fontFamily: "inherit", fontWeight: 500 }}>
              {t.close}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
