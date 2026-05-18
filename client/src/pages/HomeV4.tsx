/**
 * HomeV4 — KW Construction Template Style
 * Design System:
 * - Background: #111111 / #1a1a1a (near-black)
 * - Accent: #f5c518 (yellow-gold) — chevrons, underlines, highlights
 * - Secondary accent: #8dc63f (lime green) — nav hover states
 * - Typography: Bebas Neue (headlines, ALL CAPS bold condensed italic feel)
 *   + Oswald (subheadings) + Inter (body)
 * - Buttons: Sharp corners, yellow fill or ghost outline, >> chevron
 * - Cards: Dark bg, image top, bold italic title, yellow >> arrow
 * - Footer: Dark with photo overlay, 4-column layout
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, ChevronRight, Menu, X, Youtube, Instagram, Facebook, Star } from "lucide-react";

const LOGO_URL = "/manus-storage/discount-drain-logo_fc6d4187.png";
const HERO_VIDEO = "/manus-storage/hero-bg-v4_6eb1cf8f.mp4";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-about-collage-NcZxHkkRjKPPFvf3vKRyaW.webp";
const SERVICE_RESIDENTIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-service-residential-JHxA8XQUKygYSZfgyWbhp8.webp";
const SERVICE_COMMERCIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-service-commercial-HcqNWAqFXHx2hAxSPWMYtW.webp";
const TESTIMONIAL_TRUCK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v4-testimonial-truck-Dnjpx3dg6e473VwskTxKNj.webp";

const services = [
  { title: "Drain Cleaning & Clearing", subtitle: "Residential & Commercial", img: SERVICE_RESIDENTIAL },
  { title: "Sewer Camera Inspection", subtitle: "CCTV Pipe Inspection", img: SERVICE_COMMERCIAL },
  { title: "Trenchless Pipe Repair", subtitle: "No-Dig Technology", img: SERVICE_RESIDENTIAL },
  { title: "Wet Basement Solutions", subtitle: "Waterproofing & Drainage", img: SERVICE_COMMERCIAL },
  { title: "Excavation & Pipe Replacement", subtitle: "Full Excavation Services", img: SERVICE_RESIDENTIAL },
  { title: "Emergency Drain Service", subtitle: "24/7 Emergency Response", img: SERVICE_COMMERCIAL },
];

const testimonials = [
  {
    quote: "Discount Drain came out the same day I called. They cleared a major blockage in under an hour and the price was very fair. Highly recommend to anyone in London.",
    name: "SARAH M.",
    location: "LONDON, ON",
  },
  {
    quote: "Had a backed-up sewer line and these guys were at my door within 2 hours. Professional, clean, and honest. Will use them again without hesitation.",
    name: "JAMES T.",
    location: "STRATHROY, ON",
  },
  {
    quote: "Used Discount Drain for a camera inspection before buying our home. They found a cracked pipe that saved us thousands. Worth every penny.",
    name: "LINDA K.",
    location: "ST. THOMAS, ON",
  },
];

const serviceLinks = [
  "Drain Cleaning", "Sewer Camera Inspection", "Trenchless Repair",
  "Wet Basement", "Excavation", "Emergency Service", "Waterproofing",
];

export default function HomeV4() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#111111", color: "#ffffff", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .kwc-headline {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.02em;
          line-height: 0.95;
        }
        .kwc-subhead {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .kwc-btn-yellow {
          background: #f5c518;
          color: #111111;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 24px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .kwc-btn-yellow:hover {
          background: #ffd740;
          transform: translateY(-1px);
        }
        .kwc-btn-ghost {
          background: transparent;
          color: #ffffff;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 11px 24px;
          border: 2px solid #ffffff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .kwc-btn-ghost:hover {
          border-color: #f5c518;
          color: #f5c518;
          transform: translateY(-1px);
        }
        .kwc-nav-link {
          font-family: 'Oswald', sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          text-decoration: none;
          padding: 4px 0;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .kwc-nav-link:hover {
          color: #8dc63f;
          border-bottom-color: #8dc63f;
        }
        .kwc-service-card {
          background: #1a1a1a;
          overflow: hidden;
          transition: transform 0.25s;
          cursor: pointer;
        }
        .kwc-service-card:hover {
          transform: translateY(-4px);
        }
        .kwc-service-card:hover .kwc-card-arrow {
          background: #f5c518;
          color: #111;
        }
        .kwc-card-arrow {
          width: 44px;
          height: 44px;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker-scroll 30s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .yellow-line {
          display: inline-block;
          width: 60px;
          height: 3px;
          background: #f5c518;
          vertical-align: middle;
          margin-right: 12px;
        }
        .section-label {
          font-family: 'Oswald', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f5c518;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-label::before {
          content: '';
          display: inline-block;
          width: 40px;
          height: 2px;
          background: #f5c518;
        }
        @media (max-width: 768px) {
          .kwc-headline { line-height: 1; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* ── TOP UTILITY BAR ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #222", padding: "8px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a href="tel:+15197694900" style={{ display: "flex", alignItems: "center", gap: 6, color: "#ffffff", textDecoration: "none", fontSize: "0.75rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
              <Phone size={12} color="#f5c518" /> +1 (519) 769-4900
            </a>
            <a href="mailto:info@discountdrain.ca" className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 6, color: "#aaa", textDecoration: "none", fontSize: "0.75rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
              <Mail size={12} color="#f5c518" /> INFO@DISCOUNTDRAIN.CA
            </a>
            <span className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 6, color: "#aaa", fontSize: "0.75rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
              <MapPin size={12} color="#f5c518" /> LONDON, ON & SOUTHWESTERN ONTARIO
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#aaa", fontSize: "0.75rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
            <Clock size={12} color="#f5c518" /> 24/7 EMERGENCY SERVICE
          </div>
        </div>
      </div>

      {/* ── STICKY MAIN NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.98)" : "#0d0d0d",
        borderBottom: "1px solid #222",
        backdropFilter: "blur(8px)",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src={LOGO_URL} alt="Discount Drain" style={{ height: 64, width: "auto", objectFit: "contain", maxWidth: 180 }} />
          </a>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["ABOUT", "SERVICES", "RESIDENTIAL", "COMMERCIAL", "CONTACT US"].map((item) => (
              <a key={item} href="#" className="kwc-nav-link">{item}</a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow hide-mobile" style={{ fontSize: "0.8rem", padding: "10px 20px" }}>
              FREE ESTIMATE <ChevronRight size={14} />
            </a>
            <button
              className="show-mobile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ background: "#0d0d0d", borderTop: "1px solid #222", padding: "16px 24px 24px" }}>
            {["ABOUT", "SERVICES", "RESIDENTIAL", "COMMERCIAL", "CONTACT US"].map((item) => (
              <a key={item} href="#" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", padding: "12px 0", borderBottom: "1px solid #1a1a1a", color: "#fff", textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em" }}>
                {item}
              </a>
            ))}
            <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
              FREE ESTIMATE <ChevronRight size={14} />
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION — VIDEO BACKGROUND ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        {/* Video */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)", zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px", width: "100%" }}>
          {/* Since label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", letterSpacing: "0.2em", color: "#ffffff", textTransform: "uppercase" }}>Since 1970</span>
            <div style={{ width: 80, height: 2, background: "#f5c518" }} />
          </div>

          {/* Main headline */}
          <h1 className="kwc-headline" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#ffffff", marginBottom: 16, maxWidth: 900 }}>
            DISCOUNT<br />
            <span style={{ color: "#f5c518", WebkitTextStroke: "2px #f5c518", WebkitTextFillColor: "transparent" }}>DRAIN</span>
          </h1>

          {/* Subheadline */}
          <p className="kwc-subhead" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#ffffff", marginBottom: 36, maxWidth: 600, lineHeight: 1.4, fontStyle: "italic" }}>
            Expert Drain & Sewer Services.<br />
            Serving Southwestern Ontario for 55+ Years.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow">
              CALL NOW <ChevronRight size={16} /><ChevronRight size={16} style={{ marginLeft: -10 }} />
            </a>
            <a href="#services" className="kwc-btn-ghost">
              OUR SERVICES <ChevronRight size={16} /><ChevronRight size={16} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 24, right: 32, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #f5c518)" }} />
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#f5c518", writingMode: "vertical-rl", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section style={{ background: "#111111", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: Text */}
          <div>
            <div className="section-label">DISCOUNT DRAIN</div>
            <h2 className="kwc-headline" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#ffffff", marginBottom: 24 }}>
              A FAMILY OWNED &amp; OPERATED DRAIN COMPANY SINCE 1970
            </h2>
            <div style={{ width: 60, height: 3, background: "#f5c518", marginBottom: 24 }} />
            <p style={{ color: "#aaaaaa", lineHeight: 1.8, marginBottom: 16, fontSize: "0.95rem" }}>
              Discount Drain has been a family owned and operated business since 1970. We offer expert drain and sewer services across London and Southwestern Ontario for both residential and commercial clients.
            </p>
            <p style={{ color: "#aaaaaa", lineHeight: 1.8, marginBottom: 36, fontSize: "0.95rem" }}>
              From our humble beginnings to our innovative future, we bring decades of hands-on experience to every job. We use the latest trenchless technology and camera inspection equipment to solve problems faster, cleaner, and more affordably.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#" className="kwc-btn-yellow">OUR HISTORY <ChevronRight size={14} /><ChevronRight size={14} style={{ marginLeft: -10 }} /></a>
              <a href="#" className="kwc-btn-ghost">MEET THE TEAM <ChevronRight size={14} /><ChevronRight size={14} style={{ marginLeft: -10 }} /></a>
            </div>
          </div>

          {/* Right: Image collage */}
          <div style={{ position: "relative" }}>
            <img src={ABOUT_IMG} alt="Discount Drain history" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
            {/* Yellow accent border */}
            <div style={{ position: "absolute", bottom: -12, right: -12, width: "70%", height: "70%", border: "3px solid #f5c518", zIndex: -1 }} />
            {/* Stats badge */}
            <div style={{ position: "absolute", bottom: 24, left: -24, background: "#f5c518", padding: "20px 28px" }}>
              <div className="kwc-headline" style={{ fontSize: "3rem", color: "#111", lineHeight: 1 }}>55+</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#111", textTransform: "uppercase" }}>Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TICKER ── */}
      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e", overflow: "hidden", padding: "14px 0" }}>
        <div className="ticker-track">
          {[...serviceLinks, ...serviceLinks].map((s, i) => (
            <span key={i} style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", padding: "0 32px", borderRight: "1px solid #333", whiteSpace: "nowrap" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES SECTION ── */}
      <section id="services" style={{ background: "#111111", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="section-label">WHAT WE DO BEST</div>
          <h2 className="kwc-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", marginBottom: 60 }}>
            OUR <span style={{ color: "#f5c518" }}>DRAIN</span> SERVICES
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
            {services.map((svc, i) => (
              <div key={i} className="kwc-service-card">
                <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
                  <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                  {/* Yellow arrow */}
                  <div className="kwc-card-arrow" style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <ChevronRight size={20} color="#f5c518" />
                  </div>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <h3 className="kwc-subhead" style={{ fontSize: "1rem", color: "#ffffff", marginBottom: 6, textTransform: "uppercase" }}>{svc.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.8rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>{svc.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section style={{ background: "#0a0a0a", padding: "100px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "stretch" }}>
          {/* Left: Photo */}
          <div style={{ position: "relative", minHeight: 500 }}>
            <img src={TESTIMONIAL_TRUCK} alt="Discount Drain fleet" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 400 }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
          </div>

          {/* Right: Testimonial */}
          <div style={{ background: "#ffffff", padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#f5c518", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 40, height: 2, background: "#f5c518" }} /> Success Stories
            </div>
            <h2 className="kwc-headline" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#111111", marginBottom: 32, lineHeight: 1.1 }}>
              WHAT SOUTHWESTERN ONTARIO<br />THINKS OF{" "}
              <span style={{ color: "#f5c518" }}>DISCOUNT DRAIN</span>
            </h2>

            {/* Stars */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f5c518" color="#f5c518" />)}
            </div>

            <blockquote style={{ color: "#444", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 24, fontStyle: "italic", borderLeft: "3px solid #f5c518", paddingLeft: 20 }}>
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div>
              <div className="kwc-subhead" style={{ color: "#111", fontSize: "0.85rem", textTransform: "uppercase" }}>{testimonials[activeTestimonial].name}</div>
              <div style={{ color: "#888", fontSize: "0.75rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{testimonials[activeTestimonial].location}</div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 28 : 8, height: 8, background: i === activeTestimonial ? "#f5c518" : "#ddd", border: "none", cursor: "pointer", transition: "all 0.3s", borderRadius: 0 }} />
              ))}
            </div>

            <a href="#" className="kwc-btn-yellow" style={{ marginTop: 32, alignSelf: "flex-start" }}>
              VIEW ALL REVIEWS <ChevronRight size={14} /><ChevronRight size={14} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: "#f5c518", padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { num: "55+", label: "Years in Business" },
            { num: "20+", label: "Expert Technicians" },
            { num: "24/7", label: "Emergency Service" },
            { num: "20yr", label: "Workmanship Warranty" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px 0", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.15)" : "none" }}>
              <div className="kwc-headline" style={{ fontSize: "3.5rem", color: "#111111", lineHeight: 1 }}>{stat.num}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#333", textTransform: "uppercase", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <section style={{ position: "relative", padding: "100px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SERVICE_COMMERCIAL})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>GET STARTED TODAY</div>
          <h2 className="kwc-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", marginBottom: 16 }}>
            NEED A <span style={{ color: "#f5c518" }}>DRAIN</span> SPECIALIST?
          </h2>
          <p className="kwc-subhead" style={{ color: "#ccc", fontSize: "1.1rem", marginBottom: 48, fontStyle: "italic" }}>
            Free camera inspection with any drain service. A $400 value.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+15197694900" className="kwc-btn-yellow" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              CALL NOW: (519) 769-4900 <ChevronRight size={16} /><ChevronRight size={16} style={{ marginLeft: -10 }} />
            </a>
            <a href="#" className="kwc-btn-ghost" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              REQUEST A QUOTE <ChevronRight size={16} /><ChevronRight size={16} style={{ marginLeft: -10 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", paddingTop: 80, paddingBottom: 40, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${TESTIMONIAL_TRUCK})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.18)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 60 }}>
            {/* Company */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid #f5c518" }}>COMPANY</div>
              {["Home", "About Us", "Our History", "Meet the Team", "Careers", "Contact Us"].map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "#aaa", textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", letterSpacing: "0.05em", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >{l}</a>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid #f5c518" }}>SERVICES</div>
              {serviceLinks.map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "#aaa", textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", letterSpacing: "0.05em", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid #f5c518" }}>CONTACT US</div>
              {[
                { icon: <Phone size={14} />, text: "+1 (519) 769-4900", href: "tel:+15197694900" },
                { icon: <Mail size={14} />, text: "info@discountdrain.ca", href: "mailto:info@discountdrain.ca" },
                { icon: <Clock size={14} />, text: "24/7 Emergency Service", href: "#" },
                { icon: <MapPin size={14} />, text: "London, ON & Southwestern Ontario", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#aaa", textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", marginBottom: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  <span style={{ color: "#f5c518", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="kwc-subhead" style={{ color: "#f5c518", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid #f5c518" }}>SOCIAL</div>
              {[
                { icon: <Youtube size={16} />, label: "YouTube" },
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Facebook size={16} />, label: "Facebook" },
              ].map((s, i) => (
                <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "#aaa", textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", marginBottom: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c518")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  <span style={{ color: "#f5c518" }}>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <img src={LOGO_URL} alt="Discount Drain" style={{ height: 64, width: "auto", objectFit: "contain", maxWidth: 180 }} />
            <p style={{ color: "#555", fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              © Discount Drain. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
