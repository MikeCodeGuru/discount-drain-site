/*
 * DESIGN: Contek "Trusted Since 1970" — Warm Authority
 * Charcoal #3F4049 | Gold #FEDA86 | Off-White #F9F7F0
 * Taviraj serif headings | Inter Tight body/UI
 * 0px border-radius buttons | 4px card radius
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
} from "lucide-react";

// Image URLs from generated assets
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/hero-drain-7Qr6hJCJVsmcjoSkPJtcfU.webp";
const TRENCHLESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/trenchless-tech-aq27wqzhBVwtJcMqn5vyp6.webp";
const CAMERA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp";
const BASEMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/wet-basement-KCdDkXrFxEYTLvyifn5MV5.webp";
const EXCAVATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/excavation-truck-hn3hyopRK6GMkwRppqE9JE.webp";

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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

const residentialServices = [
  {
    icon: Camera,
    title: "Free Sewer Video Camera Inspections",
    desc: "Don't just clean your sewer line — see it. We show you your sewer line on the spot, in minutes. A $400 value, absolutely free.",
    img: CAMERA_IMG,
  },
  {
    icon: Wrench,
    title: "No Dig — Trenchless Systems",
    desc: "Stop! Don't go digging up your driveway or landscaping. Our no-dig trenchless technology saves you time and money.",
    img: TRENCHLESS_IMG,
  },
  {
    icon: Droplets,
    title: "Wet Basements",
    desc: "We fix wet and leaky basements permanently — backed by a 20-year warranty. Call our 24-hour Emergency Dispatch.",
    img: BASEMENT_IMG,
  },
  {
    icon: Wrench,
    title: "Sewer Repair & Installation",
    desc: "Our team of highly skilled and certified technicians solve your sewer and drain problems quickly and professionally.",
    img: EXCAVATION_IMG,
  },
  {
    icon: Droplets,
    title: "Drain Cleaning & Power Flushing",
    desc: "Proper maintenance prevents clogging. We use the latest technology to keep your drains flowing simply and affordably.",
    img: CAMERA_IMG,
  },
  {
    icon: Truck,
    title: "Dump Trucks & Machine Excavating",
    desc: "From deep excavations to parking lot preparation and pool installation — our fleet handles any excavation project.",
    img: EXCAVATION_IMG,
  },
];

const commercialServices = [
  {
    icon: Camera,
    title: "Sewer Video Camera Inspections",
    desc: "Commercial-grade video inspection to diagnose sewer and drain problems quickly and professionally.",
  },
  {
    icon: Building2,
    title: "Municipal Services",
    desc: "From sewer lining to manhole restoration and water main repair — effective solutions for all municipal drainage needs.",
  },
  {
    icon: Wrench,
    title: "No Dig — Trenchless Systems",
    desc: "Replace underground pipe without disturbing any surface materials. Minimal disruption to your business operations.",
  },
  {
    icon: Droplets,
    title: "Catch Basin Cleaning",
    desc: "We solve catch basin problems quickly and professionally using the latest technology — affordable and effective.",
  },
  {
    icon: Wrench,
    title: "Sewer Repair & Installation",
    desc: "Highly trained technicians working to solve commercial sewer and drain problems using the latest products.",
  },
  {
    icon: Shield,
    title: "Septic Service",
    desc: "Preventative maintenance and a full service line of repairs and replacements on septic beds and sewers.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "London, ON",
    stars: 5,
    text: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong. Professional, honest, and the price was fair. Would absolutely recommend.",
  },
  {
    name: "James T.",
    location: "Strathroy, ON",
    stars: 5,
    text: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands. The team was incredibly professional and the job was done in one day.",
  },
  {
    name: "Linda K.",
    location: "St. Thomas, ON",
    stars: 5,
    text: "Had a wet basement for years. Discount Drain fixed it permanently with a 20-year warranty. Family-owned business that truly cares about their customers. Highly recommend.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  const heroRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>

      {/* ─── TOP BAR ─── */}
      <div style={{ backgroundColor: "#2A2A31" }} className="py-2 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0">
          <div className="flex items-center gap-6">
            <a href="tel:5194518342" className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#FEDA86", fontFamily: "'Inter Tight', sans-serif" }}>
              <Phone size={14} />
              <span className="font-medium">519-451-8342</span>
            </a>
            <a href="mailto:office@discountdrain.ca" className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#FFFFFF", fontFamily: "'Inter Tight', sans-serif" }}>
              <Mail size={14} />
              <span>office@discountdrain.ca</span>
            </a>
          </div>
          <div className="flex items-center gap-2" style={{ color: "#FEDA86" }}>
            <Clock size={14} />
            <span className="text-sm font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              24/7 Emergency Service Available
            </span>
          </div>
        </div>
      </div>

      {/* ─── ANNOUNCEMENT BAR ─── */}
      <div style={{ backgroundColor: "#FEDA86" }} className="py-3 px-4 text-center">
        <p className="text-sm font-medium" style={{ color: "#2A2A31", fontFamily: "'Inter Tight', sans-serif" }}>
          <strong>Free Sewer Video Camera Inspection</strong> — A $400 value, included with every service call.{" "}
          <a href="tel:5194518342" className="underline font-semibold" style={{ color: "#2A2A31" }}>
            Call Now →
          </a>
        </p>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav className="sticky top-0 z-50 bg-white" style={{ borderBottom: "1px solid #F7F6F3", height: "76px" }}>
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span style={{
                fontFamily: "'Taviraj', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#3F4049",
                letterSpacing: "-0.01em"
              }}>
                DISCOUNT
              </span>
              <span style={{
                fontFamily: "'Taviraj', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#FEDA86",
                letterSpacing: "-0.01em",
                lineHeight: "1"
              }}>
                DRAIN
              </span>
            </div>
            <div style={{ width: "1px", height: "32px", backgroundColor: "#F7F6F3" }} className="hidden sm:block" />
            <span className="hidden sm:block text-xs" style={{ color: "#535353", fontFamily: "'Inter Tight', sans-serif" }}>
              Est. 1970
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Residential", "Commercial", "About Us", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm transition-colors"
                style={{
                  color: "#3F4049",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1697C2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3F4049")}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a href="tel:5194518342" className="btn-gold hidden sm:inline-flex text-sm" style={{ padding: "12px 20px" }}>
              <Phone size={14} />
              Call Now
            </a>
            <button
              className="md:hidden p-2"
              style={{ color: "#3F4049" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white" style={{ borderTop: "1px solid #F7F6F3", borderBottom: "1px solid #F7F6F3" }}>
            <div className="container py-4 flex flex-col gap-1">
              {["Services", "Residential", "Commercial", "About Us", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="py-3 px-2 text-sm"
                  style={{ color: "#3F4049", fontFamily: "'Inter Tight', sans-serif", borderBottom: "1px solid #F7F6F3" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="tel:5194518342" className="btn-gold mt-3 justify-center" style={{ padding: "14px 20px" }}>
                <Phone size={14} />
                Call 519-451-8342
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="services"
        className="relative overflow-hidden"
        style={{ minHeight: "88vh", display: "flex", alignItems: "center" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.58)" }} />

        <div className="relative container py-20 md:py-28">
          <div ref={heroRef} className="fade-in-up max-w-2xl">
            <div className="section-label mb-5">London & Southwestern Ontario</div>
            <h1
              style={{
                fontFamily: "'Taviraj', Georgia, serif",
                fontSize: "clamp(40px, 6vw, 74px)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              London's Most Trusted Drain & Sewer Specialists
            </h1>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "18px",
                lineHeight: "28px",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "520px",
              }}
            >
              Family-owned and operated since 1970. We solve any drain and sewer problem — residential or commercial — with the latest technology and a 20-year warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5194518342" className="btn-gold" style={{ fontSize: "16px", padding: "18px 32px" }}>
                <Phone size={16} />
                Call 519-451-8342
              </a>
              <a href="#about-us" className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.6)", color: "#FFFFFF", padding: "18px 32px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                About Us
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                "BBB Accredited",
                "WSIB Compliant",
                "Fully Insured",
                "Free Camera Inspection",
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "rgba(254,218,134,0.15)",
                    border: "1px solid rgba(254,218,134,0.4)",
                    borderRadius: "4px",
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: "#FEDA86" }} />
                  <span style={{ color: "#FFFFFF", fontSize: "13px", fontFamily: "'Inter Tight', sans-serif" }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ backgroundColor: "#3F4049" }} className="py-12">
        <div ref={statsRef} className="fade-in-up container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 55, suffix: "+", label: "Years in Business" },
              { value: 20, suffix: "+", label: "Skilled Technicians" },
              { value: 20, suffix: "-Year", label: "Basement Warranty" },
              { value: 24, suffix: "/7", label: "Emergency Dispatch" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "'Taviraj', Georgia, serif",
                    fontSize: "clamp(36px, 5vw, 56px)",
                    fontWeight: 400,
                    color: "#FEDA86",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES TABS ─── */}
      <section id="residential" className="py-20" style={{ backgroundColor: "#F9F7F0" }}>
        <div ref={servicesRef} className="fade-in-up container">
          <div className="text-center mb-12">
            <div className="gold-rule mx-auto" />
            <h2
              style={{
                fontFamily: "'Taviraj', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 50px)",
                fontWeight: 400,
                color: "#3F4049",
                marginBottom: "16px",
              }}
            >
              Our Services
            </h2>
            <p style={{ color: "#535353", maxWidth: "520px", margin: "0 auto", fontFamily: "'Inter Tight', sans-serif" }}>
              From free camera inspections to trenchless repairs — we have the expertise and equipment to solve any drain or sewer problem.
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-10">
            <div
              className="flex"
              style={{ border: "1px solid #3F4049", borderRadius: "0px" }}
            >
              <button
                onClick={() => setActiveTab("residential")}
                className="px-8 py-3 text-sm font-medium transition-all"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  backgroundColor: activeTab === "residential" ? "#3F4049" : "transparent",
                  color: activeTab === "residential" ? "#FFFFFF" : "#3F4049",
                  borderRadius: "0px",
                  border: "none",
                }}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className="px-8 py-3 text-sm font-medium transition-all"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  backgroundColor: activeTab === "commercial" ? "#3F4049" : "transparent",
                  color: activeTab === "commercial" ? "#FFFFFF" : "#3F4049",
                  borderRadius: "0px",
                  border: "none",
                  borderLeft: "1px solid #3F4049",
                }}
              >
                Commercial
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="commercial">
            {(activeTab === "residential" ? residentialServices : commercialServices).map((service) => (
              <div
                key={service.title}
                className="service-card flex flex-col"
                style={{
                  cursor: "default",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #F7F6F3",
                  borderRadius: "4px",
                  padding: "28px 30px",
                  borderTop: "3px solid #FEDA86",
                }}
              >
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "#F9F7F0",
                    borderRadius: "4px",
                  }}
                >
                  <service.icon size={20} style={{ color: "#3F4049" }} />
                </div>

                <h3
                  style={{
                    fontFamily: "'Taviraj', Georgia, serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#3F4049",
                    marginBottom: "12px",
                    lineHeight: "1.3",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "15px",
                    color: "#535353",
                    lineHeight: "23px",
                    flex: 1,
                  }}
                >
                  {service.desc}
                </p>
                <a
                  href="tel:5194518342"
                  className="flex items-center gap-1 mt-4 text-sm font-medium transition-colors"
                  style={{ color: "#1697C2", fontFamily: "'Inter Tight', sans-serif", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3F4049")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1697C2")}
                >
                  Book This Service <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED SERVICE — TRENCHLESS ─── */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="w-full rounded"
                style={{
                  aspectRatio: "4/3",
                  backgroundImage: `url(${TRENCHLESS_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 card-dark"
                style={{ maxWidth: "220px" }}
              >
                <div style={{ color: "#FEDA86", fontSize: "13px", fontWeight: 500, marginBottom: "4px", fontFamily: "'Inter Tight', sans-serif" }}>
                  No Excavation Required
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontFamily: "'Inter Tight', sans-serif" }}>
                  Trenchless technology saves your driveway and landscaping.
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="gold-rule" />
              <div className="section-label mb-3">Signature Technology</div>
              <h2
                style={{
                  fontFamily: "'Taviraj', Georgia, serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  color: "#3F4049",
                  marginBottom: "20px",
                  lineHeight: "1.15",
                }}
              >
                No Dig — Trenchless Pipe Repair
              </h2>
              <p style={{ color: "#535353", lineHeight: "26px", marginBottom: "16px", fontFamily: "'Inter Tight', sans-serif" }}>
                Stop! Don't go digging up your driveway or landscaping. Our no-dig trenchless technology replaces underground pipe without disturbing any surface materials — saving you time, money, and the headache of restoration.
              </p>
              <p style={{ color: "#535353", lineHeight: "26px", marginBottom: "28px", fontFamily: "'Inter Tight', sans-serif" }}>
                Our CIPP (Cured-In-Place Pipe) system creates a new pipe within the existing one — no excavation, no mess, no weeks of disruption. Most jobs are completed in a single day.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "No excavation of driveways or landscaping",
                  "Completed in as little as one day",
                  "Suitable for residential and commercial pipes",
                  "Long-lasting, seamless pipe lining",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#FEDA86", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#3F4049", fontSize: "15px", fontFamily: "'Inter Tight', sans-serif" }}>{point}</span>
                  </div>
                ))}
              </div>
              <a href="tel:5194518342" className="btn-gold">
                <Phone size={16} />
                Get a Free Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about-us" className="py-20" style={{ backgroundColor: "#F9F7F0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={aboutRef} className="fade-in-up">
              <div className="gold-rule" />
              <div className="section-label mb-3">Family-Owned Since 1970</div>
              <h2
                style={{
                  fontFamily: "'Taviraj', Georgia, serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  color: "#3F4049",
                  marginBottom: "20px",
                  lineHeight: "1.15",
                }}
              >
                London's Drain & Sewer Specialists
              </h2>
              <p style={{ color: "#535353", lineHeight: "26px", marginBottom: "16px", fontFamily: "'Inter Tight', sans-serif" }}>
                We are family owned and operated since 1970 when Herman Marche set out to assist London residents and business owners with their sewer, drainage, and plumbing problems. In 1991, his son Barry took over ownership, and today we are London's finest sewer, septic and drainage repair, replace and install company.
              </p>
              <p style={{ color: "#535353", lineHeight: "26px", marginBottom: "28px", fontFamily: "'Inter Tight', sans-serif" }}>
                With over 20 employees, our professional team is friendly, highly trained in safety and certified in industry-specific instruction. We are WSIB compliant and fully insured. Our fleet includes three service vehicles, two dump trucks, three excavators, and a combination vac/power flushing sewer truck.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, label: "WSIB Compliant" },
                  { icon: CheckCircle2, label: "Fully Insured" },
                  { icon: Star, label: "BBB Accredited" },
                  { icon: Clock, label: "24/7 Emergency" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#FEDA86",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} style={{ color: "#2A2A31" }} />
                    </div>
                    <span style={{ fontSize: "14px", color: "#3F4049", fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-dark">
                Meet Our Team <ArrowRight size={16} />
              </a>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="col-span-2"
                style={{
                  aspectRatio: "16/7",
                  backgroundImage: `url(${HERO_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  aspectRatio: "1",
                  backgroundImage: `url(${CAMERA_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  aspectRatio: "1",
                  backgroundImage: `url(${EXCAVATION_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20" style={{ backgroundColor: "#3F4049" }}>
        <div ref={testimonialsRef} className="fade-in-up container">
          <div className="text-center mb-12">
            <div className="gold-rule mx-auto" />
            <h2
              style={{
                fontFamily: "'Taviraj', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              What Our Customers Say
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Inter Tight', sans-serif" }}>
              Trusted by homeowners and businesses across London & Southwestern Ontario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="service-card"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  padding: "28px 30px",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#FEDA86" style={{ color: "#FEDA86" }} />
                  ))}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "15px",
                    lineHeight: "24px",
                    marginBottom: "20px",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "14px", fontFamily: "'Inter Tight', sans-serif" }}>
                    {t.name}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontFamily: "'Inter Tight', sans-serif" }}>
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section
        id="contact"
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#2A2A31" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${BASEMENT_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(42,42,49,0.85)" }} />

        <div ref={ctaRef} className="fade-in-up relative container text-center">
          <div className="gold-rule mx-auto" />
          <h2
            style={{
              fontFamily: "'Taviraj', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 50px)",
              fontWeight: 400,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Ready to Solve Your Drain Problem?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "18px",
              maxWidth: "520px",
              margin: "0 auto 32px",
              fontFamily: "'Inter Tight', sans-serif",
              lineHeight: "28px",
            }}
          >
            Call today and get your free sewer video camera inspection — a $400 value, on us. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-gold" style={{ fontSize: "16px", padding: "18px 36px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <a href="mailto:office@discountdrain.ca" className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.5)", color: "#FFFFFF", padding: "18px 36px" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ backgroundColor: "#1A1A1F" }} className="pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex flex-col leading-none mb-4">
                <span style={{ fontFamily: "'Taviraj', Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#FFFFFF" }}>
                  DISCOUNT
                </span>
                <span style={{ fontFamily: "'Taviraj', Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#FEDA86", lineHeight: "1" }}>
                  DRAIN
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "22px", maxWidth: "280px", fontFamily: "'Inter Tight', sans-serif", marginBottom: "20px" }}>
                Family-owned drain and sewer specialists serving London & Southwestern Ontario since 1970.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center justify-center transition-colors"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderRadius: "4px",
                      color: "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEDA86"; (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#2A2A31"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; (e.currentTarget.querySelector("svg") as SVGElement).style.color = "rgba(255,255,255,0.6)"; }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: "'Taviraj', Georgia, serif", fontSize: "16px", color: "#FFFFFF", marginBottom: "16px", fontWeight: 500 }}>
                Services
              </h4>
              {["Free Camera Inspection", "Trenchless Systems", "Sewer Repair", "Wet Basements", "Drain Cleaning", "Excavating"].map((s) => (
                <a
                  key={s}
                  href="#services"
                  className="block mb-2 text-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter Tight', sans-serif", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FEDA86")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Taviraj', Georgia, serif", fontSize: "16px", color: "#FFFFFF", marginBottom: "16px", fontWeight: 500 }}>
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                <a href="tel:5194518342" className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter Tight', sans-serif", textDecoration: "none" }}>
                  <Phone size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#FEDA86" }} />
                  519-451-8342
                </a>
                <a href="mailto:office@discountdrain.ca" className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter Tight', sans-serif", textDecoration: "none" }}>
                  <Mail size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#FEDA86" }} />
                  office@discountdrain.ca
                </a>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter Tight', sans-serif" }}>
                  <MapPin size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#FEDA86" }} />
                  London & Southwestern Ontario
                </div>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter Tight', sans-serif" }}>
                  <Clock size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#FEDA86" }} />
                  24/7 Emergency Service
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }} className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "'Inter Tight', sans-serif" }}>
              © 2024 Discount Drain. All rights reserved. Est. 1970.
            </p>
            <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "'Inter Tight', sans-serif", textDecoration: "none" }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
