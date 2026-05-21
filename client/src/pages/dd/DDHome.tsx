import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import ScrollServicesSection from "@/components/dd/ScrollServicesSection";
import {
  Phone,
  Camera,
  Wrench,
  Droplets,
  Truck,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Clock,
  Award,
  Users,
} from "lucide-react";
import DDLayout from "./DDLayout";
import { trpc } from "@/lib/trpc";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";
import { MapView } from "@/components/Map";

const HERO_VIDEO = "/manus-storage/hero-bg-v4_6eb1cf8f.mp4";
const HERO_FALLBACK = "/manus-storage/dd-hero-drain_7551245e.jpg";
const TRENCHLESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-trenchless-S93Mm3avhZ8CR5CSuviEck.webp";
const CAMERA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-sewer-camera-fxX5uEXYMHW3AiBoSwi2aa.webp";
const BASEMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-wet-basement-FsuMvi3AAMgHsP38ad6WDp.webp";
const EXCAVATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-excavation-nJgwHt9PRg2kHnpUSugtnt.webp";

function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1600, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Camera, Wrench, Droplets, Truck, Shield,
};

const LONDON_CENTER = { lat: 42.9849, lng: -81.2453 };

const SERVICE_TOWNS_MINI = [
  { name: "London", lat: 42.9849, lng: -81.2453, primary: true },
  { name: "Strathroy", lat: 42.9581, lng: -81.6168, primary: false },
  { name: "St. Thomas", lat: 42.7759, lng: -81.1789, primary: false },
  { name: "Woodstock", lat: 43.1306, lng: -80.7465, primary: false },
  { name: "Ingersoll", lat: 43.0395, lng: -80.8836, primary: false },
  { name: "Tillsonburg", lat: 42.8597, lng: -80.7275, primary: false },
  { name: "Aylmer", lat: 42.7706, lng: -80.9842, primary: false },
  { name: "Exeter", lat: 43.3500, lng: -81.4833, primary: false },
  { name: "Dorchester", lat: 42.9833, lng: -81.0667, primary: false },
  { name: "Komoka", lat: 42.9667, lng: -81.4167, primary: false },
  { name: "Belmont", lat: 42.8833, lng: -81.0833, primary: false },
  { name: "Parkhill", lat: 43.1500, lng: -81.6833, primary: false },
];

function ServiceAreaTeaser() {
  const mapRef = useRef<google.maps.Map | null>(null);

  function handleMapReady(map: google.maps.Map) {
    mapRef.current = map;
    // Coverage circle
    new google.maps.Circle({
      map,
      center: LONDON_CENTER,
      radius: 80000,
      strokeColor: "#0080ff",
      strokeOpacity: 0.25,
      strokeWeight: 2,
      fillColor: "#0080ff",
      fillOpacity: 0.07,
    });
    // Town markers
    SERVICE_TOWNS_MINI.forEach((town) => {
      const pin = document.createElement("div");
      pin.style.cssText = `width:${town.primary ? 40 : 28}px;height:${town.primary ? 40 : 28}px;background:${town.primary ? "#0080ff" : "#fff"};border:${town.primary ? "3px solid #fff" : "2px solid #0080ff"};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.2);`;
      pin.innerHTML = `<svg width="${town.primary ? 18 : 12}" height="${town.primary ? 18 : 12}" viewBox="0 0 24 24" fill="${town.primary ? "#fff" : "#0080ff"}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: town.lat, lng: town.lng },
        title: town.name,
        content: pin,
      });
    });
  }

  return (
    <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow mb-4">Service Coverage</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Serving London and All of Southwestern Ontario
            </h2>
            <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "24px", fontSize: "16px" }}>
              Based in London, we dispatch to over 12 communities within an 80 km radius. From Strathroy in the west to Woodstock in the east, St. Thomas in the south to Exeter in the north, we come to you.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {SERVICE_TOWNS_MINI.map((t) => (
                <span key={t.name} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: t.primary ? "#0080ff" : "#e8f3ff", color: t.primary ? "#fff" : "#0060d0" }}>
                  {t.name}
                </span>
              ))}
            </div>
            <Link href="/service-area" className="btn-outline">
              View Full Service Area Map
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid #e8eaed" }}>
            <MapView
              initialCenter={LONDON_CENTER}
              initialZoom={9}
              onMapReady={handleMapReady}
              className="h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DDHome() {
  const { data: services } = trpc.services.list.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();

  const heroRef = useScrollReveal();
  const heroVideoRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const trenchlessSectionRef = useScrollReveal<HTMLElement>();
  const trenchlessRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const featuredServices = services?.filter((s) => s.featured) ?? [];
  const displayServices = featuredServices.length > 0 ? featuredServices : services?.slice(0, 6) ?? [];

  return (
    <DDLayout>
      {/* SEO */}
      <title>Discount Drain | London Ontario Drain and Sewer Specialists Since 1970</title>
      <meta name="description" content="Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970. Free sewer video camera inspection with every service call. Available 24/7. Call 519-451-8342." />
      <link rel="canonical" href="https://discountdrain.ca/site" />

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e8f3ff 0%, #f0f7ff 40%, #dbeeff 100%)",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Subtle decorative blobs */}
        <div className="absolute blob-bg" style={{ width: "500px", height: "500px", top: "-120px", left: "-180px", backgroundColor: "rgba(0,128,255,0.07)", zIndex: 0 }} />
        <div className="absolute blob-bg" style={{ width: "300px", height: "300px", bottom: "-80px", left: "30%", backgroundColor: "rgba(0,128,255,0.06)", zIndex: 0 }} />

        <div className="relative container py-10 md:py-14" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── LEFT: text content ── */}
            <div ref={heroRef} className="fade-in-up">
              <div
                className="eyebrow mb-5 inline-flex"
                style={{ color: "#0060d0", backgroundColor: "rgba(0,128,255,0.1)", border: "1px solid rgba(0,128,255,0.25)" }}
              >
                London's Drain Specialists Since 1970
              </div>
              <h1
                style={{
                  fontSize: "clamp(36px, 4.5vw, 64px)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "#0d1b2a",
                  marginBottom: "20px",
                }}
              >
                London's Most Trusted Drain and Sewer Specialists
              </h1>
              <p style={{ fontSize: "17px", lineHeight: "28px", color: "#4a5568", maxWidth: "480px", marginBottom: "32px" }}>
                Family-owned and operated since 1970. We solve any drain and sewer problem for homes and businesses across Southwestern Ontario, backed by a 20-year warranty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="tel:5194518342" className="btn-primary" style={{ fontSize: "16px", padding: "16px 28px" }}>
                  <Phone size={16} />
                  Call 519-451-8342
                </a>
                <button
                  className="btn-outline"
                  style={{ fontSize: "16px", padding: "16px 28px" }}
                  onClick={() => {
                    const el = document.getElementById("services-section");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Our Services
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {["BBB Accredited", "WSIB Compliant", "Fully Insured", "24/7 Emergency"].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #d0e4ff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    <CheckCircle2 size={13} style={{ color: "#0080ff" }} />
                    <span style={{ color: "#0d1b2a", fontSize: "13px", fontWeight: 500 }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: video card ── */}
            <div ref={heroVideoRef} className="slide-in-right relative flex justify-center lg:justify-end">
              {/* Main video card */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "100%",
                  maxWidth: "740px",
                  aspectRatio: "5/4",
                  borderRadius: "20px",
                  boxShadow: "0 24px 64px rgba(0,80,200,0.18), 0 4px 16px rgba(0,0,0,0.10)",
                  background: "#0d1b2a",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster={HERO_FALLBACK}
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>

                {/* Free Camera Inspection badge — top right */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "10px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Star size={14} fill="#0080ff" style={{ color: "#0080ff" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0d1b2a" }}>Free Camera Inspection</span>
                </div>

                {/* 55+ Years in Business stat — bottom left */}
                <div
                  className="absolute bottom-4 left-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.97)",
                    borderRadius: "12px",
                    padding: "14px 20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                    backdropFilter: "blur(8px)",
                    minWidth: "130px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#0080ff", lineHeight: 1 }}>55+</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>Years in Business</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ backgroundColor: "#0080ff" }} className="py-12">
        <div ref={statsRef} className="fade-in-up container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 55, suffix: "+", label: "Years in Business", icon: Award },
              { value: 20, suffix: "+", label: "Skilled Technicians", icon: Users },
              { value: 20, suffix: "-Year", label: "Basement Warranty", icon: Shield },
              { value: 24, suffix: "/7", label: "Emergency Dispatch", icon: Clock },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon size={24} style={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px" }} />
                <div className="text-white font-extrabold" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1, marginBottom: "6px" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US / ABOUT ─── */}
      <section className="py-20" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Content */}
            <div>
              <div className="eyebrow mb-4">Family-Owned Since 1970</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                London's Drain and Sewer Specialists
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                We are family owned and operated since 1970 when Herman Marche set out to help London residents and business owners with their sewer, drainage, and plumbing problems. In 1991, his son Barry took over ownership, and today we are London's finest sewer, septic, and drainage repair, replace, and install company.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                With over 20 employees, our professional team is friendly, highly trained in safety, and certified in industry-specific instruction. We are WSIB compliant and fully insured.
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
                      style={{ width: "40px", height: "40px", backgroundColor: "#e8f3ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    >
                      <Icon size={18} style={{ color: "#0080ff" }} />
                    </div>
                    <span style={{ fontSize: "14px", color: "#222222", fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-outline">
                Meet Our Team
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top wide image with DD logo overlay */}
              <div className="col-span-2 rounded-3xl overflow-hidden relative" style={{ aspectRatio: "16/7" }}>
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: `url(${CAMERA_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                {/* Discount Drain logo badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  }}
                >
                  <img
                    src="/manus-storage/Dd_blacklogo_71ca30a8.png"
                    alt="Discount Drain"
                    style={{ height: "44px", width: "auto", display: "block" }}
                  />
                </div>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1", backgroundImage: `url(${BASEMENT_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1", backgroundImage: `url(${EXCAVATION_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLL SERVICES SECTION ─── */}
      <ScrollServicesSection />

      {/* ─── TRENCHLESS FEATURE ─── */}
      <section ref={trenchlessSectionRef} className="py-20 overflow-hidden bg-white section-entrance">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="w-full rounded-3xl overflow-hidden"
                style={{ aspectRatio: "4/3", backgroundImage: `url(${TRENCHLESS_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)", maxWidth: "220px" }}
              >
                <div style={{ color: "#0080ff", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>No Excavation Required</div>
                <div style={{ color: "#8c9baa", fontSize: "13px" }}>Trenchless technology saves your driveway and landscaping.</div>
              </div>
            </div>

            {/* Content */}
            <div ref={trenchlessRef} className="fade-in-up">
              <div className="eyebrow mb-4">Signature Technology</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                No-Dig Trenchless Pipe Repair
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                Stop before you let anyone dig up your driveway or landscaping. Our trenchless technology replaces underground pipe from the inside out, with no excavation required.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                Our CIPP (Cured-In-Place Pipe) system creates a new pipe within the existing one. No excavation, no mess, no weeks of disruption. Most jobs are completed in a single day.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "No excavation of driveways or landscaping",
                  "Completed in as little as one day",
                  "Suitable for residential and commercial pipes",
                  "Long-lasting, seamless pipe lining",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#222222", fontSize: "15px" }}>{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/services/trenchless-pipe-repair" className="btn-primary">
                Learn About Trenchless
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-white">
        <div ref={testimonialsRef} className="fade-in-up container">
          <div className="text-center mb-14">
            <div className="eyebrow mx-auto mb-4">Customer Reviews</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#111111", marginBottom: "12px" }}>
              What Our Customers Say
            </h2>
            <p style={{ color: "#8c9baa", maxWidth: "480px", margin: "0 auto" }}>
              Trusted by homeowners and businesses across London and Southwestern Ontario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonials ?? []).slice(0, 3).map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#0080ff" style={{ color: "#0080ff" }} />
                  ))}
                </div>
                <p style={{ color: "#222222", fontSize: "15px", lineHeight: "26px", marginBottom: "20px", fontStyle: "italic" }}>
                  "{t.body}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{t.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "13px" }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOOGLE REVIEWS ─── */}
      <GoogleReviewsWidget variant="homepage" maxReviews={6} />

      {/* ─── SERVICE AREA MAP TEASER ─── */}
      <ServiceAreaTeaser />

      {/* ─── CTA SECTION ─── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 50%, #3298fe 100%)" }}
      >
        {/* Background blob */}
        <div className="absolute blob-bg" style={{ width: "500px", height: "500px", top: "-100px", right: "-100px", backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div className="absolute blob-bg" style={{ width: "400px", height: "400px", bottom: "-100px", left: "-80px", backgroundColor: "rgba(0,0,0,0.08)" }} />

        <div ref={ctaRef} className="fade-in-up relative container text-center" style={{ zIndex: 2 }}>
          <div className="eyebrow mx-auto mb-5" style={{ color: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
            Available 24/7
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Ready to Solve Your Drain Problem?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", maxWidth: "520px", margin: "0 auto 36px", lineHeight: "30px" }}>
            Call today and get your free sewer video camera inspection. A $400 value, included with every service call. We pick up 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "18px 36px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "18px 36px" }}>
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
