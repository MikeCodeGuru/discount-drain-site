/**
 * V5 "Dark Dia" — Blend of V3 (Dia Browser) + V4 (KW Construction)
 *
 * Design Philosophy:
 * - Canvas: Near-black #0d0d0b (V4) with frosted glass surfaces (V3)
 * - Hero: Full-bleed video background (V4) + left-aligned minimal headline (V3 positioning)
 * - Typography: Bebas Neue for display headlines (V4) + DM Sans weight 300 for body (V3)
 * - Accent: Yellow #f5c518 for CTAs only (V4) + spectrum gradient glow as ambient light (V3)
 * - Buttons: Pill-shaped 9999px radius (V3) in yellow fill (V4)
 * - Cards: Frosted glass rgba(255,255,255,0.05) + backdrop-blur (V3) on dark canvas (V4)
 * - Sections: V3's generous whitespace and clean structure on V4's dark canvas
 * - Mobile: Fully responsive via useIsMobile hook
 */

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";

const LOGO_URL = "/manus-storage/discount-drain-logo-transparent_3a90008a.png";
const HERO_VIDEO = "/manus-storage/hero-bg-v4_6eb1cf8f.mp4";

const IMAGES = {
  aboutTeam: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v5-about-team-EXkDH4uWXhebgzAAa8z7gf.webp",
  serviceCamera: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v5-service-camera-C365fb5VHC6CTYi46fJCUN.webp",
  trenchless: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v5-trenchless-A9vHLzeaEFZuZJzgq3ej2p.webp",
  testimonialTruck: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v5-about-team-EXkDH4uWXhebgzAAa8z7gf.webp",
};

const SERVICES = [
  { icon: "🔍", title: "Drain Camera Inspection", desc: "CCTV sewer camera inspections revealing blockages, cracks, and root intrusions with precision." },
  { icon: "💧", title: "Drain Cleaning", desc: "High-pressure hydro jetting and mechanical cleaning for residential and commercial drains." },
  { icon: "🔧", title: "Trenchless Pipe Repair", desc: "Pipe lining and bursting technology — fix pipes without digging up your yard." },
  { icon: "🏠", title: "Residential Services", desc: "Full-service drain and sewer solutions for homeowners across Southwestern Ontario." },
  { icon: "🏢", title: "Commercial Services", desc: "Scheduled maintenance, emergency response, and large-diameter sewer services for businesses." },
  { icon: "🚨", title: "Emergency Service", desc: "24/7 emergency drain and sewer response — we're available when you need us most." },
];

const STATS = [
  { value: "55+", label: "Years in Business" },
  { value: "20+", label: "Expert Technicians" },
  { value: "20yr", label: "Workmanship Warranty" },
  { value: "24/7", label: "Emergency Service" },
];

const TESTIMONIALS = [
  { name: "Sarah M.", location: "London, ON", text: "Discount Drain responded within the hour. Their camera inspection found a root intrusion that two other companies missed. Highly recommend.", stars: 5 },
  { name: "James R.", location: "Strathroy, ON", text: "Professional, fast, and honest. They fixed our backed-up basement drain without tearing up the floor. Incredible trenchless work.", stars: 5 },
  { name: "Linda K.", location: "St. Thomas, ON", text: "Used Discount Drain for a camera inspection before buying our home. They found a cracked pipe that saved us thousands. Worth every penny.", stars: 5 },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f5c518", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function HomeV5() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = ["About", "Services", "Residential", "Commercial", "Contact"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0d0d0b", color: "#e8e8e4", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Spectrum Gradient CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
        .v5-pill-btn {
          border-radius: 9999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .v5-pill-btn:active { transform: scale(0.97); }
        .v5-pill-btn-primary { background: #f5c518; color: #0d0d0b; }
        .v5-pill-btn-primary:hover { background: #ffd740; box-shadow: 0 0 24px rgba(245,197,24,0.4); }
        .v5-pill-btn-ghost { background: rgba(255,255,255,0.08); color: #e8e8e4; border: 1px solid rgba(255,255,255,0.15); }
        .v5-pill-btn-ghost:hover { background: rgba(255,255,255,0.14); }
        .v5-glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        .v5-glass-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,197,24,0.25);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .v5-spectrum-glow {
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,100,150,0.12) 0%, rgba(255,80,80,0.08) 20%, rgba(255,160,50,0.06) 40%, rgba(180,100,255,0.06) 60%, rgba(80,140,255,0.08) 80%, transparent 100%);
          pointer-events: none;
        }
        .v5-nav-link {
          color: rgba(232,232,228,0.75);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.2s ease;
          padding: 4px 0;
          position: relative;
        }
        .v5-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #f5c518;
          transition: width 0.25s ease;
        }
        .v5-nav-link:hover { color: #f5c518; }
        .v5-nav-link:hover::after { width: 100%; }
        .v5-service-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(245,197,24,0.1);
          border: 1px solid rgba(245,197,24,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .v5-glass-card:hover .v5-service-icon {
          background: rgba(245,197,24,0.2);
          border-color: rgba(245,197,24,0.4);
        }
        .v5-stat-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .v5-stat-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,197,24,0.2);
        }
        .v5-ticker {
          display: flex;
          gap: 48px;
          animation: v5-ticker-scroll 28s linear infinite;
          white-space: nowrap;
        }
        @keyframes v5-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .v5-mobile-menu {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .v5-mobile-menu.open { max-height: 400px; opacity: 1; }
        .v5-mobile-menu.closed { max-height: 0; opacity: 0; }
      `}</style>

      {/* Announcement Bar */}
      <div style={{ background: "#f5c518", color: "#0d0d0b", padding: "10px 24px", textAlign: "center", fontSize: 14, fontWeight: 500 }}>
        <strong>Free Sewer Video Camera Inspection</strong> - A $400 value, included with every service call.{" "}
        <a href="#contact" style={{ color: "#0d0d0b", fontWeight: 700, textDecoration: "underline" }}>Call Now &rarr;</a>
      </div>

      {/* Top Utility Bar */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "8px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(232,232,228,0.6)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>📞</span> (519) 659-7867
            </span>
            {!isMobile && (
              <span style={{ fontSize: 13, color: "rgba(232,232,228,0.6)", display: "flex", alignItems: "center", gap: 6 }}>
                <span>✉️</span> info@discountdrain.ca
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#f5c518", fontWeight: 500, letterSpacing: "0.08em" }}>24/7 EMERGENCY SERVICE</span>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(13,13,11,0.92)" : "rgba(13,13,11,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 68 : 80 }}>
          <img src={LOGO_URL} alt="Discount Drain" style={{ height: isMobile ? 68 : 88, width: "auto", objectFit: "contain", maxWidth: isMobile ? 210 : 250 }} />

          {isMobile ? (
            <button onClick={() => setMenuOpen(!menuOpen)} className="v5-pill-btn v5-pill-btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
              {menuOpen ? "✕ Close" : "☰ Menu"}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 52 }}>
              {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="v5-nav-link">{link}</a>
              ))}
              <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
                📞 Call Now
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div className={`v5-mobile-menu ${menuOpen ? "open" : "closed"}`} style={{ background: "rgba(13,13,11,0.97)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="v5-nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, letterSpacing: "0.08em" }}>{link}</a>
              ))}
              <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: "12px 24px", fontSize: 14, marginTop: 8 }}>
                📞 Call Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section — Full-bleed video (V4) + left-aligned minimal headline (V3 positioning) */}
      <section style={{ position: "relative", height: isMobile ? "100svh" : "100vh", minHeight: isMobile ? 600 : 700, overflow: "hidden" }}>
        {/* Video Background */}
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,13,11,0.88) 0%, rgba(13,13,11,0.65) 50%, rgba(13,13,11,0.45) 100%)", zIndex: 1 }} />

        {/* Spectrum glow overlay */}
        <div className="v5-spectrum-glow" style={{ position: "absolute", inset: 0, zIndex: 2 }} />

        {/* Hero Content — far-left, mid-center */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          display: "flex", alignItems: "center",
          padding: isMobile ? "0 24px" : "0 80px",
        }}>
          <div style={{ maxWidth: isMobile ? "100%" : 680 }}>
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.18em", color: "rgba(232,232,228,0.6)", textTransform: "uppercase" }}>Since 1970</span>
              <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #f5c518, transparent)" }} />
            </div>

            {/* Main headline — Bebas Neue (V4) */}
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "clamp(56px, 15vw, 80px)" : "clamp(80px, 10vw, 128px)", lineHeight: 0.92, color: "#ffffff", margin: "0 0 8px 0", letterSpacing: "0.02em" }}>
              DISCOUNT
            </h1>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "clamp(56px, 15vw, 80px)" : "clamp(80px, 10vw, 128px)", lineHeight: 0.92, color: "transparent", WebkitTextStroke: "2px #f5c518", margin: "0 0 28px 0", letterSpacing: "0.02em" }}>
              DRAIN
            </h1>

            {/* Subtitle — DM Sans weight 300 (V3) */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 16 : 20, color: "rgba(232,232,228,0.8)", lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
              Residential and commercial drain and sewer specialists serving London and Southwestern Ontario since 1970.
            </p>

            {/* CTA Buttons — pill-shaped (V3) + yellow (V4) */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: isMobile ? "14px 28px" : "16px 36px", fontSize: isMobile ? 14 : 15 }}>
                Get a Free Quote
              </button>
              <button className="v5-pill-btn v5-pill-btn-ghost" style={{ padding: isMobile ? "14px 28px" : "16px 36px", fontSize: isMobile ? 14 : 15 }}>
                Our Services
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: isMobile ? 16 : 24, marginTop: 40, flexWrap: "wrap" }}>
              {["BBB Accredited", "Licensed & Insured", "Free Camera Inspection"].map(badge => (
                <div key={badge} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5c518" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, color: "rgba(232,232,228,0.65)", letterSpacing: "0.06em" }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watermark logo — bottom-right, semi-transparent */}
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: isMobile ? "12%" : "8%",
            right: isMobile ? 16 : 48,
            width: isMobile ? 140 : 220,
            opacity: 0.30,
            zIndex: 4,
            pointerEvents: "none",
            filter: "none",
            mixBlendMode: "normal",
          }}
        />

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
          <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(245,197,24,0.6))" }} />
          <span style={{ fontSize: 18, color: "rgba(245,197,24,0.6)" }}>↓</span>
        </div>
      </section>

      {/* Stats Strip — frosted glass (V3) on dark (V4) */}
      <section style={{ position: "relative", padding: "64px 0", overflow: "hidden" }}>
        <div className="v5-spectrum-glow" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16 }}>
              {STATS.map((stat, i) => (
                <RevealSection key={stat.label} delay={i * 80}>
                  <div className="v5-stat-card">
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 48 : 60, color: "#f5c518", lineHeight: 1, marginBottom: 8 }}>{stat.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{stat.label}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: isMobile ? "64px 0" : "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <RevealSection>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1, background: "#f5c518" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", color: "#f5c518", textTransform: "uppercase" }}>What We Do</span>
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 42 : 64, color: "#ffffff", margin: 0, letterSpacing: "0.02em", lineHeight: 1 }}>
                OUR SERVICES
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(232,232,228,0.6)", marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
                From routine drain cleaning to complex trenchless sewer rehabilitation, we handle it all.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {SERVICES.map((service, i) => (
              <RevealSection key={service.title} delay={i * 80}>
                <div className="v5-glass-card" style={{ padding: 28 }}>
                  <div className="v5-service-icon">{service.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#ffffff", margin: "0 0 12px 0", letterSpacing: "0.04em" }}>{service.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,232,228,0.6)", lineHeight: 1.7, margin: 0 }}>{service.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", overflow: "hidden", background: "rgba(245,197,24,0.04)" }}>
        <div className="v5-ticker">
          {[...Array(2)].map((_, rep) =>
            ["Drain Cleaning", "Sewer Camera Inspection", "Hydro Jetting", "Trenchless Pipe Repair", "Residential Services", "Commercial Services", "Emergency Service", "Wet Basement Solutions"].map(item => (
              <span key={`${rep}-${item}`} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.12em", color: "rgba(232,232,228,0.4)", display: "flex", alignItems: "center", gap: 48 }}>
                {item} <span style={{ color: "#f5c518", fontSize: 10 }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* About Section */}
      <section id="about" style={{ padding: isMobile ? "64px 0" : "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            {/* Image */}
            <RevealSection>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
                  <img src={IMAGES.aboutTeam} alt="Discount Drain team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Frosted glass badge overlay */}
                <div className="v5-glass-card" style={{ position: "absolute", bottom: -20, right: -20, padding: "20px 24px", borderRadius: 16 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#f5c518", lineHeight: 1 }}>55+</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,232,228,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Years of Service</div>
                </div>
              </div>
            </RevealSection>

            {/* Text */}
            <RevealSection delay={150}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 1, background: "#f5c518" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", color: "#f5c518", textTransform: "uppercase" }}>Our Story</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 42 : 56, color: "#ffffff", margin: "0 0 24px 0", letterSpacing: "0.02em", lineHeight: 1 }}>
                  TRUSTED SINCE 1970
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,232,228,0.65)", lineHeight: 1.8, marginBottom: 20, maxWidth: "58ch" }}>
                  Discount Drain has been London's most trusted drain and sewer specialist for over 55 years. What started as a small family operation has grown into a team of 20+ certified technicians serving residential and commercial clients across Southwestern Ontario.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,232,228,0.65)", lineHeight: 1.8, marginBottom: 32, maxWidth: "58ch" }}>
                  We combine decades of hands-on experience with the latest trenchless technology to solve drain and sewer problems efficiently, affordably, and with minimal disruption to your property.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                  {["BBB Accredited Business", "Licensed & Insured", "20-Year Workmanship Warranty", "Free Camera Inspection"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#f5c518", fontSize: 14, marginTop: 2 }}>✓</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.65)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: "14px 32px", fontSize: 14 }}>
                  Learn More About Us
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Trenchless Feature Section */}
      <section style={{ position: "relative", padding: isMobile ? "64px 0" : "96px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="v5-spectrum-glow" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <RevealSection>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 1, background: "#f5c518" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", color: "#f5c518", textTransform: "uppercase" }}>Advanced Technology</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 42 : 56, color: "#ffffff", margin: "0 0 24px 0", letterSpacing: "0.02em", lineHeight: 1 }}>
                  TRENCHLESS PIPE REPAIR
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,232,228,0.65)", lineHeight: 1.8, marginBottom: 32, maxWidth: "58ch" }}>
                  Our trenchless pipe lining and pipe bursting technology lets us repair or replace damaged sewer lines without excavating your lawn, driveway, or landscaping. Faster, cleaner, and more cost-effective than traditional methods.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                  {["No digging required", "Completed in hours, not days", "Suitable for all pipe materials", "20-year workmanship warranty"].map(item => (
                    <div key={item} className="v5-glass-card" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderRadius: 12 }}>
                      <span style={{ color: "#f5c518", fontSize: 16 }}>→</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,232,228,0.75)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: "14px 32px", fontSize: 14 }}>
                  Learn About Trenchless
                </button>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={IMAGES.trenchless} alt="Trenchless pipe repair" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: isMobile ? "64px 0" : "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <RevealSection>
            <div style={{ marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 1, background: "#f5c518" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", color: "#f5c518", textTransform: "uppercase" }}>Client Reviews</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 42 : 64, color: "#ffffff", margin: 0, letterSpacing: "0.02em", lineHeight: 1 }}>
                  WHAT CLIENTS SAY
                </h2>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 32 : 10, height: 10, borderRadius: 9999, background: i === activeTestimonial ? "#f5c518" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
                ))}
              </div>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "center" }}>
            {/* Image */}
            <RevealSection>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={IMAGES.testimonialTruck} alt="Discount Drain team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </RevealSection>

            {/* Testimonial Card — frosted glass (V3) */}
            <RevealSection delay={150}>
              <div className="v5-glass-card" style={{ padding: isMobile ? 28 : 40 }}>
                <StarRating count={TESTIMONIALS[activeTestimonial].stars} />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#f5c518", lineHeight: 0.7, marginTop: 16, marginBottom: 8, opacity: 0.4 }}>"</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 16 : 18, color: "rgba(232,232,228,0.85)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 28 }}>
                  {TESTIMONIALS[activeTestimonial].text}
                </p>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#ffffff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{TESTIMONIALS[activeTestimonial].name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", marginTop: 4 }}>{TESTIMONIALS[activeTestimonial].location}</div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestimonial(i)} style={{ flex: 1, height: 3, borderRadius: 9999, background: i === activeTestimonial ? "#f5c518" : "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: "relative", padding: isMobile ? "64px 0" : "96px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="v5-spectrum-glow" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px", textAlign: "center" }}>
          <RevealSection>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: "#f5c518" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", color: "#f5c518", textTransform: "uppercase" }}>Get Started Today</span>
              <div style={{ width: 32, height: 1, background: "#f5c518" }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 48 : 80, color: "#ffffff", margin: "0 0 20px 0", letterSpacing: "0.02em", lineHeight: 1 }}>
              DRAIN PROBLEM? WE FIX IT.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 15 : 18, color: "rgba(232,232,228,0.65)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
              Free sewer camera inspection included with every service call. Available 24/7 for emergencies across London and Southwestern Ontario.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="v5-pill-btn v5-pill-btn-primary" style={{ padding: isMobile ? "14px 28px" : "18px 44px", fontSize: isMobile ? 14 : 16 }}>
                📞 Call (519) 659-7867
              </button>
              <button className="v5-pill-btn v5-pill-btn-ghost" style={{ padding: isMobile ? "14px 28px" : "18px 44px", fontSize: isMobile ? 14 : 16 }}>
                Request a Quote
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: isMobile ? "48px 20px 80px" : "64px 40px 40px", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? 36 : 48, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <img src={LOGO_URL} alt="Discount Drain" style={{ height: 56, width: "auto", objectFit: "contain", marginBottom: 20 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,232,228,0.5)", lineHeight: 1.7, maxWidth: 280 }}>
                London's most trusted drain and sewer specialists since 1970. Serving residential and commercial clients across Southwestern Ontario.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["f", "in", "g+"].map(s => (
                  <div key={s} className="v5-glass-card" style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(232,232,228,0.6)", cursor: "pointer" }}>{s}</div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#ffffff", letterSpacing: "0.08em", marginBottom: 20 }}>SERVICES</h4>
              {["Drain Cleaning", "Camera Inspection", "Trenchless Repair", "Hydro Jetting", "Wet Basement"].map(item => (
                <div key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{item}</div>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#ffffff", letterSpacing: "0.08em", marginBottom: 20 }}>COMPANY</h4>
              {["About Us", "Residential", "Commercial", "Service Areas", "Contact"].map(item => (
                <div key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", marginBottom: 10, cursor: "pointer" }}>{item}</div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#ffffff", letterSpacing: "0.08em", marginBottom: 20 }}>CONTACT</h4>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", marginBottom: 12, lineHeight: 1.6 }}>
                📞 (519) 659-7867
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", marginBottom: 12, lineHeight: 1.6 }}>
                ✉️ info@discountdrain.ca
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,232,228,0.5)", lineHeight: 1.6 }}>
                📍 London, Ontario
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#f5c518", letterSpacing: "0.08em" }}>24/7 EMERGENCY SERVICE</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,232,228,0.35)" }}>
              &copy; 2024 Discount Drain. All rights reserved. Est. 1970.
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,232,228,0.35)" }}>
              London, Ontario
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "#f5c518", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 -4px 24px rgba(0,0,0,0.4)" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#0d0d0b" }}>24/7 Emergency Service</span>
          <button className="v5-pill-btn" style={{ background: "#0d0d0b", color: "#f5c518", padding: "10px 20px", fontSize: 13, borderRadius: 9999 }}>
            📞 Call Now
          </button>
        </div>
      )}
    </div>
  );
}
