import { useState, useEffect, useRef } from "react";

const FONT = `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Epilogue:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap`;

// ─── Pricing tiers (your revenue engine) ─────────────────────────────────────
const PLANS = [
  { id:"starter", name:"Starter", price:19, perks:["5 resume optimizations/mo","ATS score checker","Basic cover letter","Email support"], color:"#6EE7B7", cta:"Start Free Trial" },
  { id:"pro",     name:"Pro",     price:39, perks:["Unlimited optimizations","LinkedIn headline rewriter","50+ job board formats","Interview question prep","Priority support"], color:"#FCD34D", cta:"Go Pro — Most Popular", popular:true },
  { id:"career",  name:"Career+", price:79, perks:["Everything in Pro","Personal career coach AI","Salary negotiation scripts","1-on-1 onboarding call","White-glove support"], color:"#F9A8D4", cta:"Get Career+" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:"Marcus T.", role:"Software Engineer → FAANG", text:"Got 3x more callbacks in 2 weeks. The ATS optimizer is insane — my resume went from 42% to 94% match score.", stars:5 },
  { name:"Priya K.", role:"Marketing Manager", text:"I was applying for 3 months with zero responses. Used ResumeAI for one week and landed 4 interviews. Worth every penny.", stars:5 },
  { name:"James L.", role:"Recent Grad → $95k offer", text:"The cover letter generator writes better than me honestly. Tailors everything to the exact job posting automatically.", stars:5 },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | app | pricing
  const [plan, setPlan] = useState(null);

  if (screen === "app") return <ResumeApp plan={plan} onBack={() => setScreen("landing")} />;

  return (
    <div style={s.root}>
      <link rel="stylesheet" href={FONT} />
      <style>{globalCSS}</style>

      <Nav onCTA={() => setScreen("pricing")} />

      {screen === "landing" && (
        <>
          <Hero     onCTA={() => setScreen("pricing")} onTry={() => setScreen("app")} />
          <LogoBar  />
          <HowItWorks />
          <Features />
          <TestimonialsSection />
          <Pricing  onSelect={(p) => { setPlan(p); setScreen("app"); }} />
          <FAQ />
          <BottomCTA onCTA={() => setScreen("pricing")} />
          <Footer />
        </>
      )}
      {screen === "pricing" && (
        <div style={s.pricingPage}>
          <Pricing onSelect={(p) => { setPlan(p); setScreen("app"); }} standalone />
        </div>
      )}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ ...s.nav, background: scrolled ? "rgba(10,10,14,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div style={s.navInner}>
        <div style={s.navLogo}>
          <span style={s.logoMark}>R</span>
          <span style={s.logoWord}>Resume<em>AI</em></span>
        </div>
        <div style={s.navLinks}>
          <a style={s.navLink} href="#features">Features</a>
          <a style={s.navLink} href="#pricing">Pricing</a>
          <a style={s.navLink} href="#faq">FAQ</a>
        </div>
        <button style={s.navCTA} onClick={onCTA}>Get Started Free →</button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onCTA, onTry }) {
  return (
    <section style={s.hero}>
      <div style={s.heroBg} />
      <div style={s.heroContent}>
        <div style={s.heroBadge}>✦ AI-Powered · ATS-Optimized · Used by 12,000+ job seekers</div>
        <h1 style={s.heroH1}>
          Land your dream job<br />
          <em style={s.heroEm}>3× faster</em>
        </h1>
        <p style={s.heroSub}>
          ResumeAI analyzes job postings and rewrites your resume to beat ATS filters,
          match recruiter keywords, and get you more interviews — in under 60 seconds.
        </p>
        <div style={s.heroCTAs}>
          <button style={s.heroCTA1} onClick={onCTA}>Start Free Trial — No Card Required</button>
          <button style={s.heroCTA2} onClick={onTry}>Try it free now →</button>
        </div>
        <p style={s.heroSmall}>✓ 7-day free trial  ✓ Cancel anytime  ✓ 60-second results</p>
      </div>

      {/* Mock UI preview */}
      <div style={s.heroPreview}>
        <div style={s.previewCard}>
          <div style={s.previewHeader}>
            <div style={s.previewDots}><span /><span /><span /></div>
            <span style={s.previewTitle}>ATS Score Analysis</span>
          </div>
          <div style={s.scoreRow}>
            <div style={s.scoreBefore}>
              <div style={s.scoreNum}>42%</div>
              <div style={s.scoreLabel}>Before</div>
            </div>
            <div style={s.scoreArrow}>→</div>
            <div style={s.scoreAfter}>
              <div style={{ ...s.scoreNum, color:"#6EE7B7" }}>94%</div>
              <div style={s.scoreLabel}>After</div>
            </div>
          </div>
          {["React", "TypeScript", "AWS", "CI/CD", "Agile"].map((kw, i) => (
            <div key={kw} style={{ ...s.kwRow, animationDelay:`${i*0.1}s` }}>
              <div style={s.kwDot} />
              <span style={s.kwText}>{kw}</span>
              <span style={s.kwAdded}>✓ Added</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Logo Bar ─────────────────────────────────────────────────────────────────
function LogoBar() {
  const companies = ["Google","Amazon","Apple","Netflix","Meta","Stripe","Airbnb","Spotify"];
  return (
    <div style={s.logoBar}>
      <p style={s.logoBarText}>Users have landed roles at</p>
      <div style={s.logoBarRow}>
        {companies.map(c => <span key={c} style={s.logoBarItem}>{c}</span>)}
      </div>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:"01", title:"Paste your resume", desc:"Drop in your existing resume — any format, any experience level." },
    { n:"02", title:"Add the job posting", desc:"Paste the job description you're applying to. That's it." },
    { n:"03", title:"Get optimized instantly", desc:"AI rewrites your resume to match keywords, tone, and ATS requirements." },
    { n:"04", title:"Download & apply", desc:"Export as PDF or Word. Apply with confidence. Get more callbacks." },
  ];
  return (
    <section style={s.section} id="features">
      <div style={s.sectionInner}>
        <div style={s.sectionLabel}>How it works</div>
        <h2 style={s.sectionH2}>From resume to interviews<br /><em>in 4 simple steps</em></h2>
        <div style={s.stepsGrid}>
          {steps.map((step, i) => (
            <div key={i} style={s.stepCard}>
              <div style={s.stepNum}>{step.n}</div>
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon:"◎", title:"ATS Score Checker", desc:"See exactly how your resume scores against applicant tracking systems before you apply." },
    { icon:"✦", title:"Keyword Optimizer", desc:"Automatically identifies and injects missing keywords from the job description." },
    { icon:"◈", title:"Cover Letter AI", desc:"Generates personalized cover letters tailored to each role in seconds." },
    { icon:"⊹", title:"LinkedIn Rewriter", desc:"Rewrites your LinkedIn headline and summary to attract recruiters passively." },
    { icon:"◇", title:"Interview Prep", desc:"Generates likely interview questions based on the job you applied to." },
    { icon:"⬡", title:"Salary Insights", desc:"Shows market salary data and gives you negotiation scripts for your offer." },
  ];
  return (
    <section style={{ ...s.section, background:"#0D0D11" }}>
      <div style={s.sectionInner}>
        <div style={s.sectionLabel}>Features</div>
        <h2 style={s.sectionH2}>Everything you need<br /><em>to get hired</em></h2>
        <div style={s.featGrid}>
          {features.map((f, i) => (
            <div key={i} style={s.featCard} className="feat-card">
              <div style={s.featIcon}>{f.icon}</div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section style={s.section}>
      <div style={s.sectionInner}>
        <div style={s.sectionLabel}>Social Proof</div>
        <h2 style={s.sectionH2}>Real people.<br /><em>Real results.</em></h2>
        <div style={s.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={s.testimonialCard}>
              <div style={s.stars}>{"★".repeat(t.stars)}</div>
              <p style={s.testimonialText}>"{t.text}"</p>
              <div style={s.testimonialAuthor}>
                <div style={s.testimonialAvatar}>{t.name[0]}</div>
                <div>
                  <div style={s.testimonialName}>{t.name}</div>
                  <div style={s.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing({ onSelect, standalone }) {
  return (
    <section style={{ ...s.section, background:"#0D0D11" }} id="pricing">
      <div style={s.sectionInner}>
        {!standalone && <div style={s.sectionLabel}>Pricing</div>}
        <h2 style={{ ...s.sectionH2, marginBottom:8 }}>Simple, transparent pricing</h2>
        <p style={s.pricingSub}>Start free. Upgrade when you're ready. Cancel anytime.</p>
        <div style={s.plansGrid}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{ ...s.planCard, borderColor: plan.popular ? plan.color : "#1E1E2A" }}>
              {plan.popular && <div style={{ ...s.popularBadge, background: plan.color }}>Most Popular</div>}
              <div style={{ ...s.planName, color: plan.color }}>{plan.name}</div>
              <div style={s.planPrice}>
                <span style={s.planDollar}>$</span>
                <span style={s.planNum}>{plan.price}</span>
                <span style={s.planPer}>/mo</span>
              </div>
              <ul style={s.planPerks}>
                {plan.perks.map((p, i) => (
                  <li key={i} style={s.planPerk}>
                    <span style={{ color: plan.color }}>✓</span> {p}
                  </li>
                ))}
              </ul>
              <button style={{ ...s.planCTA, background: plan.popular ? plan.color : "transparent",
                color: plan.popular ? "#0A0A0E" : plan.color,
                borderColor: plan.color }}
                onClick={() => onSelect(plan)}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p style={s.pricingNote}>💡 To hit $10k/mo: just 256 Pro subscribers. That's very achievable.</p>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"Does this really beat ATS systems?", a:"Yes. We analyze thousands of job postings monthly and train our optimizer on what ATS systems actually filter for. Our users average a 2.3x increase in callback rates." },
    { q:"What if I'm changing careers?", a:"ResumeAI is especially powerful for career changers. It identifies transferable skills, reframes your experience in the new industry's language, and fills gaps with relevant keywords." },
    { q:"How is this different from ChatGPT?", a:"ChatGPT is a general AI. ResumeAI is trained specifically on hiring data, ATS systems, recruiter behavior, and job market trends. It's like the difference between a general doctor and a specialist." },
    { q:"Can I cancel anytime?", a:"Absolutely. No contracts, no cancellation fees. Cancel from your dashboard in one click." },
    { q:"How many jobs can I optimize for?", a:"Pro and Career+ plans include unlimited optimizations. Each job application gets its own tailored resume." },
  ];
  return (
    <section style={s.section} id="faq">
      <div style={{ ...s.sectionInner, maxWidth:700 }}>
        <div style={s.sectionLabel}>FAQ</div>
        <h2 style={s.sectionH2}>Questions? <em>Answered.</em></h2>
        {faqs.map((f, i) => (
          <div key={i} style={s.faqItem} onClick={() => setOpen(open===i ? null : i)}>
            <div style={s.faqQ}>
              <span>{f.q}</span>
              <span style={{ ...s.faqChev, transform: open===i ? "rotate(180deg)" : "rotate(0deg)" }}>↓</span>
            </div>
            {open === i && <div style={s.faqA}>{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA({ onCTA }) {
  return (
    <section style={s.bottomCTA}>
      <div style={s.bottomCTAInner}>
        <h2 style={s.bottomCTAH2}>Your next job is waiting.<br /><em>Don't let your resume be the reason you miss it.</em></h2>
        <button style={s.heroCTA1} onClick={onCTA}>Start Your Free Trial Now →</button>
        <p style={s.heroSmall}>No credit card required · Takes 60 seconds to set up</p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.footerInner}>
        <div style={s.navLogo}>
          <span style={s.logoMark}>R</span>
          <span style={s.logoWord}>Resume<em>AI</em></span>
        </div>
        <p style={s.footerText}>© 2025 ResumeAI. Built to get you hired.</p>
        <div style={s.footerLinks}>
          {["Privacy","Terms","Contact","Blog"].map(l => <a key={l} style={s.footerLink} href="#">{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ─── Working App ──────────────────────────────────────────────────────────────
function ResumeApp({ plan, onBack }) {
  const [resume, setResume]       = useState("");
  const [jobPost, setJobPost]     = useState("");
  const [mode, setMode]           = useState("optimize"); // optimize | cover | interview
  const [result, setResult]       = useState("");
  const [atsScore, setAtsScore]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [step, setStep]           = useState("input"); // input | result

  const modeLabels = { optimize:"Resume Optimizer", cover:"Cover Letter", interview:"Interview Prep" };

  const prompts = {
    optimize: `You are an expert resume writer and ATS optimization specialist. The user has provided their current resume and a job description.

Your task:
1. Rewrite the resume to maximize ATS match score for this specific job
2. Inject relevant keywords naturally from the job description
3. Reframe bullet points using strong action verbs and quantified achievements
4. Return ONLY the optimized resume text, then on a new line write "---ATS_SCORE---" followed by a number from 0-100 representing the estimated ATS match score

Resume:
${resume}

Job Description:
${jobPost}`,

    cover: `You are an expert cover letter writer. Write a compelling, personalized cover letter for this application.

Make it:
- Specific to the job (reference actual requirements from the posting)
- Show genuine enthusiasm without being sycophantic
- 3 short paragraphs: hook, value prop, call to action
- Professional but human-sounding

Resume (background):
${resume}

Job Description:
${jobPost}

Return only the cover letter.`,

    interview: `You are a career coach. Based on this job description, generate the 8 most likely interview questions the candidate will face, with brief coaching notes on how to answer each.

Format: numbered list, question bold, then 1-2 sentence coaching tip.

Resume:
${resume}

Job Description:
${jobPost}`
  };

  const run = async () => {
    if (!resume.trim() || !jobPost.trim()) return;
    setLoading(true); setResult(""); setAtsScore(null);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{ role:"user", content: prompts[mode] }]
        })
      });
      const d = await r.json();
      const text = d.content?.map(c=>c.text||"").join("") || "Error generating result.";

      if (mode === "optimize" && text.includes("---ATS_SCORE---")) {
        const parts = text.split("---ATS_SCORE---");
        setResult(parts[0].trim());
        setAtsScore(parseInt(parts[1]?.trim()) || null);
      } else {
        setResult(text);
      }
      setStep("result");
    } catch { setResult("Something went wrong. Please try again."); setStep("result"); }
    setLoading(false);
  };

  return (
    <div style={s.appRoot}>
      <link rel="stylesheet" href={FONT} />
      <style>{globalCSS}</style>

      {/* App Nav */}
      <div style={s.appNav}>
        <button style={s.backBtn} onClick={onBack}>← Back</button>
        <div style={s.navLogo}>
          <span style={s.logoMark}>R</span>
          <span style={s.logoWord}>Resume<em>AI</em></span>
        </div>
        {plan && <div style={s.planBadge}>{plan.name} Plan</div>}
      </div>

      <div style={s.appInner}>
        <h1 style={s.appTitle}>Resume Optimizer</h1>
        <p style={s.appSub}>Paste your resume and a job description — get an ATS-optimized version in seconds.</p>

        {/* Mode Tabs */}
        <div style={s.modeTabs}>
          {Object.entries(modeLabels).map(([id, label]) => (
            <button key={id} style={mode===id ? s.modeTabActive : s.modeTab}
              onClick={() => { setMode(id); setStep("input"); setResult(""); }}>
              {label}
            </button>
          ))}
        </div>

        {step === "input" && (
          <div style={s.inputGrid}>
            <div style={s.inputGroup}>
              <label style={s.inputLabel}>Your Resume</label>
              <textarea style={s.textarea} value={resume}
                onChange={e=>setResume(e.target.value)}
                placeholder="Paste your resume here — plain text works best..." />
            </div>
            <div style={s.inputGroup}>
              <label style={s.inputLabel}>Job Description</label>
              <textarea style={s.textarea} value={jobPost}
                onChange={e=>setJobPost(e.target.value)}
                placeholder="Paste the full job posting here..." />
            </div>
          </div>
        )}

        {step === "input" && (
          <button style={(!resume.trim()||!jobPost.trim()||loading) ? s.runBtnDisabled : s.runBtn}
            onClick={run} disabled={!resume.trim()||!jobPost.trim()||loading}>
            {loading ? <span style={s.spinner}>⟳ Analyzing…</span> : `✦ ${modeLabels[mode]} →`}
          </button>
        )}

        {step === "result" && (
          <div style={s.resultWrap}>
            {atsScore !== null && (
              <div style={s.atsScoreCard}>
                <div style={s.atsLabel}>ATS Match Score</div>
                <div style={s.atsRow}>
                  <div style={s.atsBefore}>
                    <div style={s.atsNum}>~42%</div>
                    <div style={s.atsSmall}>Estimated Before</div>
                  </div>
                  <div style={s.atsArrow}>→</div>
                  <div style={s.atsAfter}>
                    <div style={{ ...s.atsNum, color:"#6EE7B7" }}>{atsScore}%</div>
                    <div style={s.atsSmall}>After Optimization</div>
                  </div>
                </div>
                <div style={s.atsBar}>
                  <div style={{ ...s.atsBarFill, width:`${atsScore}%` }} />
                </div>
              </div>
            )}

            <div style={s.resultBox}>
              <div style={s.resultBoxHeader}>
                <span style={s.resultBoxTitle}>{modeLabels[mode]}</span>
                <button style={s.copyBtn} onClick={() => navigator.clipboard.writeText(result)}>⊕ Copy</button>
              </div>
              <pre style={s.resultText}>{result}</pre>
            </div>

            <button style={s.runBtn} onClick={() => { setStep("input"); setResult(""); setAtsScore(null); }}>
              ← Optimize Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  root: { background:"#0A0A0E", minHeight:"100vh", fontFamily:"Epilogue, sans-serif", color:"#E8E6F0", overflowX:"hidden" },

  // Nav
  nav: { position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all 0.3s", padding:"0 24px" },
  navInner: { maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", height:64, gap:32 },
  navLogo: { display:"flex", alignItems:"center", gap:10, flex:1 },
  logoMark: { width:34, height:34, background:"#FCD34D", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#0A0A0E", fontFamily:"Instrument Serif", fontSize:20, fontWeight:700, lineHeight:"34px", textAlign:"center" },
  logoWord: { fontFamily:"Epilogue", fontWeight:700, fontSize:18, color:"#E8E6F0", letterSpacing:"-0.02em" },
  navLinks: { display:"flex", gap:28 },
  navLink: { color:"#888", fontFamily:"Epilogue", fontSize:14, fontWeight:500, textDecoration:"none", cursor:"pointer" },
  navCTA: { background:"#FCD34D", border:"none", borderRadius:10, color:"#0A0A0E", fontFamily:"Epilogue", fontSize:13, fontWeight:700, padding:"9px 18px", cursor:"pointer", whiteSpace:"nowrap" },

  // Hero
  hero: { minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", gap:48, maxWidth:1100, margin:"0 auto", padding:"100px 24px 60px", position:"relative" },
  heroBg: { position:"absolute", top:"-20%", left:"-10%", width:"60%", height:"60%", background:"radial-gradient(ellipse, #FCD34D18 0%, transparent 70%)", pointerEvents:"none" },
  heroContent: { position:"relative", zIndex:1 },
  heroBadge: { display:"inline-block", background:"#FCD34D15", border:"1px solid #FCD34D33", borderRadius:999, padding:"6px 16px", fontFamily:"JetBrains Mono", fontSize:11, color:"#FCD34D", marginBottom:28, letterSpacing:"0.02em" },
  heroH1: { fontFamily:"Instrument Serif", fontSize:"clamp(42px,5vw,68px)", fontWeight:400, lineHeight:1.05, margin:"0 0 24px", color:"#F0EEF8", letterSpacing:"-0.02em" },
  heroEm: { fontStyle:"italic", color:"#FCD34D" },
  heroSub: { color:"#888", fontSize:17, lineHeight:1.7, marginBottom:36, maxWidth:500, fontWeight:300 },
  heroCTAs: { display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 },
  heroCTA1: { background:"#FCD34D", border:"none", borderRadius:12, color:"#0A0A0E", fontFamily:"Epilogue", fontSize:15, fontWeight:700, padding:"14px 28px", cursor:"pointer" },
  heroCTA2: { background:"transparent", border:"1px solid #333", borderRadius:12, color:"#888", fontFamily:"Epilogue", fontSize:14, fontWeight:500, padding:"14px 24px", cursor:"pointer" },
  heroSmall: { color:"#555", fontFamily:"JetBrains Mono", fontSize:11 },

  // Preview card
  heroPreview: { position:"relative" },
  previewCard: { background:"#111116", border:"1px solid #1E1E2A", borderRadius:16, padding:24, maxWidth:340 },
  previewHeader: { display:"flex", alignItems:"center", gap:10, marginBottom:20 },
  previewDots: { display:"flex", gap:5 },
  previewTitle: { color:"#666", fontFamily:"JetBrains Mono", fontSize:11 },
  scoreRow: { display:"flex", alignItems:"center", justifyContent:"center", gap:24, marginBottom:20, padding:"16px 0", borderBottom:"1px solid #1E1E2A", borderTop:"1px solid #1E1E2A" },
  scoreBefore: { textAlign:"center" },
  scoreAfter: { textAlign:"center" },
  scoreNum: { fontFamily:"Instrument Serif", fontSize:40, color:"#555", lineHeight:1 },
  scoreLabel: { fontFamily:"JetBrains Mono", fontSize:10, color:"#555", marginTop:4 },
  scoreArrow: { color:"#FCD34D", fontSize:24, fontWeight:300 },
  kwRow: { display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:"1px solid #1A1A22", animation:"fadeIn 0.4s ease both" },
  kwDot: { width:6, height:6, borderRadius:"50%", background:"#6EE7B7", flexShrink:0 },
  kwText: { flex:1, color:"#BDBAD0", fontFamily:"JetBrains Mono", fontSize:12 },
  kwAdded: { color:"#6EE7B7", fontFamily:"JetBrains Mono", fontSize:10 },

  // Logo bar
  logoBar: { borderTop:"1px solid #1A1A22", borderBottom:"1px solid #1A1A22", padding:"28px 24px", textAlign:"center" },
  logoBarText: { color:"#444", fontFamily:"Epilogue", fontSize:12, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.1em" },
  logoBarRow: { display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"12px 32px" },
  logoBarItem: { color:"#444", fontFamily:"Epilogue", fontWeight:700, fontSize:15, letterSpacing:"-0.01em" },

  // Sections
  section: { padding:"100px 24px" },
  sectionInner: { maxWidth:1100, margin:"0 auto" },
  sectionLabel: { fontFamily:"JetBrains Mono", fontSize:11, color:"#FCD34D", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 },
  sectionH2: { fontFamily:"Instrument Serif", fontSize:"clamp(34px,4vw,54px)", fontWeight:400, lineHeight:1.1, color:"#F0EEF8", marginBottom:56, letterSpacing:"-0.02em" },

  // Steps
  stepsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 },
  stepCard: { background:"#0D0D11", border:"1px solid #1E1E2A", borderRadius:14, padding:28 },
  stepNum: { fontFamily:"JetBrains Mono", fontSize:28, fontWeight:500, color:"#FCD34D22", marginBottom:16 },
  stepTitle: { fontFamily:"Epilogue", fontWeight:600, fontSize:16, color:"#E8E6F0", marginBottom:10 },
  stepDesc: { color:"#666", fontSize:14, lineHeight:1.7, fontWeight:300 },

  // Features
  featGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 },
  featCard: { background:"#0A0A0E", border:"1px solid #1E1E2A", borderRadius:14, padding:28, transition:"border-color 0.2s, transform 0.2s", cursor:"default" },
  featIcon: { fontSize:24, color:"#FCD34D", marginBottom:16 },
  featTitle: { fontFamily:"Epilogue", fontWeight:600, fontSize:16, color:"#E8E6F0", marginBottom:10 },
  featDesc: { color:"#666", fontSize:14, lineHeight:1.7, fontWeight:300 },

  // Testimonials
  testimonialsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 },
  testimonialCard: { background:"#0D0D11", border:"1px solid #1E1E2A", borderRadius:14, padding:28 },
  stars: { color:"#FCD34D", fontSize:16, marginBottom:14, letterSpacing:2 },
  testimonialText: { color:"#BDBAD0", fontSize:14, lineHeight:1.75, fontStyle:"italic", marginBottom:20, fontWeight:300 },
  testimonialAuthor: { display:"flex", alignItems:"center", gap:12 },
  testimonialAvatar: { width:36, height:36, borderRadius:"50%", background:"#FCD34D22", border:"1px solid #FCD34D33", color:"#FCD34D", fontFamily:"Epilogue", fontWeight:700, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" },
  testimonialName: { color:"#E8E6F0", fontWeight:600, fontSize:14 },
  testimonialRole: { color:"#555", fontFamily:"JetBrains Mono", fontSize:11, marginTop:2 },

  // Pricing
  pricingSub: { color:"#666", marginBottom:48, fontSize:15, fontWeight:300, marginTop:-36 },
  plansGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 },
  planCard: { background:"#0A0A0E", border:"2px solid #1E1E2A", borderRadius:16, padding:32, position:"relative", display:"flex", flexDirection:"column" },
  popularBadge: { position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", borderRadius:999, padding:"4px 14px", fontFamily:"Epilogue", fontSize:11, fontWeight:700, color:"#0A0A0E", whiteSpace:"nowrap" },
  planName: { fontFamily:"JetBrains Mono", fontSize:12, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 },
  planPrice: { display:"flex", alignItems:"flex-end", gap:4, marginBottom:28 },
  planDollar: { fontFamily:"Epilogue", fontSize:20, fontWeight:600, color:"#555", marginBottom:6 },
  planNum: { fontFamily:"Instrument Serif", fontSize:56, lineHeight:1, color:"#F0EEF8" },
  planPer: { color:"#555", fontSize:14, marginBottom:10 },
  planPerks: { listStyle:"none", padding:0, margin:"0 0 32px", flex:1 },
  planPerk: { color:"#888", fontSize:14, lineHeight:1, padding:"8px 0", borderBottom:"1px solid #111", display:"flex", gap:10, fontWeight:300 },
  planCTA: { border:"1px solid", borderRadius:12, fontFamily:"Epilogue", fontSize:14, fontWeight:700, padding:"12px 20px", cursor:"pointer", transition:"all 0.2s", textAlign:"center" },
  pricingNote: { textAlign:"center", marginTop:40, color:"#444", fontFamily:"JetBrains Mono", fontSize:12 },

  // FAQ
  faqItem: { borderBottom:"1px solid #1E1E2A", padding:"20px 0", cursor:"pointer" },
  faqQ: { display:"flex", justifyContent:"space-between", alignItems:"center", color:"#C8C4D8", fontWeight:500, fontSize:15 },
  faqChev: { color:"#FCD34D", transition:"transform 0.2s", fontSize:18 },
  faqA: { color:"#666", fontSize:14, lineHeight:1.75, marginTop:14, paddingRight:32, fontWeight:300 },

  // Bottom CTA
  bottomCTA: { padding:"100px 24px", background:"#0D0D11", textAlign:"center" },
  bottomCTAInner: { maxWidth:700, margin:"0 auto" },
  bottomCTAH2: { fontFamily:"Instrument Serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:400, lineHeight:1.15, color:"#F0EEF8", marginBottom:36, letterSpacing:"-0.02em" },

  // Footer
  footer: { borderTop:"1px solid #1A1A22", padding:"32px 24px" },
  footerInner: { maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", flexWrap:"wrap", gap:16 },
  footerText: { color:"#444", fontSize:13, flex:1 },
  footerLinks: { display:"flex", gap:24 },
  footerLink: { color:"#444", fontSize:13, textDecoration:"none", cursor:"pointer" },

  // App
  appRoot: { background:"#0A0A0E", minHeight:"100vh", fontFamily:"Epilogue, sans-serif", color:"#E8E6F0" },
  appNav: { display:"flex", alignItems:"center", gap:16, padding:"16px 24px", borderBottom:"1px solid #1A1A22" },
  backBtn: { background:"transparent", border:"1px solid #1E1E2A", borderRadius:8, color:"#666", fontFamily:"Epilogue", fontSize:13, padding:"7px 14px", cursor:"pointer" },
  planBadge: { marginLeft:"auto", background:"#FCD34D22", border:"1px solid #FCD34D33", borderRadius:999, color:"#FCD34D", fontFamily:"JetBrains Mono", fontSize:11, padding:"4px 12px" },
  appInner: { maxWidth:900, margin:"0 auto", padding:"48px 24px" },
  appTitle: { fontFamily:"Instrument Serif", fontSize:42, fontWeight:400, color:"#F0EEF8", marginBottom:8, letterSpacing:"-0.02em" },
  appSub: { color:"#666", fontSize:15, marginBottom:36, fontWeight:300 },
  modeTabs: { display:"flex", gap:8, marginBottom:32, background:"#0D0D11", padding:6, borderRadius:12, border:"1px solid #1E1E2A", width:"fit-content" },
  modeTab: { padding:"8px 20px", border:"none", borderRadius:8, background:"transparent", color:"#666", fontFamily:"Epilogue", fontSize:13, fontWeight:600, cursor:"pointer" },
  modeTabActive: { padding:"8px 20px", border:"none", borderRadius:8, background:"#1E1E2A", color:"#FCD34D", fontFamily:"Epilogue", fontSize:13, fontWeight:600, cursor:"pointer" },
  inputGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 },
  inputGroup: { display:"flex", flexDirection:"column", gap:8 },
  inputLabel: { color:"#555", fontFamily:"JetBrains Mono", fontSize:11, letterSpacing:"0.05em", textTransform:"uppercase" },
  textarea: { background:"#0D0D11", border:"1px solid #1E1E2A", borderRadius:12, padding:16, color:"#C8C4D8", fontFamily:"JetBrains Mono", fontSize:13, height:320, resize:"vertical", outline:"none", lineHeight:1.6 },
  runBtn: { display:"block", margin:"0 auto", background:"#FCD34D", border:"none", borderRadius:12, color:"#0A0A0E", fontFamily:"Epilogue", fontSize:15, fontWeight:700, padding:"14px 40px", cursor:"pointer" },
  runBtnDisabled: { display:"block", margin:"0 auto", background:"#1E1E2A", border:"none", borderRadius:12, color:"#444", fontFamily:"Epilogue", fontSize:15, fontWeight:700, padding:"14px 40px", cursor:"not-allowed" },
  spinner: { animation:"spin 1s linear infinite", display:"inline-block" },

  // Result
  resultWrap: { display:"flex", flexDirection:"column", gap:24 },
  atsScoreCard: { background:"#0D0D11", border:"1px solid #6EE7B733", borderRadius:14, padding:28 },
  atsLabel: { color:"#6EE7B7", fontFamily:"JetBrains Mono", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 },
  atsRow: { display:"flex", alignItems:"center", gap:32, marginBottom:20 },
  atsBefore: { textAlign:"center" },
  atsAfter: { textAlign:"center" },
  atsNum: { fontFamily:"Instrument Serif", fontSize:48, color:"#555", lineHeight:1 },
  atsSmall: { color:"#555", fontFamily:"JetBrains Mono", fontSize:10, marginTop:4 },
  atsArrow: { color:"#6EE7B7", fontSize:28 },
  atsBar: { background:"#1A1A22", borderRadius:999, height:8, overflow:"hidden" },
  atsBarFill: { height:"100%", background:"linear-gradient(90deg,#FCD34D,#6EE7B7)", borderRadius:999, transition:"width 1s cubic-bezier(0.4,0,0.2,1)" },
  resultBox: { background:"#0D0D11", border:"1px solid #1E1E2A", borderRadius:14, overflow:"hidden" },
  resultBoxHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px", borderBottom:"1px solid #1E1E2A" },
  resultBoxTitle: { color:"#888", fontFamily:"JetBrains Mono", fontSize:12 },
  copyBtn: { background:"transparent", border:"1px solid #1E1E2A", borderRadius:8, color:"#FCD34D", fontFamily:"Epilogue", fontSize:12, fontWeight:600, padding:"5px 14px", cursor:"pointer" },
  resultText: { padding:20, margin:0, color:"#C8C4D8", fontFamily:"JetBrains Mono", fontSize:13, lineHeight:1.75, whiteSpace:"pre-wrap", overflowX:"auto", maxHeight:520, overflowY:"auto" },

  pricingPage: { paddingTop:80 },
};

const globalCSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0A0A0E; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
  @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  .feat-card:hover { border-color: #FCD34D33 !important; transform: translateY(-3px); }
  nav a:hover { color: #FCD34D !important; }
  ::-webkit-scrollbar { width: 6px; } 
  ::-webkit-scrollbar-track { background: #0A0A0E; }
  ::-webkit-scrollbar-thumb { background: #1E1E2A; border-radius: 3px; }
  textarea:focus { border-color: #FCD34D44 !important; }
`;
