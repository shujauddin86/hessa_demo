
import { useState, useEffect, useRef } from "react";

// ─── Fonts via Google ───────────────────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #000;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  :root {
    --red: #FF2B2B;
    --red-dim: rgba(255,43,43,0.15);
    --white: #FFFFFF;
    --grey: #888;
    --card-bg: rgba(255,255,255,0.05);
    --border: rgba(255,255,255,0.08);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes progressRing {
    from { stroke-dashoffset: 283; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes slideRight {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
  }
  @keyframes barProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes cardSlideIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(style);

// ─── Shared Components ───────────────────────────────────────────────────────

const Btn = ({ children, onClick, variant = "primary", style: s }) => {
  const base = {
    width: "100%",
    padding: "17px 24px",
    borderRadius: 14,
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.18s ease",
    letterSpacing: 0.2,
  };
  const variants = {
    primary: { background: "var(--red)", color: "#fff" },
    secondary: {
      background: "transparent",
      color: "#fff",
      border: "1.5px solid var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--grey)",
      border: "none",
      fontSize: 14,
    },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...s }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
};

const Emotional = ({ text, delay = 0.4 }) => (
  <p style={{
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    fontStyle: "italic",
    fontFamily: "'Playfair Display', serif",
    textAlign: "center",
    lineHeight: 1.7,
    animation: `fadeUp 0.6s ease ${delay}s both`,
    padding: "0 8px",
  }}>
    {text}
  </p>
);

const Screen = ({ children, style: s }) => (
  <div style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
    overflowY: "auto",
    animation: "fadeIn 0.4s ease both",
    ...s,
  }}>
    {children}
  </div>
);

// ─── SCREEN 1: Login ─────────────────────────────────────────────────────────
function LoginScreen({ onNext }) {
  return (
    <Screen style={{ justifyContent: "center", gap: 0 }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.6s ease 0.1s both" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Hessa</span>
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#fff",
          maxWidth: 280,
          margin: "0 auto",
        }}>
          Your moments already exist.
          <em style={{ display: "block", color: "var(--red)", fontStyle: "italic", fontWeight: 600 }}>
            You just haven't seen them yet.
          </em>
        </p>
      </div>

      {/* Auth buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.6s ease 0.3s both" }}>
        <button
          onClick={onNext}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: 14,
            border: "1.5px solid var(--border)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            transition: "all 0.18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button
          onClick={onNext}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: 14,
            border: "none",
            background: "var(--red)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            transition: "all 0.18s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Continue with Phone
        </button>
      </div>

      <p style={{ color: "var(--grey)", fontSize: 12, textAlign: "center", marginTop: 24, animation: "fadeUp 0.6s ease 0.5s both" }}>
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </Screen>
  );
}

// ─── SCREEN 2: Upload ─────────────────────────────────────────────────────────
function UploadScreen({ onNext }) {
  const [dragging, setDragging] = useState(false);

  return (
    <Screen style={{ paddingTop: 60, gap: 0 }}>
      <div style={{ marginBottom: 32, animation: "fadeUp 0.6s ease 0.1s both" }}>
        <p style={{ color: "var(--grey)", fontSize: 13, marginBottom: 6 }}>Step 1 of 3</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.5 }}>
          Upload your<br />
          <span style={{ color: "var(--red)" }}>footage</span>
        </h1>
      </div>

      {/* Upload card */}
      <div
        onClick={onNext}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); onNext(); }}
        style={{
          border: `2px dashed ${dragging ? "var(--red)" : "var(--border)"}`,
          borderRadius: 20,
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "var(--red-dim)" : "var(--card-bg)",
          transition: "all 0.2s ease",
          animation: "fadeUp 0.6s ease 0.2s both",
          marginBottom: 16,
        }}
      >
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: "var(--red-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="var(--red)" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="17 8 12 3 7 8" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="var(--red)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Upload Video</p>
        <p style={{ color: "var(--grey)", fontSize: 13 }}>MP4, MOV, AVI · up to 4GB</p>
      </div>

      {/* Paste link */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 18px",
        borderRadius: 14,
        border: "1.5px solid var(--border)",
        background: "var(--card-bg)",
        animation: "fadeUp 0.6s ease 0.3s both",
        marginBottom: 24,
        cursor: "pointer",
      }}
      onClick={onNext}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="var(--grey)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="var(--grey)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ color: "var(--grey)", fontSize: 15 }}>Paste a link…</span>
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center", marginBottom: 20, animation: "fadeUp 0.6s ease 0.35s both" }}>
        Only videos you own or have permission to use
      </p>

      <Emotional text="Every video you've ever recorded holds something you missed." delay={0.5} />
    </Screen>
  );
}

// ─── SCREEN 3: Ownership ─────────────────────────────────────────────────────
function OwnershipScreen({ onNext }) {
  const [checked, setChecked] = useState(false);
  return (
    <Screen style={{ paddingTop: 80, justifyContent: "center", gap: 0 }}>
      <div style={{ animation: "fadeUp 0.6s ease 0.1s both", marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, marginBottom: 12 }}>
          Confirm<br/>
          <span style={{ color: "var(--red)" }}>ownership</span>
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 15, lineHeight: 1.6 }}>
          Before we scan your footage, we need your confirmation.
        </p>
      </div>

      <div
        onClick={() => setChecked(!checked)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          padding: "20px",
          borderRadius: 16,
          border: `1.5px solid ${checked ? "var(--red)" : "var(--border)"}`,
          background: checked ? "var(--red-dim)" : "var(--card-bg)",
          cursor: "pointer",
          transition: "all 0.2s",
          animation: "fadeUp 0.6s ease 0.2s both",
          marginBottom: 28,
        }}
      >
        <div style={{
          width: 24,
          height: 24,
          borderRadius: 8,
          border: `2px solid ${checked ? "var(--red)" : "var(--grey)"}`,
          background: checked ? "var(--red)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          transition: "all 0.2s",
        }}>
          {checked && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          I confirm that this video belongs to me or I have explicit permission to use it for this purpose.
        </p>
      </div>

      <Btn onClick={onNext} s={{ opacity: checked ? 1 : 0.35, pointerEvents: checked ? "auto" : "none" }}>
        Continue →
      </Btn>

      <div style={{ marginTop: 28 }}>
        <Emotional text="This is your footage. Your story. Your control." delay={0.4} />
      </div>
    </Screen>
  );
}

// ─── SCREEN 4: Scanning ───────────────────────────────────────────────────────
function ScanningScreen({ onNext }) {
  const [progress, setProgress] = useState(0);
  const radius = 45;
  const circ = 2 * Math.PI * radius;

  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += Math.random() * 3 + 0.5;
      if (val >= 100) { val = 100; clearInterval(id); setTimeout(onNext, 600); }
      setProgress(Math.min(val, 100));
    }, 60);
    return () => clearInterval(id);
  }, []);

  const offset = circ - (progress / 100) * circ;

  return (
    <Screen style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 0 }}>
      {/* Ring */}
      <div style={{ position: "relative", marginBottom: 40, animation: "fadeIn 0.6s ease both" }}>
        <svg width="160" height="160" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
          <circle
            cx="55" cy="55" r={radius}
            fill="none"
            stroke="var(--red)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dashoffset 0.1s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: 28, fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, animation: "fadeUp 0.6s ease 0.2s both" }}>
        Finding you in your footage…
      </h2>
      <p style={{ color: "var(--grey)", fontSize: 14, marginBottom: 40, animation: "fadeUp 0.6s ease 0.3s both" }}>
        Frame by frame. Moment by moment.
      </p>

      {/* Scan log */}
      <div style={{
        width: "100%",
        padding: "20px",
        borderRadius: 16,
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        textAlign: "left",
        animation: "fadeUp 0.6s ease 0.4s both",
        marginBottom: 32,
      }}>
        {["Analyzing faces…", "Detecting motion…", "Mapping moments…", "Scoring confidence…"].map((t, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 0",
            opacity: progress > i * 25 ? 1 : 0.2,
            transition: "opacity 0.4s",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: progress > i * 25 ? "var(--red)" : "var(--grey)",
              animation: progress > i * 25 && progress < (i + 1) * 25 ? "pulse 1s infinite" : "none",
            }} />
            <span style={{ fontSize: 13, color: progress > i * 25 ? "#fff" : "var(--grey)" }}>{t}</span>
          </div>
        ))}
      </div>

      <Emotional text="Somewhere in this video is a moment you forgot existed." delay={0.5} />
    </Screen>
  );
}

// ─── SCREEN 5: Moments Found ──────────────────────────────────────────────────
const MOMENTS = [
  { time: "00:47", label: "STRONG", conf: 97, color: "var(--red)", gradient: "linear-gradient(135deg,#1a0000,#3d0000)" },
  { time: "02:14", label: "STRONG", conf: 91, color: "var(--red)", gradient: "linear-gradient(135deg,#0d001a,#200030)" },
  { time: "04:33", label: "POSSIBLE", conf: 74, color: "#666", gradient: "linear-gradient(135deg,#0a0a0a,#1a1a1a)" },
  { time: "07:02", label: "POSSIBLE", conf: 68, color: "#666", gradient: "linear-gradient(135deg,#001a0d,#003020)" },
];

function MomentsScreen({ onNext }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(v => {
        if (v >= MOMENTS.length) { clearInterval(id); return v; }
        return v + 1;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <Screen style={{ paddingTop: 60, gap: 0 }}>
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>
        <p style={{ color: "var(--red)", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          {MOMENTS.length} moments found
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
          You were here.
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 15, marginTop: 4 }}>
          You just never saw it.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {MOMENTS.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px",
            borderRadius: 16,
            background: m.gradient,
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: i < visible ? 1 : 0,
            transform: i < visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.4s ease",
          }}>
            {/* Thumb */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(255,255,255,0.1)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.5)"/>
              </svg>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: m.color,
                  letterSpacing: 1,
                  padding: "2px 8px",
                  borderRadius: 6,
                  border: `1px solid ${m.color}`,
                  background: `${m.color}22`,
                }}>
                  {m.label}
                </span>
                <span style={{ color: "var(--grey)", fontSize: 12 }}>{m.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${m.conf}%`,
                    background: m.color,
                    borderRadius: 2,
                    transition: "width 0.8s ease",
                  }} />
                </div>
                <span style={{ color: "var(--grey)", fontSize: 12, minWidth: 32 }}>{m.conf}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible >= MOMENTS.length && (
        <div style={{ animation: "fadeUp 0.5s ease both" }}>
          <Btn onClick={onNext}>Build My Reel →</Btn>
        </div>
      )}
    </Screen>
  );
}

// ─── SCREEN 6: Story Selection ───────────────────────────────────────────────
const STORIES = [
  {
    id: "yours",
    title: "YOUR MOMENTS",
    desc: "Only you. Your story, uninterrupted.",
    icon: "👁️",
    accent: "#FF2B2B",
  },
  {
    id: "highlights",
    title: "HIGHLIGHTS",
    desc: "The best moments, instantly.",
    icon: "⚡",
    accent: "#FFB800",
  },
  {
    id: "memory",
    title: "MEMORY FLOW",
    desc: "Slower. Emotional. The way you remember it.",
    icon: "🌊",
    accent: "#4FC3F7",
  },
  {
    id: "group",
    title: "GROUP STORY",
    desc: "Same video. Different stories for everyone.",
    icon: "👥",
    accent: "#69F0AE",
  },
];

function StoryScreen({ onNext }) {
  const [selected, setSelected] = useState(null);

  return (
    <Screen style={{ paddingTop: 60, gap: 0 }}>
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>
        <p style={{ color: "var(--grey)", fontSize: 13, marginBottom: 6 }}>Choose your story</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
          Same video.<br/>
          <span style={{ color: "var(--red)" }}>Different story.</span>
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {STORIES.map((s, i) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: "18px 18px",
              borderRadius: 16,
              border: `1.5px solid ${selected === s.id ? s.accent : "var(--border)"}`,
              background: selected === s.id ? `${s.accent}15` : "var(--card-bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transition: "all 0.2s ease",
              animation: `cardSlideIn 0.5s ease ${0.1 + i * 0.08}s both`,
            }}
          >
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.8, color: selected === s.id ? s.accent : "#fff", marginBottom: 2 }}>
                {s.title}
              </p>
              <p style={{ fontSize: 13, color: "var(--grey)" }}>{s.desc}</p>
            </div>
            {selected === s.id && (
              <div style={{ marginLeft: "auto" }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: s.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ animation: "fadeUp 0.3s ease both" }}>
          <Btn onClick={onNext}>Create My Reel →</Btn>
        </div>
      )}
    </Screen>
  );
}

// ─── SCREEN 7: Reel Preview ───────────────────────────────────────────────────
const CAPTIONS = ["That moment", "You were here", "You didn't see this", "Right here", "This one"];

function ReelScreen({ onNext }) {
  const [capIdx, setCapIdx] = useState(0);
  const [capVisible, setCapVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const pid = setInterval(() => {
      p += 0.5;
      if (p >= 100) { clearInterval(pid); setTimeout(onNext, 800); }
      setProgress(Math.min(p, 100));
    }, 70);

    const cid = setInterval(() => {
      setCapVisible(false);
      setTimeout(() => {
        setCapIdx(v => (v + 1) % CAPTIONS.length);
        setCapVisible(true);
      }, 300);
    }, 2600);

    return () => { clearInterval(pid); clearInterval(cid); };
  }, []);

  // Gradient panels simulating video
  const panels = [
    "linear-gradient(135deg,#1a0a00,#3d1500,#7a2800)",
    "linear-gradient(135deg,#00101a,#001f3d,#003366)",
    "linear-gradient(135deg,#0a1a00,#1a3d00,#2d6600)",
    "linear-gradient(135deg,#1a001a,#3d0040,#660066)",
    "linear-gradient(135deg,#1a1000,#3d2800,#7a5000)",
  ];

  const panelIdx = Math.floor((progress / 100) * panels.length);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: panels[Math.min(panelIdx, panels.length - 1)],
      transition: "background 1.2s ease",
      animation: "fadeIn 0.4s ease both",
    }}>
      {/* Noise overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 0.3,
        pointerEvents: "none",
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
      }} />

      {/* Caption */}
      <div style={{
        position: "absolute",
        bottom: "35%",
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: capVisible ? 1 : 0,
        transform: capVisible ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.3s ease",
      }}>
        <span style={{
          display: "inline-block",
          padding: "8px 20px",
          borderRadius: 100,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: 0.3,
        }}>
          {CAPTIONS[capIdx]}
        </span>
      </div>

      {/* Emotional line */}
      <div style={{
        position: "absolute",
        top: 60,
        left: 24,
        right: 24,
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
        }}>
          You didn't create this. You found it.
        </p>
      </div>

      {/* Bottom controls */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "24px 24px 48px",
        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
      }}>
        {/* Progress bar */}
        <div style={{
          height: 3,
          background: "rgba(255,255,255,0.2)",
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 16,
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--red)",
            borderRadius: 2,
            transition: "width 0.1s linear",
          }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            {Math.round(progress * 0.14)}s / 14s
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Your Moments</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 8: Monetization ───────────────────────────────────────────────────
function MonetizationScreen({ onNext, onSubscribe }) {
  return (
    <Screen style={{ justifyContent: "center", gap: 0, paddingTop: 60 }}>
      <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeUp 0.5s ease 0.1s both" }}>
        {/* Reel thumb preview */}
        <div style={{
          width: 140,
          height: 240,
          borderRadius: 20,
          background: "linear-gradient(135deg,#1a0a00,#3d1500,#7a2800)",
          margin: "0 auto 24px",
          position: "relative",
          border: "2px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
          }} />
          <div style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
          }}>
            14s · Your Moments
          </div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 8 }}>
          Your reel is ready
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
          This moment was always yours.<br/>Now you can keep it.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.5s ease 0.3s both" }}>
        <Btn onClick={onNext}>
          Export Reel — ₹99
        </Btn>
        <Btn variant="secondary" onClick={onSubscribe}>
          Get Unlimited Access
        </Btn>
      </div>
    </Screen>
  );
}

// ─── SCREEN 9: Subscription ───────────────────────────────────────────────────
const PLANS = [
  { price: "₹699", period: "/month", label: "Starter", perks: ["3 reels per day", "HD export", "Basic privacy scan"], recommended: false },
  { price: "₹999", period: "/month", label: "Plus", perks: ["5 reels per day", "4K export", "Advanced privacy scan", "Priority processing"], recommended: true },
  { price: "₹3000", period: "/year", label: "Annual", perks: ["5 reels per day", "4K export", "Privacy shield feature", "Early access to new features"], recommended: false },
];

function SubscriptionScreen({ onNext }) {
  const [sel, setSel] = useState(1);
  return (
    <Screen style={{ paddingTop: 60, gap: 0 }}>
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 8 }}>
          Unlimited Stories
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 14 }}>
          Every video you own is another story waiting.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {PLANS.map((p, i) => (
          <div
            key={i}
            onClick={() => setSel(i)}
            style={{
              padding: "18px 18px",
              borderRadius: 16,
              border: `1.5px solid ${sel === i ? "var(--red)" : "var(--border)"}`,
              background: sel === i ? "var(--red-dim)" : "var(--card-bg)",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s",
              animation: `cardSlideIn 0.5s ease ${0.1 + i * 0.1}s both`,
            }}
          >
            {p.recommended && (
              <div style={{
                position: "absolute",
                top: -10,
                right: 14,
                background: "var(--red)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 100,
                letterSpacing: 0.5,
              }}>
                RECOMMENDED
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 2 }}>{p.label}</p>
                <p style={{ fontSize: 26, fontWeight: 700 }}>
                  {p.price}
                  <span style={{ fontSize: 14, fontWeight: 400, color: "var(--grey)" }}>{p.period}</span>
                </p>
              </div>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: `2px solid ${sel === i ? "var(--red)" : "var(--grey)"}`,
                background: sel === i ? "var(--red)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
              }}>
                {sel === i && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            {p.perks.map((pk, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: sel === i ? "var(--red)" : "var(--grey)" }} />
                <span style={{ fontSize: 13, color: sel === i ? "rgba(255,255,255,0.85)" : "var(--grey)" }}>{pk}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ animation: "fadeUp 0.5s ease 0.4s both" }}>
        <Btn onClick={onNext}>Start {PLANS[sel].label} Plan</Btn>
        <p style={{ color: "var(--grey)", fontSize: 12, textAlign: "center", marginTop: 12 }}>
          Cancel anytime · No hidden fees
        </p>
      </div>
    </Screen>
  );
}

// ─── SCREEN 10: Export ────────────────────────────────────────────────────────
function ExportScreen({ onRestart }) {
  const [shared, setShared] = useState(null);
  return (
    <Screen style={{ justifyContent: "center", textAlign: "center", gap: 0 }}>
      <div style={{ animation: "scaleIn 0.5s ease both", marginBottom: 40 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--red), #ff6b6b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, marginBottom: 10 }}>
          Your reel is ready
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 14, fontFamily: "'Playfair Display', serif", fontStyle: "italic", lineHeight: 1.7 }}>
          Real moments. Ready to be shared.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.5s ease 0.3s both" }}>
        <button
          onClick={() => setShared("ig")}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg, #f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
          </svg>
          {shared === "ig" ? "Shared to Instagram ✓" : "Share to Instagram"}
        </button>

        <button
          onClick={() => setShared("dl")}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 14,
            border: "1.5px solid var(--border)",
            background: "var(--card-bg)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="7 10 12 15 17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {shared === "dl" ? "Downloaded ✓" : "Download Reel"}
        </button>
      </div>

      <div style={{ marginTop: 32, animation: "fadeUp 0.5s ease 0.5s both" }}>
        <button
          onClick={onRestart}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--grey)",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Create another reel
        </button>
      </div>
    </Screen>
  );
}

// ─── PRIVACY TAB ─────────────────────────────────────────────────────────────
const PRIVACY_MOMENTS = [
  { time: "01:12", label: "Clear exposure — public background visible" },
  { time: "03:47", label: "Location data embedded in frame" },
  { time: "06:21", label: "Possible third-party recognition risk" },
];

function PrivacyTab() {
  const [step, setStep] = useState(0); // 0=upload, 1=scanning, 2=results, 3=email
  const [progress, setProgress] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (step !== 1) return;
    let p = 0;
    const id = setInterval(() => {
      p += 1.5;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setStep(2), 600); }
      setProgress(p);
    }, 50);
    return () => clearInterval(id);
  }, [step]);

  const emailDraft = `Subject: Removal Request — Personal Footage

To Whom It May Concern,

I am writing to formally request the removal of footage in which I appear, recorded without my explicit consent.

Timestamps of concern:
- 01:12 — Background exposure
- 03:47 — Location data visible
- 06:21 — Identification risk

Please confirm removal within 30 days as required by applicable privacy laws.

Best regards,
[Your Name]`;

  if (step === 0) return (
    <Screen style={{ paddingTop: 60, gap: 0 }}>
      <div style={{ marginBottom: 32, animation: "fadeUp 0.5s ease both" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 100,
          background: "rgba(255,43,43,0.12)",
          border: "1px solid rgba(255,43,43,0.3)",
          marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", animation: "pulse 1.5s infinite" }} />
          <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>PRIVACY CHECK</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 8 }}>
          Where do<br/>
          <span style={{ color: "var(--red)" }}>you appear?</span>
        </h1>
        <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.6 }}>
          You should always know where you appear.
        </p>
      </div>

      <div
        onClick={() => setStep(1)}
        style={{
          border: "2px dashed var(--border)",
          borderRadius: 20,
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: "var(--card-bg)",
          animation: "fadeUp 0.5s ease 0.2s both",
          marginBottom: 24,
        }}
      >
        <div style={{
          width: 60,
          height: 60,
          borderRadius: 18,
          background: "rgba(255,43,43,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Upload Video for Scan</p>
        <p style={{ color: "var(--grey)", fontSize: 13 }}>We'll find every moment you appear</p>
      </div>

      <div style={{
        padding: "16px",
        borderRadius: 14,
        background: "rgba(255,43,43,0.06)",
        border: "1px solid rgba(255,43,43,0.15)",
        animation: "fadeUp 0.5s ease 0.3s both",
      }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          🔒 Your footage is processed locally. We never store your video. No auto-send, no guarantees. You remain in control at all times.
        </p>
      </div>
    </Screen>
  );

  if (step === 1) return (
    <Screen style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div style={{ position: "relative", marginBottom: 32 }}>
        <svg width="160" height="160" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
          <circle
            cx="55" cy="55" r="45"
            fill="none"
            stroke="var(--red)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dashoffset 0.1s" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column",
        }}>
          <span style={{ fontSize: 26, fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Scanning for your presence…</h2>
      <p style={{ color: "var(--grey)", fontSize: 14 }}>Privacy-first · Nothing stored</p>
    </Screen>
  );

  if (step === 2) return (
    <Screen style={{ paddingTop: 60 }}>
      <div style={{ marginBottom: 24, animation: "fadeUp 0.5s ease both" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 100,
          background: "rgba(255,43,43,0.12)",
          border: "1px solid rgba(255,43,43,0.3)",
          marginBottom: 14,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--red)">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2"/>
          </svg>
          <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 600 }}>POSSIBLE PRIVACY EXPOSURE</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>3 moments flagged</h1>
        <p style={{ color: "var(--grey)", fontSize: 14 }}>Review each one below</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {PRIVACY_MOMENTS.map((m, i) => (
          <div key={i} style={{
            padding: "16px",
            borderRadius: 14,
            background: "rgba(255,43,43,0.06)",
            border: "1px solid rgba(255,43,43,0.2)",
            animation: `cardSlideIn 0.5s ease ${0.1 + i * 0.1}s both`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 700 }}>{m.time}</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{m.label}</p>
          </div>
        ))}
      </div>

      <Btn onClick={() => setStep(3)}>Generate Removal Email</Btn>
    </Screen>
  );

  if (step === 3) return (
    <Screen style={{ paddingTop: 60 }}>
      <div style={{ marginBottom: 20, animation: "fadeUp 0.5s ease both" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Removal Email</h1>
        <p style={{ color: "var(--grey)", fontSize: 14 }}>Review before sending. Nothing is sent automatically.</p>
      </div>

      <div style={{
        padding: "20px",
        borderRadius: 16,
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        marginBottom: 20,
        animation: "fadeUp 0.5s ease 0.2s both",
        fontFamily: "monospace",
        fontSize: 12,
        lineHeight: 1.8,
        color: "rgba(255,255,255,0.75)",
        whiteSpace: "pre-wrap",
        maxHeight: 280,
        overflowY: "auto",
      }}>
        {emailDraft}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.5s ease 0.3s both" }}>
        <Btn onClick={() => setEmailSent(true)} s={{ background: emailSent ? "#1a1a1a" : "var(--red)" }}>
          {emailSent ? "✓ Sent with your consent" : "Send (with my explicit consent)"}
        </Btn>
        <Btn variant="secondary" onClick={() => setStep(0)}>Start New Scan</Btn>
      </div>

      {!emailSent && (
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          No guarantees are made regarding removal. You remain fully in control.
        </p>
      )}
    </Screen>
  );
}

// ─── NAV BAR ─────────────────────────────────────────────────────────────────
function NavBar({ tab, onTab }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 64,
      background: "rgba(0,0,0,0.95)",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      backdropFilter: "blur(12px)",
      zIndex: 100,
    }}>
      {[
        { id: "main", label: "Discover", icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )},
        { id: "privacy", label: "Privacy", icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )},
      ].map(t => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          style={{
            flex: 1,
            height: "100%",
            background: "transparent",
            border: "none",
            color: tab === t.id ? "var(--red)" : "var(--grey)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 0.5,
            transition: "color 0.2s",
          }}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const MAIN_SCREENS = [
  "login", "upload", "ownership", "scanning",
  "moments", "story", "reel", "monetize", "subscription", "export",
];

export default function App() {
  const [tab, setTab] = useState("main");
  const [screenIdx, setScreenIdx] = useState(0);
  const showNav = screenIdx > 0 && screenIdx !== 6; // hide nav on reel

  const next = () => setScreenIdx(i => Math.min(i + 1, MAIN_SCREENS.length - 1));
  const restart = () => setScreenIdx(0);

  const screen = MAIN_SCREENS[screenIdx];

  const handleTabChange = (t) => {
    setTab(t);
    if (t === "main" && screenIdx === 0) setScreenIdx(1); // go past login if logged in
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#000",
      position: "relative",
      overflow: "hidden",
      maxWidth: 430,
      margin: "0 auto",
    }}>
      {/* Main flow */}
      {tab === "main" && (
        <>
          {screen === "login" && <LoginScreen onNext={next} />}
          {screen === "upload" && <UploadScreen onNext={next} />}
          {screen === "ownership" && <OwnershipScreen onNext={next} />}
          {screen === "scanning" && <ScanningScreen onNext={next} />}
          {screen === "moments" && <MomentsScreen onNext={next} />}
          {screen === "story" && <StoryScreen onNext={next} />}
          {screen === "reel" && <ReelScreen onNext={next} />}
          {screen === "monetize" && <MonetizationScreen onNext={next} onSubscribe={() => setScreenIdx(8)} />}
          {screen === "subscription" && <SubscriptionScreen onNext={next} />}
          {screen === "export" && <ExportScreen onRestart={restart} />}
        </>
      )}

      {/* Privacy tab */}
      {tab === "privacy" && <PrivacyTab />}

      {/* Nav */}
      {showNav && screenIdx !== 6 && (
        <NavBar tab={tab} onTab={t => { setTab(t); }} />
      )}

      {/* Status dots — dev navigation helper */}
      {screenIdx > 0 && screenIdx < 6 && tab === "main" && (
        <div style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
          zIndex: 200,
        }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: i === screenIdx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === screenIdx ? "var(--red)" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}