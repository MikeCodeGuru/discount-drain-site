/**
 * HomeV4 — KW Construction Template Style (Redesigned)
 * Design System:
 * - Background: #0d0d0b (warm near-black, not pure #111)
 * - Accent: #f5c518 (yellow-gold) — SINGLE accent, no secondary
 * - Typography: Bebas Neue (display headlines) + Oswald (subheads/labels) + Inter (body, 300/400/500)
 * - Buttons: Sharp corners, yellow fill or ghost outline, >> chevron, active scale feedback
 * - Cards: Dark bg, image top with zoom-on-hover, bold title, yellow >> arrow
 * - Motion: Staggered scroll-reveal, spring hover, image parallax
 * - Layout: Asymmetric about section, masonry-style services, broken grid stats
 */

import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Clock, ChevronRight, Menu, X, Youtube, Instagram, Facebook, Star, Quote } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

const LOGO_URL = "/manus-storage/discount-drain-logo_fc6d4187.png";
const HERO_VIDEO = "/manus-storage/hero-bg-v4_6eb1cf8f.mp4";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-about-truck-e6AkZCF8YEoHjoucv2jvLp.webp";
const SERVICE_RESIDENTIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-service-residential-JHxA8XQUKygYSZfgyWbhp8.webp";
const SERVICE_COMMERCIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-service-commercial-HcqNWAqFXHx2hAxSPWMYtW.webp";
const TESTIMONIAL_TRUCK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-testimonial-truck-v2-NbJHkcJxRTtPJmUshG6msj.webp";

// Alternate images per service card for visual variety
const serviceImages = [SERVICE_RESIDENTIAL, SERVICE_COMMERCIAL, SERVICE_RESIDENTIAL, SERVICE_COMMERCIAL, SERVICE_RESIDENTIAL, SERVICE_COMMERCIAL];

const services = [
  { title: "Drain Cleaning & Clearing", subtitle: "Residential & Commercial", img: serviceImages[0] },
  { title: "Sewer Camera Inspection", subtitle: "CCTV pipe inspection", img: serviceImages[1] },
  { title: "Trenchless Pipe Repair", subtitle: "No-dig technology", img: serviceImages[2] },
  { title: "Wet Basement Solutions", subtitle: "Waterproofing & drainage", img: serviceImages[3] },
  { title: "Emergency Drain Service", subtitle: "24/7 emergency response", img: serviceImages[5] },
];

const testimonials = [
  {
    quote: "Discount Drain came out the same day I called. They cleared a major blockage in under an hour and the price was very fair. Highly recommend to anyone in London.",
    name: "Sarah M.",
    location: "London, ON",
  },
  {
    quote: "Had a backed-up sewer line and these guys were at my door within 2 hours. Professional, clean, and honest. Will use them again without hesitation.",
    name: "James T.",
    location: "Strathroy, ON",
  },
  {
    quote: "Used Discount Drain for a camera inspection before buying our home. They found a cracked pipe that saved us thousands. Worth every penny.",
    name: "Linda K.",
    location: "St. Thomas, ON",
  },
];

const serviceLinks = [
  "Drain Cleaning", "Sewer Camera Inspection", "Trenchless Repair",
  "Wet Basement", "Emergency Service", "Waterproofing",
];

// Simple scroll-reveal hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function HomeV4() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const aboutReveal = useScrollReveal();
  const servicesReveal = useScrollReveal(0.05);
  const testimonialsReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#0d0d0b", color: "#ffffff", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

      {/* ── FONTS + GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        html { scroll-behavior: smooth; }

        .kwc-headline {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.02em;
          line-height: 0.92;
          text-wrap: balance;
        }
        .kwc-subhead {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .kwc-body {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          line-height: 1.8;
          max-width: 62ch;
          color: #b0b0aa;
          font-size: 1rem;
          letter-spacing: 0.01em;
        }

        /* Buttons */
        .kwc-btn-yellow {
          background: #f5c518;
          color: #0d0d0b;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 13px 26px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          text-decoration: none;
          user-select: none;
        }
        .kwc-btn-yellow:hover {
          background: #ffd740;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,197,24,0.35);
        }
        .kwc-btn-yellow:active {
          transform: translateY(0) scale(0.98);
          box-shadow: none;
        }
        .kwc-btn-ghost {
          background: transparent;
          color: #ffffff;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 26px;
          border: 2px solid rgba(255,255,255,0.5);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
          text-decoration: none;
          user-select: none;
        }
        .kwc-btn-ghost:hover {
          border-color: #f5c518;
          color: #f5c518;
          transform: translateY(-2px);
        }
        .kwc-btn-ghost:active {
          transform: translateY(0) scale(0.98);
        }

        /* Nav links — single accent only */
        .kwc-nav-link {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          padding: 6px 2px;
          border-bottom: 2px solid transparent;
          transition: color 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .kwc-nav-link:hover {
          color: #f5c518;
          border-bottom-color: #f5c518;
        }

        /* Service cards */
        .kwc-service-card {
          background: #161614;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .kwc-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.6);
        }
        .kwc-service-card:hover .kwc-card-img {
          transform: scale(1.06);
        }
        .kwc-service-card:hover .kwc-card-arrow {
          background: #f5c518;
          color: #0d0d0b;
        }
        .kwc-card-img {
          transition: transform 0.5s ease;
        }
        .kwc-card-arrow {
          width: 44px;
          height: 44px;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, color 0.25s;
        }

        /* Ticker */
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker-scroll 32s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Section label */
        .section-label {
          font-family: 'Oswald', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f5c518;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::before {
          content: '';
          display: inline-block;
          width: 36px;
          height: 2px;
          background: #f5c518;
          flex-shrink: 0;
        }

        /* Scroll reveal */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        /* Mobile menu slide */
        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu.open {
          max-height: 500px;
        }

        /* Testimonial fade */
        .testimonial-content {
          transition: opacity 0.4s ease;
        }

        @media (max-width: 768px) {
          .kwc-headline { line-height: 1; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-4col { grid-template-columns: 1fr 1fr !important; }
          .kwc-body { max-width: 100%; }
          .kwc-btn-yellow, .kwc-btn-ghost { width: 100%; justify-content: center; }
          .section-label { font-size: 0.65rem; }
        }
        @media (max-width: 480px) {
          .grid-4col { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* ── STICKY MOBILE CALL BAR ── */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "#f5c518", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 -4px 20px rgba(0,0,0,0.4)" }}>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(0,0,0,0.55)", textTransform: "uppercase", marginBottom: 2 }}>24/7 Emergency</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0b" }}>(519) 769-4900</div>
          </div>
          <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ padding: "10px 22px", fontSize: "0.78rem", width: "auto" }}>
            Call Now <ChevronRight size={13} />
          </a>
        </div>
      )}

      {/* ── TOP UTILITY BAR ── */}
      <div style={{ background: "#080807", borderBottom: "1px solid #1c1c1a", padding: "8px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a href="tel:+15197694900" style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}>
              <Phone size={11} color="#f5c518" /> +1 (519) 769-4900
            </a>
            <a href="mailto:info@discountdrain.ca" className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", textDecoration: "none", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: "0.04em" }}>
              <Mail size={11} color="#f5c518" /> info@discountdrain.ca
            </a>
            <span className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: "0.04em" }}>
              <MapPin size={11} color="#f5c518" /> London, ON & Southwestern Ontario
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: "0.04em" }}>
            <Clock size={11} color="#f5c518" /> 24/7 Emergency Service
          </div>
        </div>
      </div>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div style={{ background: "#f5c518", padding: "11px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "#0d0d0b", letterSpacing: "0.01em", lineHeight: 1.4 }}>
          <strong style={{ fontWeight: 700 }}>Free Sewer Video Camera Inspection</strong>
          {" "}- A $400 value, included with every service call.{" "}
          <a href="tel:+15197694900" style={{ color: "#0d0d0b", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "3px" }}>Call Now &rarr;</a>
        </p>
      </div>

      {/* ── STICKY MAIN NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(13,13,11,0.97)" : "#0d0d0b",
        borderBottom: `1px solid ${scrolled ? "#1c1c1a" : "#1c1c1a"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 68 : 84 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <img src={LOGO_URL} alt="Discount Drain logo" style={{ height: isMobile ? 68 : 80, width: "auto", objectFit: "contain", maxWidth: isMobile ? 200 : 220 }} />
          </a>

          {/* Desktop Nav — wider gap, Outfit font */}
          <div className="hide-mobile" style={{ display: "flex", gap: 52, alignItems: "center" }}>
            {["About", "Services", "Residential", "Commercial", "Contact"].map((item) => (
              <a key={item} href="#" className="kwc-nav-link">{item}</a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow hide-mobile" style={{ fontSize: "0.8rem", padding: "12px 24px", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.1em" }}>
              Free Estimate <ChevronRight size={14} />
            </a>
            <button
              className="show-mobile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — slide transition */}
        <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`} style={{ background: "#0d0d0b", borderTop: "1px solid #1c1c1a" }}>
          <div style={{ padding: "16px 24px 24px" }}>
            {["About", "Services", "Residential", "Commercial", "Contact"].map((item) => (
              <a key={item} href="#" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", padding: "14px 0", borderBottom: "1px solid #1a1a18", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {item}
              </a>
            ))}
            <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ marginTop: 20, width: "100%", justifyContent: "center", fontFamily: "'Outfit', sans-serif" }}>
              Free Estimate <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION — VIDEO BACKGROUND ── */}
      <section style={{ position: "relative", minHeight: isMobile ? "100svh" : "100dvh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Multi-stop gradient for cinematic depth */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,11,0.96) 0%, rgba(13,13,11,0.6) 40%, rgba(13,13,11,0.25) 70%, rgba(13,13,11,0.1) 100%)", zIndex: 1 }} />

        {/* Subtle left vignette */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,11,0.5) 0%, transparent 60%)", zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: isMobile ? "100%" : "640px", padding: isMobile ? "0 16px" : "0 0 0 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 2, background: "#f5c518" }} />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.78rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Since 1970</span>
          </div>

          <h1 className="kwc-headline" style={{ fontSize: "clamp(4rem, 11vw, 10rem)", color: "#ffffff", marginBottom: 8, maxWidth: 900 }}>
            DISCOUNT
          </h1>
          <h1 className="kwc-headline" style={{ fontSize: "clamp(4rem, 11vw, 10rem)", marginBottom: 28, maxWidth: 900, WebkitTextStroke: "2px #f5c518", WebkitTextFillColor: "transparent", color: "transparent" }}>
            DRAIN
          </h1>

          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.78)", marginBottom: 44, maxWidth: 520, lineHeight: 1.65, letterSpacing: "0.01em" }}>
            Expert drain & sewer services.<br />Serving Southwestern Ontario for 55+ years.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ fontSize: "0.85rem", padding: "14px 28px" }}>
              Call Now <ChevronRight size={15} /><ChevronRight size={15} style={{ marginLeft: -10 }} />
            </a>
            <a href="#services" className="kwc-btn-ghost" style={{ fontSize: "0.85rem", padding: "14px 28px" }}>
              Our Services <ChevronRight size={15} /><ChevronRight size={15} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        {!isMobile && <div style={{ position: "absolute", bottom: 28, right: 36, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, #f5c518)" }} />
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#f5c518", writingMode: "vertical-rl", textTransform: "uppercase" }}>Scroll</span>
        </div>}
      </section>

      {/* ── ABOUT SECTION ── */}
      <section style={{ background: "#0d0d0b", padding: isMobile ? "64px 0" : "110px 0" }}>
        <div
          ref={aboutReveal.ref}
          className={`reveal${aboutReveal.visible ? " visible" : ""}`}
          style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}
        >
          {/* Left: Text */}
          <div>
            <div className="section-label">Discount Drain</div>
            <h2 className="kwc-headline" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#ffffff", marginBottom: 24 }}>
              A family owned &amp; operated drain company since 1970
            </h2>
            <div style={{ width: 52, height: 3, background: "#f5c518", marginBottom: 28 }} />
            <p className="kwc-body" style={{ marginBottom: 16 }}>
              Discount Drain has been a family owned and operated business since 1970. We offer expert drain and sewer services across London and Southwestern Ontario for both residential and commercial clients.
            </p>
            <p className="kwc-body" style={{ marginBottom: 40 }}>
              From our humble beginnings to our innovative future, we bring decades of hands-on experience to every job. We use the latest trenchless technology and camera inspection equipment to solve problems faster, cleaner, and more affordably.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#" className="kwc-btn-yellow">Our History <ChevronRight size={13} /><ChevronRight size={13} style={{ marginLeft: -10 }} /></a>
              <a href="#" className="kwc-btn-ghost">Meet the Team <ChevronRight size={13} /><ChevronRight size={13} style={{ marginLeft: -10 }} /></a>
            </div>
          </div>

          {/* Right: Image with offset border + badge */}
          <div style={{ position: "relative", paddingBottom: isMobile ? 12 : 16, paddingRight: isMobile ? 12 : 16 }}>
            <img src={ABOUT_IMG} alt="Discount Drain crew working on a drain repair" style={{ width: "100%", height: isMobile ? 280 : 480, objectFit: "cover", display: "block", position: "relative", zIndex: 1 }} />
            {/* Offset yellow border — behind image */}
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "72%", height: "72%", border: "3px solid #f5c518", zIndex: 0 }} />
            {/* Stats badge */}
            <div style={{ position: "absolute", bottom: isMobile ? 16 : 32, left: isMobile ? -8 : -28, background: "#f5c518", padding: isMobile ? "14px 18px" : "22px 30px", zIndex: 2 }}>
              <div className="kwc-headline" style={{ fontSize: "3.2rem", color: "#0d0d0b", lineHeight: 1 }}>55+</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", color: "#0d0d0b", textTransform: "uppercase", marginTop: 4 }}>Years of service</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TICKER ── */}
      <div style={{ background: "#080807", borderTop: "1px solid #1c1c1a", borderBottom: "1px solid #1c1c1a", overflow: "hidden", padding: "13px 0" }}>
        <div className="ticker-track">
          {[...serviceLinks, ...serviceLinks].map((s, i) => (
            <span key={i} style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#555", padding: "0 36px", borderRight: "1px solid #2a2a28", whiteSpace: "nowrap" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES SECTION ── */}
      <section id="services" style={{ background: "#0d0d0b", padding: isMobile ? "64px 0 80px" : "110px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <div
            ref={servicesReveal.ref}
            className={`reveal${servicesReveal.visible ? " visible" : ""}`}
          >
            <div className="section-label">What we do best</div>
            <h2 className="kwc-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", marginBottom: 64 }}>
              Our <span style={{ color: "#f5c518" }}>drain</span> services
            </h2>
          </div>

          {/* Services grid — 4-col top row, 2-col bottom to break symmetry */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 3 }}>
            {services.slice(0, 4).map((svc, i) => (
              <div
                key={i}
                className={`kwc-service-card reveal${servicesReveal.visible ? " visible" : ""} reveal-delay-${i + 1}`}
              >
                <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                  <img src={svc.img} alt={svc.title} className="kwc-card-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
                  <div className="kwc-card-arrow" style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <ChevronRight size={18} color="#f5c518" />
                  </div>
                </div>
                <div style={{ padding: "18px 18px 22px" }}>
                  <h3 className="kwc-subhead" style={{ fontSize: "0.95rem", color: "#ffffff", marginBottom: 5 }}>{svc.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: "0.02em" }}>{svc.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom 2 cards — wider for visual rhythm */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 3, marginTop: 3 }}>
            {services.slice(4).map((svc, i) => (
              <div
                key={i}
                className={`kwc-service-card reveal${servicesReveal.visible ? " visible" : ""} reveal-delay-${i + 3}`}
              >
                <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
                  <img src={svc.img} alt={svc.title} className="kwc-card-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
                  <div className="kwc-card-arrow" style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <ChevronRight size={18} color="#f5c518" />
                  </div>
                </div>
                <div style={{ padding: "18px 18px 22px" }}>
                  <h3 className="kwc-subhead" style={{ fontSize: "0.95rem", color: "#ffffff", marginBottom: 5 }}>{svc.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: "0.02em" }}>{svc.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section style={{ background: "#080807", padding: "0", overflow: "hidden" }}>
        <div
          ref={testimonialsReveal.ref}
          className={`reveal${testimonialsReveal.visible ? " visible" : ""}`}
          style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", alignItems: "stretch" }}
        >
          {/* Left: Photo */}
          <div style={{ position: "relative", minHeight: isMobile ? 240 : 520 }}>
            <img src={TESTIMONIAL_TRUCK} alt="Discount Drain service truck" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 400 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,7,0.1), rgba(8,8,7,0.35))" }} />
          </div>

          {/* Right: Testimonial — off-white warm panel */}
          <div style={{ background: "#f7f4ef", padding: isMobile ? "44px 24px" : "72px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.22em", color: "#f5c518", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 2, background: "#f5c518" }} /> Success stories
            </div>
            <h2 className="kwc-headline" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#0d0d0b", marginBottom: 36, lineHeight: 1.05 }}>
              What Southwestern Ontario<br />thinks of{" "}
              <span style={{ color: "#f5c518" }}>Discount Drain</span>
            </h2>

            <div style={{ display: "flex", gap: 3, marginBottom: 22 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f5c518" color="#f5c518" />)}
            </div>

            <div className="testimonial-content" style={{ opacity: 1 }}>
              <Quote size={28} color="#f5c518" style={{ marginBottom: 12, opacity: 0.6 }} />
              <blockquote style={{ color: "#3a3a3a", lineHeight: 1.85, fontSize: "1rem", marginBottom: 24, fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontStyle: "italic", borderLeft: "3px solid #f5c518", paddingLeft: 20, maxWidth: "52ch" }}>
                {testimonials[activeTestimonial].quote}
              </blockquote>

              <div>
                <div className="kwc-subhead" style={{ color: "#0d0d0b", fontSize: "0.82rem", textTransform: "uppercase" }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ color: "#888", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>{testimonials[activeTestimonial].location}</div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    width: i === activeTestimonial ? 28 : 8,
                    height: 8,
                    background: i === activeTestimonial ? "#f5c518" : "#ccc",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>

            <a href="#" className="kwc-btn-yellow" style={{ marginTop: 36, alignSelf: "flex-start" }}>
              View all reviews <ChevronRight size={13} /><ChevronRight size={13} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div
        ref={statsReveal.ref}
        className={`reveal${statsReveal.visible ? " visible" : ""}`}
        style={{ background: "#f5c518", padding: isMobile ? "36px 0" : "48px 0" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "24px 0" : 0 }}>
          {[
            { num: "55+", label: "Years in business" },
            { num: "20+", label: "Expert technicians" },
            { num: "24/7", label: "Emergency service" },
            { num: "20yr", label: "Workmanship warranty" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`reveal${statsReveal.visible ? " visible" : ""} reveal-delay-${i + 1}`}
              style={{ textAlign: "center", padding: "8px 0", borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(0,0,0,0.12)" : "none") : (i < 3 ? "1px solid rgba(0,0,0,0.12)" : "none") }}
            >
              <div className="kwc-headline" style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", color: "#0d0d0b", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{stat.num}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(0,0,0,0.55)", textTransform: "uppercase", marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <section style={{ position: "relative", padding: isMobile ? "80px 0 120px" : "120px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SERVICE_COMMERCIAL})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        {/* Layered overlay for depth */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,11,0.82)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(245,197,24,0.06) 0%, transparent 70%)" }} />

        <div
          ref={ctaReveal.ref}
          className={`reveal${ctaReveal.visible ? " visible" : ""}`}
          style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", textAlign: "center" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Get started today</div>
          <h2 className="kwc-headline" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", color: "#ffffff", marginBottom: 16 }}>
            Need a <span style={{ color: "#f5c518" }}>drain</span> specialist?
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", marginBottom: 52, letterSpacing: "0.01em" }}>
            Free camera inspection with any drain service. A $400 value.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ fontSize: "0.88rem", padding: "15px 32px" }}>
              Call now: (519) 769-4900 <ChevronRight size={15} /><ChevronRight size={15} style={{ marginLeft: -10 }} />
            </a>
            <a href="#" className="kwc-btn-ghost" style={{ fontSize: "0.88rem", padding: "15px 32px" }}>
              Request a quote <ChevronRight size={15} /><ChevronRight size={15} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", paddingTop: isMobile ? 56 : 88, paddingBottom: isMobile ? 96 : 44, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${TESTIMONIAL_TRUCK})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.14) saturate(0.5)" }} />
        {/* Subtle warm tint overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,11,0.7)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: isMobile ? 32 : 48, marginBottom: isMobile ? 40 : 64 }}>
            {/* Company */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(245,197,24,0.3)" }}>Company</div>
              {["Home", "About us", "Our history", "Meet the team", "Careers", "Contact us"].map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "#666", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.87rem", marginBottom: 11, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >{l}</a>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(245,197,24,0.3)" }}>Services</div>
              {serviceLinks.map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "#666", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.87rem", marginBottom: 11, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(245,197,24,0.3)" }}>Contact us</div>
              {[
                { icon: <Phone size={13} />, text: "+1 (519) 769-4900", href: "tel:+15197694900" },
                { icon: <Mail size={13} />, text: "info@discountdrain.ca", href: "mailto:info@discountdrain.ca" },
                { icon: <Clock size={13} />, text: "24/7 emergency service", href: "#" },
                { icon: <MapPin size={13} />, text: "London, ON & Southwestern Ontario", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#666", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.87rem", marginBottom: 14, transition: "color 0.2s", lineHeight: 1.55 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >
                  <span style={{ color: "#f5c518", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(245,197,24,0.3)" }}>Follow us</div>
              {[
                { icon: <Youtube size={15} />, label: "YouTube" },
                { icon: <Instagram size={15} />, label: "Instagram" },
                { icon: <Facebook size={15} />, label: "Facebook" },
              ].map((s, i) => (
                <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "#666", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.87rem", marginBottom: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >
                  <span style={{ color: "#f5c518" }}>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", gap: 16 }}>
            <img src={LOGO_URL} alt="Discount Drain" style={{ height: 56, width: "auto", objectFit: "contain", maxWidth: 160 }} />
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#" style={{ color: "#444", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.06em", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >Privacy Policy</a>
              <a href="#" style={{ color: "#444", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.06em", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >Terms of Service</a>
              <p style={{ color: "#333", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                © {new Date().getFullYear()} Discount Drain. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
