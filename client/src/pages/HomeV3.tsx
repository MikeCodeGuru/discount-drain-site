/*
 * DESIGN SYSTEM: Dia Browser — "Prism on White Stationery"
 * =========================================================
 * Theme: light / #F8F8F8 canvas
 * Font: DM Sans weight 300 (display), 400 (body), 500 (labels/buttons)
 *       — substitute for ABC Oracle, closest freely available match
 * Colors:
 *   Ink Black  #000000  — headings, nav, borders
 *   Snow       #ffffff  — card surfaces at 90% opacity
 *   Canvas     #f8f8f8  — page background
 *   Fog        #efefef  — sticky header
 *   Pebble     #d9d9d9  — filled button bg
 *   Graphite   #636363  — body text
 *   Slate      #959595  — tertiary / meta
 *   Steel      #aeaeae  — disabled / dots
 *   Spectrum   linear-gradient(90deg, #c679c4 0%, #fa3d1d 25%, #ffb005 50%, #e1e1fe 75%, #0358f7 100%)
 *              — ambient glow ONLY, never as text or button fill
 * Radii: cards 30px, images 10px, buttons 30px, navItems 16px, containers 40px, pill 9999px
 * Shadow: rgba(0,0,0,0.08) 0px 0px 8px 0px — the ONLY shadow in the system
 * Max-width: 1200px
 * MOBILE: fully responsive via useIsMobile hook
 */

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  Menu,
  X,
  Camera,
  Wrench,
  Droplets,
  Building2,
  Truck,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";

// ── Image URLs ──────────────────────────────────────────────────────────────
const V3_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v3-hero-mockup-gghXVLX5m4Aq2U8BM6WBfc.webp";
const V3_TRENCHLESS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v3-trenchless-clean-Wb27HVneB7XkaWmWjcu2BW.webp";
const V3_TEAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v3-team-editorial-2fGV5LLyDvP5j5ZEzuVsLz.webp";
const V3_PIPE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v3-pipe-abstract-ekKaepsx9cDwpFVosmZPdZ.webp";

// ── Design tokens ────────────────────────────────────────────────────────────
const T = {
  inkBlack: "#000000",
  snow: "#ffffff",
  canvas: "#f8f8f8",
  fog: "#efefef",
  pebble: "#d9d9d9",
  graphite: "#636363",
  slate: "#959595",
  steel: "#aeaeae",
  spectrum: "linear-gradient(90deg, #c679c4 0%, #fa3d1d 25%, #ffb005 50%, #e1e1fe 75%, #0358f7 100%)",
  shadow: "rgba(0,0,0,0.08) 0px 0px 8px 0px",
  card: "rgba(255,255,255,0.9)",
  // radii
  rCard: "30px",
  rImage: "10px",
  rButton: "30px",
  rNav: "16px",
  rContainer: "40px",
  rPill: "9999px",
};

// ── Frosted Card ─────────────────────────────────────────────────────────────
function FrostedCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: T.card,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderRadius: T.rCard,
      padding: "32px",
      boxShadow: T.shadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Neutral Filled Button ────────────────────────────────────────────────────
function FilledButton({ children, href, style = {} }: { children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: hovered ? T.inkBlack : T.pebble,
    color: hovered ? T.snow : "rgba(0,0,0,0.85)",
    borderRadius: T.rButton,
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
    ...style,
  };
  return (
    <a href={href || "#"} style={base}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ── Ghost Pill Button ────────────────────────────────────────────────────────
function GhostButton({ children, href, style = {} }: { children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href || "#"} style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: hovered ? "rgba(0,0,0,0.05)" : "transparent",
      color: "rgba(0,0,0,0.85)",
      borderRadius: T.rPill,
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: 400,
      textDecoration: "none",
      transition: "background-color 0.2s ease",
      ...style,
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ── Inline Text Link ─────────────────────────────────────────────────────────
function InlineLink({ children, href }: { children: React.ReactNode; href?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href || "#"} style={{
      color: T.inkBlack,
      textDecoration: "underline",
      textDecorationColor: hovered ? T.inkBlack : T.steel,
      transition: "text-decoration-color 0.2s ease",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ── Counter ──────────────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1400, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Fade-in on scroll ────────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

// ── Service data ─────────────────────────────────────────────────────────────
const residentialServices = [
  { icon: Camera, title: "Free Sewer Video Camera Inspections", desc: "See your sewer line live, on the spot. A $400 value included with every service call." },
  { icon: Wrench, title: "No Dig Trenchless Systems", desc: "Replace underground pipe without disturbing driveways or landscaping. Done in a day." },
  { icon: Droplets, title: "Wet Basement Repair", desc: "Permanent wet basement fixes backed by a 20-year warranty. 24-hour emergency dispatch." },
  { icon: Wrench, title: "Sewer Repair and Installation", desc: "Certified technicians solving sewer and drain problems quickly and professionally." },
  { icon: Droplets, title: "Drain Cleaning and Power Flushing", desc: "Latest technology keeps your drains flowing simply and affordably." },
  { icon: Truck, title: "Dump Trucks and Machine Excavating", desc: "Full fleet for deep excavations, parking lot prep, and pool installations." },
];

const commercialServices = [
  { icon: Camera, title: "Sewer Video Camera Inspections", desc: "Commercial-grade video inspection to diagnose sewer and drain problems fast." },
  { icon: Building2, title: "Municipal Services", desc: "Sewer lining, manhole restoration, and water main repair for municipalities." },
  { icon: Wrench, title: "No Dig Trenchless Systems", desc: "Minimal disruption to business operations. Replace pipe without surface damage." },
  { icon: Droplets, title: "Catch Basin Cleaning", desc: "Quick and professional catch basin solutions using the latest technology." },
  { icon: Wrench, title: "Sewer Repair and Installation", desc: "Highly trained technicians using the latest products for commercial sewer systems." },
  { icon: Shield, title: "Septic Service", desc: "Preventative maintenance, full repairs, and replacements on septic beds and sewers." },
];

const testimonials = [
  { name: "Sarah M.", role: "Homeowner, London ON", stars: 5, text: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong. Professional, honest, and the price was fair." },
  { name: "James T.", role: "Property Owner, Strathroy ON", stars: 5, text: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands. The job was done in one day." },
  { name: "Linda K.", role: "Homeowner, St. Thomas ON", stars: 5, text: "Had a wet basement for years. Discount Drain fixed it permanently with a 20-year warranty. Family-owned business that truly cares about their customers." },
  { name: "Mike R.", role: "Business Owner, London ON", stars: 5, text: "Their commercial team handled our catch basin and sewer line issues efficiently. Minimal disruption to our business. Highly recommend for any commercial property." },
  { name: "Carol B.", role: "Homeowner, Woodstock ON", stars: 5, text: "Barry and his team were incredibly professional. The free camera inspection saved us from a much bigger repair. Transparent pricing and excellent workmanship." },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function HomeV3() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const isMobile = useIsMobile();

  const heroRef = useFadeIn(0);
  const statsRef = useFadeIn(0);
  const servicesRef = useFadeIn(0);
  const featureRef = useFadeIn(0);
  const aboutRef = useFadeIn(0);
  const testimonialsRef = useFadeIn(0);
  const privacyRef = useFadeIn(0);

  const px = isMobile ? "20px" : "24px";

  return (
    <div style={{ backgroundColor: T.canvas, fontFamily: "'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ─── SPECTRUM STRIP (decorative top accent) ─── */}
      <div style={{ height: "3px", background: T.spectrum, width: "100%" }} />

      {/* ─── STICKY HEADER ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: T.fog,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        height: "52px",
        display: "flex", alignItems: "center",
        borderBottom: `1px solid rgba(0,0,0,0.06)`,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}`, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", background: T.spectrum, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Droplets size={14} style={{ color: T.snow }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack, letterSpacing: "-0.2px" }}>Discount Drain</span>
          </a>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {["Services", "Residential", "Commercial", "About", "Contact"].map((item) => (
                <GhostButton key={item} href={`#${item.toLowerCase()}`} style={{ borderRadius: T.rNav, fontSize: "14px" }}>
                  {item}
                </GhostButton>
              ))}
            </nav>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!isMobile && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: T.rNav, padding: "6px 16px", fontSize: "13px", color: "rgba(0,0,0,0.7)", whiteSpace: "nowrap" }}>
                24/7 Emergency: 519-451-8342
              </div>
            )}
            <FilledButton href="tel:5194518342" style={{ padding: isMobile ? "8px 14px" : "8px 18px", fontSize: "13px" }}>
              {isMobile ? <Phone size={14} /> : null}
              {isMobile ? "Call" : "Call Now"}
            </FilledButton>
            {isMobile && (
              <button style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: T.inkBlack }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: T.fog, borderBottom: `1px solid rgba(0,0,0,0.06)`, padding: `12px ${px}` }}>
          {["Services", "Residential", "Commercial", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ display: "block", padding: "10px 0", fontSize: "15px", fontWeight: 400, color: T.inkBlack, textDecoration: "none", borderBottom: `1px solid rgba(0,0,0,0.06)` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="services" style={{ padding: isMobile ? "80px 0 60px" : "120px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* Ambient spectrum glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "600px" : "900px", height: "400px",
          background: T.spectrum,
          opacity: 0.08,
          filter: "blur(80px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />

        <div ref={heroRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}`, position: "relative", textAlign: "center" }}>
          {/* Announcement pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: T.rNav, padding: "6px 20px", marginBottom: "32px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.spectrum }} />
            <span style={{ fontSize: "13px", fontWeight: 400, color: T.graphite }}>Free camera inspection with every service call - a $400 value</span>
          </div>

          {/* Display headline - weight 300, -2.88px tracking */}
          <h1 style={{
            fontSize: isMobile ? "48px" : "72px",
            fontWeight: 300,
            color: T.inkBlack,
            lineHeight: 1.11,
            letterSpacing: isMobile ? "-1.92px" : "-2.88px",
            marginBottom: "20px",
            maxWidth: "800px",
            margin: "0 auto 20px",
          }}>
            Drain problems,<br />solved properly.
          </h1>

          {/* Subheading */}
          <p style={{ fontSize: "18px", fontWeight: 400, color: T.graphite, lineHeight: 1.55, maxWidth: "480px", margin: "0 auto 36px" }}>
            Family-owned since 1970. London's most trusted drain and sewer specialists, residential and commercial.
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
            <FilledButton href="tel:5194518342" style={{ padding: "12px 28px", fontSize: "15px" }}>
              <Phone size={15} /> Call 519-451-8342
            </FilledButton>
            <GhostButton href="#about" style={{ padding: "12px 20px", fontSize: "15px", borderRadius: T.rButton }}>
              About us <ArrowRight size={14} />
            </GhostButton>
          </div>

          {/* Hero image with ambient glow */}
          <div style={{ position: "relative", display: "inline-block", width: "100%", maxWidth: "800px" }}>
            {/* Gradient glow behind image */}
            <div style={{
              position: "absolute", inset: "-20px",
              background: T.spectrum,
              opacity: 0.15,
              filter: "blur(40px)",
              borderRadius: T.rContainer,
              zIndex: 0,
            }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: T.rImage, overflow: "hidden", boxShadow: T.shadow }}>
              <img src={V3_HERO} alt="Professional drain inspection camera" style={{ width: "100%", display: "block", borderRadius: T.rImage }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ padding: "48px 0", borderTop: `1px solid rgba(0,0,0,0.06)`, borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
        <div ref={statsRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}` }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "32px" : "0", textAlign: "center" }}>
            {[
              { value: 55, suffix: "+", label: "Years in business" },
              { value: 20, suffix: "+", label: "Skilled technicians" },
              { value: 20, suffix: "-year", label: "Basement warranty" },
              { value: 24, suffix: "/7", label: "Emergency dispatch" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ padding: isMobile ? "0" : "0 32px", borderRight: (!isMobile && i < 3) ? `1px solid rgba(0,0,0,0.08)` : "none" }}>
                <div style={{ fontSize: isMobile ? "40px" : "50px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.18, letterSpacing: "-2px", marginBottom: "4px" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: "14px", fontWeight: 400, color: T.slate }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="residential" style={{ padding: isMobile ? "80px 0" : "120px 0" }}>
        <div ref={servicesRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}` }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: T.slate, marginBottom: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>What we do</p>
            <h2 style={{ fontSize: isMobile ? "40px" : "54px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.17, letterSpacing: "-2.16px", marginBottom: "14px" }}>
              Every drain problem,<br />solved.
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400, color: T.graphite, maxWidth: "440px", margin: "0 auto", lineHeight: 1.5 }}>
              From free camera inspections to trenchless repairs, the expertise and equipment to solve any drain or sewer problem.
            </p>
          </div>

          {/* Tab toggle - ghost pill buttons */}
          <div id="commercial" style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "40px" }}>
            {(["residential", "commercial"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: T.rPill,
                  border: "none",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? 500 : 400,
                  cursor: "pointer",
                  backgroundColor: activeTab === tab ? T.inkBlack : "transparent",
                  color: activeTab === tab ? T.snow : T.graphite,
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Service cards - frosted glass */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
            {(activeTab === "residential" ? residentialServices : commercialServices).map((service) => (
              <FrostedCard key={service.title} style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
              >
                <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
                  <service.icon size={18} style={{ color: T.inkBlack }} />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, color: T.inkBlack, marginBottom: "8px", lineHeight: 1.35, letterSpacing: "-0.2px" }}>{service.title}</h3>
                <p style={{ fontSize: "14px", fontWeight: 400, color: T.graphite, lineHeight: 1.5, marginBottom: "16px" }}>{service.desc}</p>
                <a href="tel:5194518342" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 500, color: T.inkBlack, textDecoration: "underline", textDecorationColor: T.steel, transition: "text-decoration-color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = T.inkBlack)}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = T.steel)}
                >
                  Book this service <ArrowRight size={12} />
                </a>
              </FrostedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED: TRENCHLESS (screenshot showcase style) ─── */}
      <section style={{ padding: isMobile ? "80px 0" : "120px 0", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow behind image */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "500px",
          background: T.spectrum,
          opacity: 0.1,
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        <div ref={featureRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}`, position: "relative" }}>
          {/* Centered heading */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: T.slate, marginBottom: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Signature technology</p>
            <h2 style={{ fontSize: isMobile ? "40px" : "54px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.17, letterSpacing: "-2.16px", marginBottom: "14px" }}>
              No dig. No mess.<br />No problem.
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400, color: T.graphite, maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.5 }}>
              Our trenchless CIPP technology replaces underground pipe without disturbing driveways or landscaping. Most jobs completed in a single day.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
              {["No excavation required", "Completed in one day", "Residential and commercial", "20-year warranty"].map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={13} style={{ color: T.inkBlack }} />
                  <span style={{ fontSize: "13px", fontWeight: 400, color: T.graphite }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width image with gradient glow */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: "-30px",
              background: T.spectrum,
              opacity: 0.12,
              filter: "blur(50px)",
              borderRadius: T.rContainer,
              zIndex: 0,
            }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: T.rImage, overflow: "hidden", boxShadow: T.shadow }}>
              <img src={V3_TRENCHLESS} alt="Trenchless pipe repair, no excavation" style={{ width: "100%", display: "block", borderRadius: T.rImage, maxHeight: "500px", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: isMobile ? "80px 0" : "120px 0" }}>
        <div ref={aboutRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}` }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "center" }}>
            {/* Content */}
            <div>
              <p style={{ fontSize: "14px", fontWeight: 400, color: T.slate, marginBottom: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Family-owned since 1970</p>
              <h2 style={{ fontSize: isMobile ? "40px" : "50px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.18, letterSpacing: "-2px", marginBottom: "20px" }}>
                London's drain specialists.
              </h2>
              <p style={{ fontSize: "16px", fontWeight: 400, color: T.graphite, lineHeight: 1.5, marginBottom: "14px" }}>
                We are family owned and operated since 1970 when Herman Marche set out to assist London residents and business owners with their sewer, drainage, and plumbing problems. In 1991, his son Barry took over ownership.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: T.graphite, lineHeight: 1.5, marginBottom: "32px" }}>
                With over 20 employees, our professional team is friendly, highly trained in safety and certified in industry-specific instruction. We are WSIB compliant and fully insured.{" "}
                <InlineLink href="#contact">Learn more about our team.</InlineLink>
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
                {[
                  { icon: Shield, label: "WSIB Compliant" },
                  { icon: CheckCircle2, label: "Fully Insured" },
                  { icon: Star, label: "BBB Accredited" },
                  { icon: Clock, label: "24/7 Emergency" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "16px", backgroundColor: "rgba(0,0,0,0.03)" }}>
                    <Icon size={14} style={{ color: T.inkBlack }} />
                    <span style={{ fontSize: "13px", fontWeight: 400, color: T.graphite }}>{label}</span>
                  </div>
                ))}
              </div>

              <FilledButton href="#contact" style={{ padding: "12px 24px", fontSize: "14px" }}>
                Meet our team <ArrowRight size={14} />
              </FilledButton>
            </div>

            {/* Images */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ gridColumn: "span 2", borderRadius: T.rImage, overflow: "hidden", aspectRatio: "16/7" }}>
                <img src={V3_TEAM} alt="Discount Drain team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: T.rImage, overflow: "hidden", aspectRatio: "1" }}>
                <img src={V3_PIPE} alt="Pipe inspection" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <FrostedCard style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px", aspectRatio: "1", boxSizing: "border-box" }}>
                <div style={{ fontSize: "40px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.18, letterSpacing: "-2px" }}>20+</div>
                <div style={{ fontSize: "13px", fontWeight: 400, color: T.graphite, marginTop: "6px", lineHeight: 1.4 }}>Skilled technicians on our team</div>
              </FrostedCard>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (horizontal scroll carousel) ─── */}
      <section style={{ padding: isMobile ? "80px 0" : "120px 0", borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div ref={testimonialsRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}` }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: T.slate, marginBottom: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Customer stories</p>
            <h2 style={{ fontSize: isMobile ? "36px" : "50px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.18, letterSpacing: "-2px" }}>
              What our customers say.
            </h2>
          </div>

          {/* Scrollable carousel */}
          <div style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "16px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            {testimonials.map((t) => (
              <FrostedCard key={t.name} style={{ minWidth: isMobile ? "280px" : "320px", flexShrink: 0 }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={12} fill={T.inkBlack} style={{ color: T.inkBlack }} />
                  ))}
                </div>
                <p style={{ fontSize: "14px", fontWeight: 400, color: T.inkBlack, lineHeight: 1.5, marginBottom: "20px" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "15px", fontWeight: 500, color: T.inkBlack }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack }}>{t.name}</div>
                    <div style={{ fontSize: "14px", fontWeight: 400, color: T.slate }}>{t.role}</div>
                  </div>
                </div>
              </FrostedCard>
            ))}
          </div>

          {/* Carousel dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
            {testimonials.map((_, i) => (
              <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: i === 0 ? T.inkBlack : T.steel, transition: "background-color 0.2s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRIVACY / TRUST SECTION ─── */}
      <section id="contact" style={{ padding: isMobile ? "80px 0" : "120px 0", position: "relative", overflow: "hidden" }}>
        {/* Subtle spectrum glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: T.spectrum,
          opacity: 0.07,
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />
        <div ref={privacyRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}`, textAlign: "center", position: "relative" }}>
          <Lock size={24} style={{ color: T.inkBlack, marginBottom: "24px" }} />
          <h2 style={{ fontSize: isMobile ? "36px" : "54px", fontWeight: 300, color: T.inkBlack, lineHeight: 1.17, letterSpacing: "-2.16px", marginBottom: "16px" }}>
            Ready to solve your<br />drain problem today?
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 400, color: T.graphite, lineHeight: 1.5, maxWidth: "440px", margin: "0 auto 32px" }}>
            Call today and get your free sewer video camera inspection - a $400 value, on us. Available 24/7 for emergencies.{" "}
            <InlineLink href="mailto:office@discountdrain.ca">Email us instead.</InlineLink>
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <FilledButton href="tel:5194518342" style={{ padding: "14px 32px", fontSize: "15px" }}>
              <Phone size={15} /> Call 519-451-8342
            </FilledButton>
            <GhostButton href="mailto:office@discountdrain.ca" style={{ padding: "14px 24px", fontSize: "15px", borderRadius: T.rButton }}>
              <Mail size={15} /> Email us
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid rgba(0,0,0,0.08)`, padding: "56px 0 28px", backgroundColor: T.canvas }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${px}` }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "32px" : "40px", marginBottom: "48px" }}>
            {/* Brand */}
            <div style={{ gridColumn: isMobile ? "span 2" : "span 1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "28px", height: "28px", background: T.spectrum, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Droplets size={14} style={{ color: T.snow }} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack }}>Discount Drain</span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 400, color: T.graphite, lineHeight: 1.5, maxWidth: "220px", marginBottom: "16px" }}>
                Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: "32px", height: "32px", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: T.graphite, transition: "background-color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,0,0,0.1)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,0,0,0.05)")}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack, marginBottom: "14px" }}>Services</h4>
              {["Camera Inspection", "Trenchless Systems", "Sewer Repair", "Wet Basements", "Drain Cleaning", "Excavating"].map((s) => (
                <a key={s} href="#services" style={{ display: "block", fontSize: "14px", fontWeight: 400, color: T.graphite, textDecoration: "none", marginBottom: "8px", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.inkBlack)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.graphite)}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack, marginBottom: "14px" }}>Company</h4>
              {["About Us", "Residential", "Commercial", "Service Areas", "Contact"].map((s) => (
                <a key={s} href="#" style={{ display: "block", fontSize: "14px", fontWeight: 400, color: T.graphite, textDecoration: "none", marginBottom: "8px", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.inkBlack)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.graphite)}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 500, color: T.inkBlack, marginBottom: "14px" }}>Contact</h4>
              {[
                { icon: Phone, text: "519-451-8342", href: "tel:5194518342" },
                { icon: Mail, text: "office@discountdrain.ca", href: "mailto:office@discountdrain.ca" },
                { icon: MapPin, text: "London, Ontario", href: undefined },
                { icon: Clock, text: "24/7 Emergency", href: undefined },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                  <Icon size={13} style={{ color: T.graphite, marginTop: "2px", flexShrink: 0 }} />
                  {href ? (
                    <a href={href} style={{ fontSize: "14px", fontWeight: 400, color: T.graphite, textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = T.inkBlack)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = T.graphite)}
                    >{text}</a>
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: 400, color: T.graphite }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid rgba(0,0,0,0.08)`, paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <p style={{ fontSize: "13px", fontWeight: 400, color: T.slate }}>© 2024 Discount Drain. All rights reserved. Est. 1970.</p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a key={l} href="#" style={{ fontSize: "13px", fontWeight: 400, color: T.slate, textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.inkBlack)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.slate)}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
