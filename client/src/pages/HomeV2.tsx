/*
 * DESIGN SYSTEM: Flowmapp — "Architectural Blueprint on White Marble"
 * ====================================================================
 * Theme: Light / White Canvas
 * Primary Font: Inter (all weights 400-700)
 * Colors: Canvas White #ffffff | Ink Black #000000 | Highlight Blue #0080ff
 *         Steel Gray #8c9baa | Subtle Blue #c5e0fb | Pebble Gray #dee0e4
 *         Charcoal Text #222222 | Gradient Violet #0050ff
 * Buttons: 1600px radius (pill) | Cards: 12px standard | Large cards: 32px
 * No drop shadows on cards — depth via background blobs and borders
 * Organic gradient blobs: #98cafc, #3298fe, #82bffc
 */

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
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
  Play,
} from "lucide-react";

// Image URLs
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v2-hero-tech-KczYDTF2pWhFyfmmZkMDtE.webp";
const TRENCHLESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v2-trenchless-DjpSv2N9wWDMeaKfaNriGB.webp";
const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v2-team-gRpx7mF2YQoNsWPJsg9wrv.webp";
const CAMERA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/v2-camera-screen-gMfFqgwcH4HCSCTCTfqVKR.webp";

// Animated counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// Scroll fade-in hook
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const residentialServices = [
  {
    icon: Camera,
    title: "Free Sewer Video Camera Inspections",
    desc: "See your sewer line live, on the spot. A $400 value included with every service call.",
    tag: "Free with every call",
  },
  {
    icon: Wrench,
    title: "No Dig Trenchless Systems",
    desc: "Replace underground pipe without disturbing driveways or landscaping. Done in a day.",
    tag: "No excavation",
  },
  {
    icon: Droplets,
    title: "Wet Basement Repair",
    desc: "Permanent wet basement fixes backed by a 20-year warranty. 24-hour emergency dispatch.",
    tag: "20-year warranty",
  },
  {
    icon: Wrench,
    title: "Sewer Repair and Installation",
    desc: "Certified technicians solving sewer and drain problems quickly and professionally.",
    tag: "Certified team",
  },
  {
    icon: Droplets,
    title: "Drain Cleaning and Power Flushing",
    desc: "Latest technology keeps your drains flowing simply and affordably.",
    tag: "Preventative care",
  },
  {
    icon: Truck,
    title: "Dump Trucks and Machine Excavating",
    desc: "Full fleet for deep excavations, parking lot prep, and pool installations.",
    tag: "Full fleet",
  },
];

const commercialServices = [
  {
    icon: Camera,
    title: "Sewer Video Camera Inspections",
    desc: "Commercial-grade video inspection to diagnose sewer and drain problems fast.",
    tag: "Same-day service",
  },
  {
    icon: Building2,
    title: "Municipal Services",
    desc: "Sewer lining, manhole restoration, and water main repair for municipalities.",
    tag: "Municipal grade",
  },
  {
    icon: Wrench,
    title: "No Dig Trenchless Systems",
    desc: "Minimal disruption to business operations. Replace pipe without surface damage.",
    tag: "No excavation",
  },
  {
    icon: Droplets,
    title: "Catch Basin Cleaning",
    desc: "Quick and professional catch basin solutions using the latest technology.",
    tag: "Affordable",
  },
  {
    icon: Wrench,
    title: "Sewer Repair and Installation",
    desc: "Highly trained technicians using the latest products for commercial sewer systems.",
    tag: "Certified team",
  },
  {
    icon: Shield,
    title: "Septic Service",
    desc: "Preventative maintenance, full repairs, and replacements on septic beds and sewers.",
    tag: "Full service",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "London, ON",
    stars: 5,
    text: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong. Professional, honest, and the price was fair.",
  },
  {
    name: "James T.",
    location: "Strathroy, ON",
    stars: 5,
    text: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands. The job was done in one day.",
  },
  {
    name: "Linda K.",
    location: "St. Thomas, ON",
    stars: 5,
    text: "Had a wet basement for years. Discount Drain fixed it permanently with a 20-year warranty. Family-owned business that truly cares about their customers.",
  },
];

const F = {
  white: "#ffffff",
  black: "#000000",
  steelGray: "#8c9baa",
  blue: "#0080ff",
  subtleBlue: "#c5e0fb",
  gradientViolet: "#0050ff",
  pebbleGray: "#dee0e4",
  charcoal: "#222222",
};

export default function HomeV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  const heroRef = useFadeIn();
  const statsRef = useFadeIn();
  const servicesRef = useFadeIn();
  const featureRef = useFadeIn();
  const aboutRef = useFadeIn();
  const testimonialsRef = useFadeIn();
  const ctaRef = useFadeIn();

  return (
    <div className="min-h-screen" style={{ backgroundColor: F.white, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflowX: "hidden" }}>

      {/* ─── TOP ANNOUNCEMENT BAR ─── */}
      <div style={{ backgroundColor: F.blue, padding: "10px 0" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <span style={{ color: F.white, fontSize: "14px", fontWeight: 500 }}>
            Free Sewer Video Camera Inspection with every service call - a $400 value.
          </span>
          <a href="tel:5194518342" style={{ color: F.white, fontSize: "14px", fontWeight: 700, textDecoration: "underline" }}>
            Book now
          </a>
        </div>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${F.pebbleGray}`,
        height: "70px",
      }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "36px", height: "36px",
              backgroundColor: F.blue,
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Droplets size={18} style={{ color: F.white }} />
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: F.black, lineHeight: 1 }}>Discount Drain</div>
              <div style={{ fontSize: "11px", color: F.steelGray, lineHeight: 1, marginTop: "2px" }}>Est. 1970</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
            {["Services", "Residential", "Commercial", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ fontSize: "14px", fontWeight: 500, color: F.charcoal, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = F.blue)}
                onMouseLeave={(e) => (e.currentTarget.style.color = F.charcoal)}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="tel:5194518342"
              className="hidden sm:flex"
              style={{
                alignItems: "center", gap: "8px",
                fontSize: "14px", fontWeight: 500, color: F.charcoal,
                textDecoration: "none",
              }}
            >
              <Phone size={14} style={{ color: F.blue }} />
              519-451-8342
            </a>
            <a
              href="tel:5194518342"
              className="hidden sm:inline-flex"
              style={{
                backgroundColor: F.blue,
                color: F.white,
                fontSize: "14px",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "1600px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = F.gradientViolet)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = F.blue)}
            >
              Get Free Inspection
            </a>
            <button
              className="md:hidden"
              style={{ background: "none", border: "none", color: F.black, padding: "4px" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ backgroundColor: F.white, borderTop: `1px solid ${F.pebbleGray}`, padding: "16px 24px" }}>
            {["Services", "Residential", "Commercial", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ display: "block", padding: "12px 0", fontSize: "15px", fontWeight: 500, color: F.charcoal, textDecoration: "none", borderBottom: `1px solid ${F.pebbleGray}` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:5194518342"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", backgroundColor: F.blue, color: F.white, fontSize: "15px", fontWeight: 600, padding: "14px", borderRadius: "1600px", textDecoration: "none" }}
            >
              <Phone size={15} /> Call 519-451-8342
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="services" style={{ position: "relative", overflow: "hidden", backgroundColor: F.white, paddingTop: "80px", paddingBottom: "80px" }}>
        {/* Organic gradient blobs */}
        <div style={{
          position: "absolute", top: "-120px", right: "-100px",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(152,202,252,0.45) 0%, rgba(130,191,252,0.2) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(197,224,251,0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div ref={heroRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            {/* Left: Text */}
            <div>
              {/* Pill badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: F.subtleBlue,
                borderRadius: "1600px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: F.blue }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>London's Drain Specialists Since 1970</span>
              </div>

              <h1 style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 700,
                color: F.black,
                lineHeight: 1.09,
                letterSpacing: "-0.48px",
                marginBottom: "24px",
              }}>
                Drain Problems<br />
                <span style={{ color: F.blue }}>Solved Fast.</span>
              </h1>

              <p style={{
                fontSize: "18px",
                fontWeight: 400,
                color: F.steelGray,
                lineHeight: 1.6,
                maxWidth: "480px",
                marginBottom: "40px",
              }}>
                Family-owned since 1970. We fix any drain or sewer problem for London and Southwestern Ontario homeowners and businesses - with a free camera inspection on every call.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
                <a
                  href="tel:5194518342"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    backgroundColor: F.blue,
                    color: F.white,
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "16px 32px",
                    borderRadius: "1600px",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = F.gradientViolet)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = F.blue)}
                >
                  <Phone size={16} />
                  Call 519-451-8342
                </a>
                <a
                  href="#about"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    backgroundColor: F.white,
                    color: F.black,
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "16px 28px",
                    borderRadius: "1600px",
                    textDecoration: "none",
                    border: `1px solid ${F.pebbleGray}`,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = F.blue)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = F.pebbleGray)}
                >
                  About Us
                  <ChevronRight size={16} />
                </a>
              </div>

              {/* Trust row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {[
                  { label: "BBB Accredited" },
                  { label: "WSIB Compliant" },
                  { label: "Fully Insured" },
                  { label: "24/7 Emergency" },
                ].map(({ label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} style={{ color: F.blue }} />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: F.charcoal }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image in rounded frame */}
            <div style={{ position: "relative" }} className="hidden md:block">
              <div style={{
                borderRadius: "32px",
                overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "rgba(0,0,0,0.06) 0px 0px 18px 0px",
              }}>
                <img src={HERO_IMG} alt="Drain technician with camera inspection equipment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Floating stat card */}
              <div style={{
                position: "absolute",
                bottom: "24px",
                left: "-24px",
                backgroundColor: F.white,
                borderRadius: "20px",
                padding: "16px 20px",
                boxShadow: "rgba(0,0,0,0.06) 0px 0px 18px 0px",
                border: `1px solid ${F.pebbleGray}`,
                minWidth: "160px",
              }}>
                <div style={{ fontSize: "32px", fontWeight: 700, color: F.blue, lineHeight: 1 }}>55+</div>
                <div style={{ fontSize: "13px", color: F.steelGray, marginTop: "4px" }}>Years in Business</div>
              </div>
              {/* Floating badge top-right */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "-16px",
                backgroundColor: F.subtleBlue,
                borderRadius: "1600px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <Star size={13} fill={F.blue} style={{ color: F.blue }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>Free Camera Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ backgroundColor: F.white, borderTop: `1px solid ${F.pebbleGray}`, borderBottom: `1px solid ${F.pebbleGray}`, padding: "40px 0" }}>
        <div ref={statsRef} style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", textAlign: "center" }}>
            {[
              { value: 55, suffix: "+", label: "Years in Business" },
              { value: 20, suffix: "+", label: "Skilled Technicians" },
              { value: 20, suffix: "-Year", label: "Basement Warranty" },
              { value: 24, suffix: "/7", label: "Emergency Dispatch" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: "48px", fontWeight: 700, color: F.blue, lineHeight: 1.14, letterSpacing: "-0.48px", marginBottom: "6px" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: "14px", color: F.steelGray, fontWeight: 400 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="residential" style={{ padding: "96px 0", backgroundColor: F.white }}>
        <div ref={servicesRef} style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: F.subtleBlue,
              borderRadius: "1600px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>What We Do</span>
            </div>
            <h2 style={{ fontSize: "48px", fontWeight: 700, color: F.black, lineHeight: 1.14, letterSpacing: "-0.48px", marginBottom: "16px" }}>
              Our Services
            </h2>
            <p style={{ fontSize: "18px", color: F.steelGray, maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
              From free camera inspections to trenchless repairs - the expertise and equipment to solve any drain or sewer problem.
            </p>
          </div>

          {/* Tab Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div style={{ display: "flex", backgroundColor: "#f5f5f5", borderRadius: "1600px", padding: "4px", gap: "4px" }}>
              {(["residential", "commercial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 28px",
                    borderRadius: "1600px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    backgroundColor: activeTab === tab ? F.blue : "transparent",
                    color: activeTab === tab ? F.white : F.steelGray,
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div id="commercial" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {(activeTab === "residential" ? residentialServices : commercialServices).map((service, i) => (
              <div
                key={service.title}
                style={{
                  backgroundColor: F.white,
                  borderRadius: "12px",
                  padding: "24px",
                  border: `1px solid ${F.pebbleGray}`,
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = F.blue;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = F.pebbleGray;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "48px", height: "48px",
                  backgroundColor: i % 3 === 0 ? F.subtleBlue : i % 3 === 1 ? "#f0f4ff" : "#f5f0ff",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px",
                }}>
                  <service.icon size={22} style={{ color: F.blue }} />
                </div>

                {/* Tag */}
                <div style={{
                  display: "inline-flex",
                  backgroundColor: F.subtleBlue,
                  borderRadius: "1600px",
                  padding: "3px 10px",
                  marginBottom: "12px",
                }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: F.blue }}>{service.tag}</span>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 600, color: F.black, marginBottom: "10px", lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: "14px", color: F.steelGray, lineHeight: 1.6, marginBottom: "20px" }}>
                  {service.desc}
                </p>
                <a
                  href="tel:5194518342"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: F.blue, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = F.gradientViolet)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = F.blue)}
                >
                  Book this service <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED: TRENCHLESS ─── */}
      <section style={{ padding: "96px 0", backgroundColor: "#f8faff" }}>
        <div ref={featureRef} style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            {/* Left: Content */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: F.subtleBlue,
                borderRadius: "1600px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>Signature Technology</span>
              </div>
              <h2 style={{ fontSize: "48px", fontWeight: 700, color: F.black, lineHeight: 1.14, letterSpacing: "-0.48px", marginBottom: "20px" }}>
                No Dig.<br />No Mess.<br />No Problem.
              </h2>
              <p style={{ fontSize: "16px", color: F.steelGray, lineHeight: 1.7, marginBottom: "16px" }}>
                Our trenchless technology replaces underground pipe without disturbing any surface materials. No excavation of driveways or landscaping - saving you time, money, and the headache of restoration.
              </p>
              <p style={{ fontSize: "16px", color: F.steelGray, lineHeight: 1.7, marginBottom: "32px" }}>
                Our CIPP (Cured-In-Place Pipe) system creates a new pipe within the existing one. Most jobs are completed in a single day.
              </p>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                {[
                  "No excavation of driveways or landscaping",
                  "Completed in as little as one day",
                  "Suitable for residential and commercial pipes",
                  "Long-lasting, seamless pipe lining",
                ].map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: F.subtleBlue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={12} style={{ color: F.blue }} />
                    </div>
                    <span style={{ fontSize: "15px", color: F.charcoal }}>{point}</span>
                  </div>
                ))}
              </div>

              <a
                href="tel:5194518342"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: F.blue,
                  color: F.white,
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "16px 32px",
                  borderRadius: "1600px",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = F.gradientViolet)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = F.blue)}
              >
                <Phone size={16} />
                Get a Free Assessment
              </a>
            </div>

            {/* Right: Image with accent border card */}
            <div style={{ position: "relative" }} className="hidden md:block">
              <div style={{
                borderRadius: "32px",
                overflow: "hidden",
                border: `2px solid ${F.gradientViolet}`,
                aspectRatio: "4/3",
              }}>
                <img src={TRENCHLESS_IMG} alt="Trenchless pipe repair equipment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Floating card */}
              <div style={{
                position: "absolute",
                bottom: "32px",
                right: "-20px",
                backgroundColor: F.white,
                borderRadius: "20px",
                padding: "16px 20px",
                border: `1px solid ${F.pebbleGray}`,
                boxShadow: "rgba(0,0,0,0.06) 0px 0px 18px 0px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: F.subtleBlue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Wrench size={18} style={{ color: F.blue }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: F.black }}>Done in 1 Day</div>
                    <div style={{ fontSize: "12px", color: F.steelGray }}>No excavation needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: "96px 0", backgroundColor: F.white }}>
        <div ref={aboutRef} style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            {/* Left: Images */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="hidden md:grid">
              <div style={{ gridColumn: "span 2", borderRadius: "20px", overflow: "hidden", aspectRatio: "16/7" }}>
                <img src={TEAM_IMG} alt="Discount Drain team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "1" }}>
                <img src={CAMERA_IMG} alt="Camera inspection device" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Stats card */}
              <div style={{
                borderRadius: "20px",
                backgroundColor: F.blue,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                aspectRatio: "1",
              }}>
                <div style={{ fontSize: "48px", fontWeight: 700, color: F.white, lineHeight: 1 }}>20+</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginTop: "8px" }}>Skilled technicians on our team</div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: F.subtleBlue,
                borderRadius: "1600px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>Family-Owned Since 1970</span>
              </div>
              <h2 style={{ fontSize: "48px", fontWeight: 700, color: F.black, lineHeight: 1.14, letterSpacing: "-0.48px", marginBottom: "20px" }}>
                London's Drain Specialists
              </h2>
              <p style={{ fontSize: "16px", color: F.steelGray, lineHeight: 1.7, marginBottom: "16px" }}>
                We are family owned and operated since 1970 when Herman Marche set out to assist London residents and business owners with their sewer, drainage, and plumbing problems. In 1991, his son Barry took over ownership.
              </p>
              <p style={{ fontSize: "16px", color: F.steelGray, lineHeight: 1.7, marginBottom: "32px" }}>
                With over 20 employees, our professional team is friendly, highly trained in safety and certified in industry-specific instruction. We are WSIB compliant and fully insured.
              </p>

              {/* Trust grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
                {[
                  { icon: Shield, label: "WSIB Compliant" },
                  { icon: CheckCircle2, label: "Fully Insured" },
                  { icon: Star, label: "BBB Accredited" },
                  { icon: Clock, label: "24/7 Emergency" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${F.pebbleGray}` }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: F.subtleBlue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} style={{ color: F.blue }} />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: F.charcoal }}>{label}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: F.black,
                  color: F.white,
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "16px 32px",
                  borderRadius: "1600px",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = F.black)}
              >
                Meet Our Team <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "96px 0", backgroundColor: "#f8faff" }}>
        <div ref={testimonialsRef} style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: F.subtleBlue,
              borderRadius: "1600px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>Customer Stories</span>
            </div>
            <h2 style={{ fontSize: "48px", fontWeight: 700, color: F.black, lineHeight: 1.14, letterSpacing: "-0.48px", marginBottom: "12px" }}>
              What Our Customers Say
            </h2>
            <p style={{ fontSize: "18px", color: F.steelGray, maxWidth: "480px", margin: "0 auto" }}>
              Trusted by homeowners and businesses across London and Southwestern Ontario.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  backgroundColor: F.white,
                  borderRadius: "20px",
                  padding: "32px",
                  border: `1px solid ${F.pebbleGray}`,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = F.blue)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = F.pebbleGray)}
              >
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill={F.blue} style={{ color: F.blue }} />
                  ))}
                </div>
                <p style={{ fontSize: "15px", color: F.charcoal, lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: F.subtleBlue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: F.blue }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: F.black }}>{t.name}</div>
                    <div style={{ fontSize: "13px", color: F.steelGray }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" style={{ padding: "96px 0", backgroundColor: F.white, position: "relative", overflow: "hidden" }}>
        {/* Background blob */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "400px",
          background: "radial-gradient(ellipse, rgba(197,224,251,0.5) 0%, rgba(152,202,252,0.2) 50%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <div ref={ctaRef} style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: F.subtleBlue,
            borderRadius: "1600px",
            padding: "6px 16px",
            marginBottom: "24px",
          }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: F.blue }}>Ready to get started?</span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, color: F.black, lineHeight: 1.09, letterSpacing: "-0.48px", marginBottom: "20px" }}>
            Solve Your Drain Problem Today
          </h2>
          <p style={{ fontSize: "18px", color: F.steelGray, lineHeight: 1.6, maxWidth: "520px", margin: "0 auto 40px" }}>
            Call today and get your free sewer video camera inspection - a $400 value, on us. Available 24/7 for emergencies.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:5194518342"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: F.blue,
                color: F.white,
                fontSize: "16px",
                fontWeight: 600,
                padding: "18px 36px",
                borderRadius: "1600px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = F.gradientViolet)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = F.blue)}
            >
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <a
              href="mailto:office@discountdrain.ca"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: F.white,
                color: F.black,
                fontSize: "16px",
                fontWeight: 500,
                padding: "18px 32px",
                borderRadius: "1600px",
                textDecoration: "none",
                border: `1px solid ${F.pebbleGray}`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = F.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = F.pebbleGray)}
            >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ backgroundColor: F.black, padding: "64px 0 32px" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "64px", marginBottom: "48px" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", backgroundColor: F.blue, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Droplets size={18} style={{ color: F.white }} />
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: F.white }}>Discount Drain</div>
                  <div style={{ fontSize: "11px", color: F.steelGray }}>Est. 1970</div>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: F.steelGray, lineHeight: 1.6, maxWidth: "280px", marginBottom: "24px" }}>
                Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: F.steelGray, transition: "background-color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = F.blue; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: F.white, marginBottom: "20px', letterSpacing: '0.04em', textTransform: 'uppercase" }}>Services</h4>
              {["Free Camera Inspection", "Trenchless Systems", "Sewer Repair", "Wet Basements", "Drain Cleaning", "Excavating"].map((s) => (
                <a key={s} href="#services" style={{ display: "block", fontSize: "14px", color: F.steelGray, textDecoration: "none", marginBottom: "10px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = F.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = F.steelGray)}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: F.white, marginBottom: "20px" }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { icon: Phone, text: "519-451-8342", href: "tel:5194518342" },
                  { icon: Mail, text: "office@discountdrain.ca", href: "mailto:office@discountdrain.ca" },
                  { icon: MapPin, text: "London & Southwestern Ontario", href: undefined },
                  { icon: Clock, text: "24/7 Emergency Service", href: undefined },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <Icon size={14} style={{ color: F.blue, marginTop: "2px", flexShrink: 0 }} />
                    {href ? (
                      <a href={href} style={{ fontSize: "14px", color: F.steelGray, textDecoration: "none" }}>{text}</a>
                    ) : (
                      <span style={{ fontSize: "14px", color: F.steelGray }}>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
              © 2024 Discount Drain. All rights reserved. Est. 1970.
            </p>
            <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
