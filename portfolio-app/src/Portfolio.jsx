import { useState, useEffect, useRef } from "react";

/* ── DESIGN TOKENS ── */
const DARK = {
  bg: "#07070f", bg2: "#0e0e1f", bg3: "#13132a",
  text: "#f0f0ff", muted: "#7a7a9a",
  accent: "#7c6fff", accent2: "#ff6fb4", accent3: "#6fffe8",
  card: "rgba(18,18,34,0.5)", border: "rgba(124,111,255,0.15)",
};
const LIGHT = {
  bg: "#f5f5ff", bg2: "#eeeeff", bg3: "#e5e5fa",
  text: "#0a0a1a", muted: "#555575",
  accent: "#5b4ef0", accent2: "#d94e96", accent3: "#00b89a",
  card: "rgba(255,255,255,0.8)", border: "rgba(91,78,240,0.18)",
};

/* ── DATA ── */
const PROJECTS = [
  {
    num: "01",
    name: "CravEX — Smart Campus Food Ordering",
    badge: "In Development",
    badgeKind: "dev",
    desc: "Digitises campus food order flows for multiple vendors, cutting estimated student wait times by 40%. Robust PostgreSQL schema with complex many-to-many relationships, JWT-based RBAC, and sub-100ms FastAPI responses.",
    tags: [{ label: "FastAPI", kind: "a" }, { label: "React", kind: "a" }, { label: "PostgreSQL", kind: "a" }, { label: "JWT", kind: "a" }],
    link: "https://github.com/Day-Dreamer98/CravEX",
  },
  {
    num: "02",
    name: "DeepShield — Neural Deepfake Detection",
    badge: "Active Research",
    badgeKind: "dev",
    desc: "Dual-stage pipeline detecting GAN & Diffusion deepfakes with low-latency inference for browser environments. Privacy-first: all scanning stays local. Authoring a research paper on lightweight neural networks in forensic analysis.",
    tags: [{ label: "Python", kind: "a2" }, { label: "FastAPI", kind: "a2" }, { label: "ML", kind: "a2" }, { label: "Research", kind: "a2" }],
    link: "https://github.com/piyali2608/Deep-shield",
  },
  {
    num: "03",
    name: "Smart-Readme-Agent",
    badge: "Fully Deployed",
    badgeKind: "live",
    desc: "AI agent using LangGraph + Gemini 1.5 Flash for autonomous codebase analysis and README generation. FAISS-powered semantic retrieval reduces manual documentation time by 90%. Containerised with Docker, deployed on Streamlit Cloud.",
    tags: [{ label: "LangGraph", kind: "a3" }, { label: "Gemini Pro", kind: "a3" }, { label: "Streamlit", kind: "a3" }, { label: "Docker", kind: "a3" }, { label: "FAISS", kind: "a3" }],
    link: "https://github.com/piyali2608/Smart-Readme-Agent",
  },
  {
    num: "04",
    name: "Click-Bait Filter",
    badge: "Chrome Extension",
    badgeKind: "live",
    desc: "Chrome extension leveraging LLMs to provide real-time article summaries and 'Clickbait Scores', helping users preserve monthly article limits and avoid sensationalised content.",
    tags: [{ label: "JavaScript", kind: "a" }, { label: "Gemini 1.5 Flash", kind: "a" }, { label: "Chrome Extension API", kind: "a" }],
    link: "https://github.com/piyali2608/Click-bait-Filter",
  },
  {
    num: "05",
    name: "FORMA",
    badge: "Fully Deployed",
    badgeKind: "live",
    desc: "A beautifully crafted form and data collection platform built with HTML. Features an MIT-licensed open-source design system focused on clean, accessible form UIs.",
    tags: [{ label: "HTML", kind: "a3" }, { label: "CSS", kind: "a3" }, { label: "MIT License", kind: "a3" }],
    link: "https://github.com/piyali2608/FORMA",
  },
  {
    num: "06",
    name: "CollegeScope",
    badge: "Fully Deployed",
    badgeKind: "live",
    desc: "High-performance, full-stack college discovery platform designed to streamline the search and comparison of premier Indian educational institutions. Built with a modern Node.js/Express stack.",
    tags: [{ label: "HTML", kind: "a2" }, { label: "Node.js", kind: "a2" }, { label: "Express", kind: "a2" }, { label: "Full-Stack", kind: "a2" }],
    link: "https://github.com/piyali2608/collegescope",
  },
  {
    num: "07",
    name: "InAmigos Foundation",
    badge: "Fully Deployed",
    badgeKind: "live",
    desc: "The digital home of InAmigos Foundation — Serving humanity with compassion through 6 pillars of community change. A fully deployed social impact web presence built with HTML.",
    tags: [{ label: "HTML", kind: "a3" }, { label: "CSS", kind: "a3" }, { label: "MIT License", kind: "a3" }],
    link: "https://github.com/piyali2608/InAmigos",
  },
];

const SKILLS = [
  { label: "Languages", items: ["Python", "JavaScript (ES6+)", "C / C++", "HTML / CSS", "SQL · PostgreSQL"] },
  { label: "Frameworks & Libraries", items: ["React.js", "FastAPI", "Node.js", "LangChain · LangGraph", "Streamlit", "Tailwind CSS"] },
  { label: "AI / ML", items: ["Gemini Pro", "GPT-4", "RAG Pipelines", "FAISS · Vector DBs", "Scikit-learn", "Neural Networks"] },
  { label: "Design & DevOps", items: ["Figma", "Canva", "Docker", "Git / GitHub", "Vercel", "Linux", "Postman"] },
];

const EXPERIENCE = [
  { icon: "🤖", role: "Member — AI/ML Wing", org: "Epoch · IIIT Sri City", date: "Oct 2025 – Present", desc: "Contributing to ML project development and technical workshops. Implementing ML models and exploring emerging AI technologies within the student community.", color: "rgba(124,111,255,0.15)" },
  { icon: "🎨", role: "Designer — UI/UX & Graphic Design", org: "Enigma Design Club · IIIT Sri City", date: "Oct 2025 – Present", desc: "Leading UI/UX and graphic design initiatives for campus-wide technical events using Figma and Canva. Creating cohesive digital branding assets for club activities.", color: "rgba(255,111,180,0.15)" },
  { icon: "🚀", role: "Sponsorship, Hospitality & Marketing Design Lead", org: "UDBHAV — Inter-IIIT Hackathon", date: "Sept 2025 – Jan 2026", desc: "Spearheaded visual identity for the first-ever Inter-IIIT Hackathon reaching 500+ students. Managed hospitality for 50+ participants from IIIT Kalyani, Agartala & Manipur. Secured industrial partnerships.", color: "rgba(111,255,232,0.15)" },
  { icon: "🌸", role: "Core Design Team Member", org: "ABHISARGA — Annual Techno-Cultural Fest", date: "Dec 2025 – Present", desc: "Conceptualised and designed the visual identity for the institute's flagship cultural fest, creating high-fidelity assets for social media and physical branding.", color: "rgba(124,111,255,0.12)" },
  { icon: "☕", role: "Event Organiser & Host", org: "Cyber Tea 3.0 — National Cybersecurity Workshop", date: "Dec 2025", desc: "Successfully organised and hosted an All-India cybersecurity workshop, facilitating technical sessions for participants across various engineering colleges nationwide.", color: "rgba(255,111,180,0.12)" },
];

/* ── HELPERS ── */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, t }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section id={id} ref={ref} style={{
      maxWidth: 920, margin: "0 auto", padding: "4rem 2.5rem",
      position: "relative", zIndex: 1,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      {children}
    </section>
  );
}

function SecLabel({ t, children }) {
  return <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent, fontWeight: 500, marginBottom: "0.5rem" }}>{children}</div>;
}
function SecTitle({ t, children }) {
  return <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: t.text, marginBottom: "2rem", lineHeight: 1.15 }}>{children}</div>;
}

/* ── PARTICLES ── */
function Particles({ light }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;
    const COLORS = ["#7c6fff", "#ff6fb4", "#6fffe8"];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const mkP = () => ({ x: Math.random() * W, y: H + Math.random() * 40, r: Math.random() * 2.2 + 0.4, vx: (Math.random() - 0.5) * 0.3, vy: -(Math.random() * 0.55 + 0.15), alpha: Math.random() * 0.55 + 0.1, color: COLORS[Math.floor(Math.random() * 3)] });
    const init = () => { particles = []; for (let i = 0; i < 70; i++) { const p = mkP(); p.y = Math.random() * H; particles.push(p); } };
    const hex = (c, a) => c + Math.max(0, Math.min(255, Math.floor(a * 255))).toString(16).padStart(2, "0");
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hex(p.color, p.alpha); ctx.fill();
        if (!light) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
            if (d < 110) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = hex(p.color, (1 - d / 110) * 0.12); ctx.lineWidth = 0.5; ctx.stroke(); }
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.y < -12) { const np = mkP(); Object.assign(p, np); }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [light]);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ── BADGE ── */
function Badge({ kind, t, children }) {
  const styles = {
    live: { background: "rgba(111,255,232,0.15)", color: t.accent3 },
    dev: { background: "rgba(255,111,180,0.15)", color: t.accent2 },
  };
  return <span style={{ fontSize: "0.7rem", padding: "0.22rem 0.75rem", borderRadius: 999, fontWeight: 500, flexShrink: 0, whiteSpace: "nowrap", ...styles[kind] }}>{children}</span>;
}

/* ── PTAG ── */
function PTag({ kind, t, children }) {
  const styles = {
    a: { background: "rgba(124,111,255,0.15)", color: t.accent },
    a2: { background: "rgba(255,111,180,0.15)", color: t.accent2 },
    a3: { background: "rgba(111,255,232,0.15)", color: t.accent3 },
  };
  return <span style={{ fontSize: "0.72rem", padding: "0.22rem 0.65rem", borderRadius: 999, fontWeight: 500, ...styles[kind] }}>{children}</span>;
}

/* ── MAIN COMPONENT ── */
export default function Portfolio() {
  const [light, setLight] = useState(false);
  const t = light ? LIGHT : DARK;

  const smoothTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const divider = <hr style={{ border: "none", borderTop: `1px solid ${t.border}`, margin: "0 2.5rem" }} />;

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes floatup{0%{transform:translateY(0) rotate(var(--r,0deg))}100%{transform:translateY(var(--dy,-14px)) rotate(var(--r,0deg))}}
        .skill-pill:hover{transform:translateY(-5px)!important;border-color:${t.accent}!important;background:rgba(124,111,255,0.1)!important}
        .proj-card:hover{transform:translateY(-5px)!important;border-color:${t.accent}!important;box-shadow:0 16px 40px rgba(124,111,255,0.08)!important}
        .proj-card:hover .proj-num{color:${t.accent}!important}
        .nav-link:hover{color:${t.text}!important}
        .c-item:hover{transform:translateY(-5px)!important;border-color:${t.accent}!important}
        .btn-p:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.2)}
        .btn-o:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.2)}
        .proj-link:hover{opacity:0.8}
      `}</style>

      <Particles light={light} />

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 2.5rem", background: t.bg2,
        borderBottom: `1px solid ${t.border}`,
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)",
      }}>
        <a href="#" style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, letterSpacing: "0.03em", color: t.text, textDecoration: "none" }}>
          piyali<span style={{ color: t.accent }}>.</span>barman
        </a>
        <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none" }}>
          {["about", "skills", "projects", "experience", "contact"].map(id => (
            <li key={id}><a className="nav-link" onClick={() => smoothTo(id)} style={{ fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", color: t.muted, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s", cursor: "pointer" }}>{id === "projects" ? "Work" : id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
          ))}
        </ul>
        <div onClick={() => setLight(l => !l)} style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          background: t.bg3, border: `1px solid ${t.border}`,
          borderRadius: 999, padding: "4px 10px 4px 4px", cursor: "pointer", userSelect: "none",
        }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1)" }}>
            {light ? "☀" : "☽"}
          </div>
          <span style={{ fontSize: 13, color: t.muted, padding: "0 4px" }}>{light ? "Light" : "Dark"}</span>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "5rem 2rem 4rem", position: "relative", overflow: "hidden" }}>
        {[["320px", "18s", "solid"], ["520px", "32s", "dashed"], ["720px", "52s", "solid"]].map(([size, dur, style], i) => (
          <div key={i} style={{ position: "absolute", width: size, height: size, top: "50%", left: "50%", borderRadius: "50%", border: `1px ${style} ${t.border}`, animation: `spin ${dur} linear infinite`, transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        ))}
        {[
          { label: "FastAPI", cls: "t1", dot: t.accent, style: { top: "20%", left: "6%", "--dy": "-16px", "--r": "-4deg", animationDuration: "3.2s", animationDelay: "-0.5s" } },
          { label: "UI/UX Design", cls: "t2", dot: t.accent2, style: { top: "25%", right: "7%", "--dy": "-10px", "--r": "3deg", animationDuration: "4s", animationDelay: "-1s" } },
          { label: "LLMs & RAG", cls: "t3", dot: t.accent3, style: { bottom: "20%", left: "8%", "--dy": "-18px", "--r": "-2deg", animationDuration: "3.6s", animationDelay: "-2s" } },
          { label: "React.js", cls: "t4", dot: t.accent, style: { bottom: "26%", right: "7%", "--dy": "-12px", "--r": "5deg", animationDuration: "2.8s", animationDelay: "-0.3s" } },
          { label: "Docker", cls: "t5", dot: t.accent2, style: { top: "13%", left: "40%", "--dy": "-8px", "--r": "1deg", animationDuration: "5s", animationDelay: "-1.5s" } },
          { label: "Neural Nets", cls: "t6", dot: t.accent3, style: { bottom: "14%", left: "38%", "--dy": "-14px", "--r": "-3deg", animationDuration: "4.4s", animationDelay: "-2.5s" } },
        ].map(({ label, dot, style }) => (
          <div key={label} style={{ position: "absolute", background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: "0.42rem 0.9rem", fontSize: "0.76rem", fontWeight: 500, color: t.muted, backdropFilter: "blur(14px)", animation: "floatup linear infinite alternate", whiteSpace: "nowrap", zIndex: 2, ...style }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", marginRight: 6, verticalAlign: "middle", background: dot }} />{label}
          </div>
        ))}
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: t.accent, fontWeight: 500, marginBottom: "1.1rem", position: "relative", zIndex: 3 }}>Full-Stack · AI/ML · Design</div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.6rem,7vw,4.5rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", color: t.text, position: "relative", zIndex: 3, marginBottom: "1rem" }}>
          Building things<br />that <span style={{ background: `linear-gradient(90deg,${t.accent},${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>float above</span><br />the ordinary
        </h1>
        <p style={{ fontSize: "1.05rem", color: t.muted, fontWeight: 300, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2.2rem", position: "relative", zIndex: 3 }}>
          Developer, designer & AI enthusiast crafting smart, privacy-first digital experiences from concept to deployment.
        </p>
        <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 3 }}>
          <button className="btn-p" onClick={() => smoothTo("projects")} style={{ padding: "0.7rem 1.7rem", borderRadius: 999, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", border: "none", background: t.accent, color: "#fff", fontFamily: "'Space Grotesk',sans-serif", transition: "transform 0.2s,box-shadow 0.2s" }}>See my work</button>
          <button className="btn-o" onClick={() => smoothTo("contact")} style={{ padding: "0.7rem 1.7rem", borderRadius: 999, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", background: "transparent", border: `1px solid ${t.border}`, color: t.text, fontFamily: "'Space Grotesk',sans-serif", transition: "transform 0.2s,box-shadow 0.2s" }}>Get in touch</button>
        </div>
      </section>

      {divider}

      {/* ABOUT */}
      <Section id="about" t={t}>
        <SecLabel t={t}>Who I am</SecLabel>
        <SecTitle t={t}>About me</SecTitle>
        <p style={{ fontSize: "1rem", color: t.muted, lineHeight: 1.85, fontWeight: 300, maxWidth: 640 }}>
          First-year CSE student at IIIT Sri City with a deep love for building systems that actually matter — from campus food ordering apps that slash wait times, to neural deepfake detectors that keep your data private. I move between backend engineering, AI research, and pixel-perfect design without missing a beat.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
          {[{ num: "7+", label: "Projects shipped", color: t.accent }, { num: "500+", label: "Students reached", color: t.accent2 }, { num: "1", label: "Paper in progress", color: t.accent }].map(s => (
            <div key={s.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "1.1rem 1.4rem", flex: 1, minWidth: 130, backdropFilter: "blur(10px)" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: "0.74rem", color: t.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {divider}

      {/* SKILLS */}
      <Section id="skills" t={t}>
        <SecLabel t={t}>What I use</SecLabel>
        <SecTitle t={t}>Skills & tools</SecTitle>
        {SKILLS.map(group => (
          <div key={group.label} style={{ marginBottom: "1.3rem" }}>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", color: t.muted, marginBottom: "0.6rem" }}>{group.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
              {group.items.map(skill => (
                <span key={skill} className="skill-pill" style={{ padding: "0.4rem 1rem", borderRadius: 999, fontSize: "0.8rem", fontWeight: 500, border: `1px solid ${t.border}`, background: t.card, color: t.text, backdropFilter: "blur(8px)", transition: "transform 0.2s,border-color 0.2s,background 0.2s", cursor: "default" }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {divider}

      {/* PROJECTS */}
      <Section id="projects" t={t}>
        <SecLabel t={t}>What I've built</SecLabel>
        <SecTitle t={t}>Featured projects</SecTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {PROJECTS.map(p => (
            <div key={p.num} className="proj-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: "1.5rem 1.8rem", backdropFilter: "blur(14px)", display: "flex", gap: "1.3rem", alignItems: "flex-start", flexWrap: "wrap", transition: "transform 0.22s,border-color 0.22s,box-shadow 0.22s" }}>
              <div className="proj-num" style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: t.border, lineHeight: 1, flexShrink: 0, width: "2.8rem", transition: "color 0.2s" }}>{p.num}</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.08rem", fontWeight: 700, color: t.text }}>{p.name}</div>
                  <Badge kind={p.badgeKind} t={t}>{p.badge}</Badge>
                </div>
                <div style={{ fontSize: "0.87rem", color: t.muted, lineHeight: 1.65, fontWeight: 300, marginBottom: "0.8rem" }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.38rem", alignItems: "center" }}>
                  {p.tags.map(tag => <PTag key={tag.label} kind={tag.kind} t={t}>{tag.label}</PTag>)}
                  {p.link && (
                    <a className="proj-link" href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: "0.75rem", color: t.accent, textDecoration: "none", border: `1px solid ${t.border}`, borderRadius: 999, padding: "0.2rem 0.7rem", transition: "opacity 0.2s" }}>
                      ↗ GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {divider}

      {/* EXPERIENCE */}
      <Section id="experience" t={t}>
        <SecLabel t={t}>Roles & contributions</SecLabel>
        <SecTitle t={t}>Experience & Leadership</SecTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", left: 22, top: 36, bottom: 36, width: 1, background: `linear-gradient(to bottom,${t.accent},${t.accent2})`, opacity: 0.3 }} />
          {EXPERIENCE.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: "1.4rem", padding: "1.3rem 0", alignItems: "flex-start", position: "relative" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, position: "relative", zIndex: 1, background: e.color, border: `2px solid ${t.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>{e.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.98rem", fontWeight: 500, color: t.text, marginBottom: 2 }}>{e.role}</div>
                <div style={{ fontSize: "0.84rem", color: t.accent, fontWeight: 400, marginBottom: 3 }}>{e.org}</div>
                <div style={{ fontSize: "0.74rem", color: t.muted, letterSpacing: "0.06em", marginBottom: 6 }}>{e.date}</div>
                <div style={{ fontSize: "0.84rem", color: t.muted, lineHeight: 1.65, fontWeight: 300 }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {divider}

      {/* CONTACT */}
      <Section id="contact" t={t}>
        <SecLabel t={t}>Let's connect</SecLabel>
        <SecTitle t={t}>Get in touch</SecTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
          {[
            { href: "mailto:piyali.b25@iiits.in", icon: "✉", bg: "rgba(124,111,255,0.18)", color: t.accent, label: "Email", val: "piyali.b25@iiits.in" },
            { href: "https://www.linkedin.com/in/piyali-barman-424085381/", icon: "in", bg: "rgba(255,111,180,0.18)", color: t.accent2, label: "LinkedIn", val: "piyali-barman" },
            { href: "https://github.com/piyali2608", icon: "gh", bg: "rgba(111,255,232,0.18)", color: t.accent3, label: "GitHub", val: "piyali2608" },
            { href: null, icon: "☎", bg: "rgba(124,111,255,0.18)", color: t.accent, label: "Phone", val: "+91 85090 01560" },
          ].map(c => (
            <a key={c.label} className="c-item" href={c.href || undefined} target={c.href ? "_blank" : undefined} rel="noopener noreferrer" style={{ flex: 1, minWidth: 170, background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "1.1rem 1.3rem", display: "flex", alignItems: "center", gap: "0.9rem", textDecoration: "none", transition: "transform 0.2s,border-color 0.2s", backdropFilter: "blur(10px)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: c.href && !c.icon.includes("✉") && !c.icon.includes("☎") ? 13 : 15, flexShrink: 0, fontWeight: 700, background: c.bg, color: c.color }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: t.muted, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: t.text }}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "2.5rem", fontSize: "0.8rem", color: t.muted, borderTop: `1px solid ${t.border}`, marginTop: "2rem", position: "relative", zIndex: 1 }}>
        Crafted with <span style={{ color: t.accent }}>♥</span> by Piyali Barman · <span style={{ color: t.accent }}>piyali2608</span>
      </footer>
    </div>
  );
}
