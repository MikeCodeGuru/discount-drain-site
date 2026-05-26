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
  ArrowDown,
  ChevronRight,
  Clock,
  Award,
  Users,
  Send,
} from "lucide-react";
import DDLayout from "./DDLayout";
import { getAllServices, getFeaturedServices } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { usePrefetchRoutes } from "@/hooks/usePrefetchRoutes";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";
import ScrollDepthBanner from "@/components/dd/ScrollDepthBanner";
import ReviewMarquee from "@/components/dd/ReviewMarquee";
import { MapView } from "@/components/Map";

const HERO_VIDEO = "/manus-storage/hero-bg-v4_6eb1cf8f.mp4";
const HERO_FALLBACK = "/manus-storage/dd-hero-drain_7551245e.jpg";
const TRENCHLESS_IMG = "/manus-storage/trenchless-liner-2_62207afb.jpg";
const CAMERA_IMG = "/manus-storage/sewer-camera_39c33547.jpg";
const BASEMENT_IMG = "/manus-storage/wet-basement-1_5eff930f.jpeg";
const EXCAVATION_IMG = "/manus-storage/sewer-repair-1_b9db9364.jpeg";

function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.body.classList.add("js-scroll-ready");
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px 100px 0px" }
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

// ─── Staggered stat tile for the Stats strip ────────────────────────────────
function StatTile({
  value, suffix, label,
  icon: Icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon size={24} style={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px" }} />
      <div className="text-white font-extrabold" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1, marginBottom: "6px" }}>
        <Counter target={value} suffix={suffix} />
      </div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Staggered testimonial card ─────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: { id: number; name: string; location: string | null; body: string; rating: number };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
  return (
    <div
      ref={ref}
      className="testimonial-card fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#0080ff" style={{ color: "#0080ff" }} />
        ))}
      </div>
      <p style={{ color: "#222222", fontSize: "15px", lineHeight: "26px", marginBottom: "20px", fontStyle: "italic" }}>
        "{testimonial.body}"
      </p>
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{testimonial.name}</div>
        <div style={{ color: "#8c9baa", fontSize: "13px" }}>{testimonial.location}</div>
      </div>
    </div>
  );
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
    <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
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

// ─── Trust items data ─────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    icon: Camera,
    title: "Free $400 Camera Inspection",
    desc: "We show you exactly what is wrong before any work begins. No guesswork, no surprises.",
  },
  {
    icon: Shield,
    title: "20-Year Basement Warranty",
    desc: "Our wet basement waterproofing is backed by one of the longest warranties in the industry.",
  },
  {
    icon: Clock,
    title: "Same-Day Emergency Dispatch",
    desc: "We answer the phone 24 hours a day, 7 days a week and dispatch the same day.",
  },
  {
    icon: Award,
    title: "55 Years Family-Owned",
    desc: "Serving London and Southwestern Ontario since 1970. Three generations of trusted service.",
  },
  {
    icon: CheckCircle2,
    title: "WSIB and Fully Insured",
    desc: "All technicians are certified, WSIB-covered, and fully insured for your peace of mind.",
  },
];

const MINI_FORM_SERVICES = [
  "Drain Cleaning",
  "Sewer Camera Inspection",
  "Trenchless Pipe Repair",
  "Wet Basement / Waterproofing",
  "Sewer Repair or Installation",
  "Excavation Services",
  "Catch Basin Cleaning",
  "Septic Service",
  "Emergency Service",
  "Not Sure / Other",
];

function TrustFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, service: false });

  // Validation helpers
  const validateName = (v: string) => v.trim().length >= 2;
  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 7;
  const validateService = (v: string) => v !== "";

  const errors = {
    name: touched.name && !validateName(form.name) ? "Please enter your full name." : "",
    phone: touched.phone && !validatePhone(form.phone) ? "Please enter a valid phone number." : "",
    service: touched.service && !validateService(form.service) ? "Please select a service." : "",
  };

  const fieldBorder = (field: "name" | "phone" | "service") => {
    if (!touched[field]) return "1.5px solid #e5e7eb";
    if (errors[field]) return "1.5px solid #EF4444";
    return "1.5px solid #22C55E";
  };

  const touch = (field: "name" | "phone" | "service") =>
    setTouched(t => ({ ...t, [field]: true }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setTrustVisible(true), 80);
          setTimeout(() => setFormVisible(true), 260);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched to reveal any errors
    setTouched({ name: true, phone: true, service: true });
    if (!validateName(form.name) || !validatePhone(form.phone) || !validateService(form.service)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 800);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Trust grid */}
          <div>
            <div className="eyebrow mb-4" style={{ color: "#0080ff" }}>Why Choose Us</div>
            <h2
              className="mb-3"
              style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              London's Most Trusted Drain Specialists
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", lineHeight: "26px", marginBottom: "36px" }}>
              Family-owned since 1970. We back every job with industry-leading warranties and show up when you need us most.
            </p>

            <div className="flex flex-col gap-5">
              {TRUST_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="trust-item-cascade"
                    style={{
                      opacity: trustVisible ? 1 : 0,
                      transform: trustVisible ? "translateX(0)" : "translateX(-32px)",
                      transition: `opacity 0.5s ease ${idx * 90}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${idx * 90}ms`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(0,128,255,0.1)" }}
                    >
                      <Icon size={20} style={{ color: "#0080ff" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "15px", color: "#111111", marginBottom: "3px" }}>{item.title}</div>
                      <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: "22px" }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Mini lead-capture form */}
          <div
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateX(0) scale(1)" : "translateX(40px) scale(0.97)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            {/* Success Modal Overlay */}
            {showSuccessModal && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 10000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(4px)",
                  padding: "24px",
                  animation: "fadeIn 0.25s ease",
                }}
                onClick={() => setShowSuccessModal(false)}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "48px 40px",
                    maxWidth: "440px",
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                    animation: "slideUp 0.35s cubic-bezier(0.22,1,0.36,1)",
                    position: "relative",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    aria-label="Close"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "#F3F4F6",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#6B7280",
                      fontSize: "18px",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>

                  {/* Animated checkmark circle */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
                      animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.15s both",
                    }}
                  >
                    <CheckCircle2 size={38} color="#ffffff" strokeWidth={2.5} />
                  </div>

                  <h3 style={{ fontWeight: 800, fontSize: "24px", color: "#111111", marginBottom: "12px", lineHeight: 1.2 }}>
                    Request Received!
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: "24px", marginBottom: "8px" }}>
                    Thank you, <strong style={{ color: "#111111" }}>{form.name.split(" ")[0]}</strong>. We will call you back within the hour.
                  </p>
                  <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "22px", marginBottom: "28px" }}>
                    For urgent issues, call us directly at{" "}
                    <a href="tel:5194518342" style={{ color: "#0080ff", fontWeight: 600 }}>519-451-8342</a>.
                  </p>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "#F3F4F6", marginBottom: "20px" }} />

                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                      href="tel:5194518342"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: "#0080ff",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={14} />
                      Call Now
                    </a>
                    <button
                      onClick={() => setShowSuccessModal(false)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "1.5px solid #E5E7EB",
                        background: "transparent",
                        color: "#374151",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="service-card-v2"
              style={{ padding: "36px", borderRadius: "20px", background: "#ffffff", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
            >
              {true && (
                <>
                  <h3 style={{ fontWeight: 800, fontSize: "22px", color: "#111111", marginBottom: "6px" }}>Get a Free Quote</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>No obligation. We call you back within the hour.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={e => { setForm(f => ({ ...f, name: e.target.value })); touch("name"); }}
                        onBlur={() => touch("name")}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: "10px",
                          border: fieldBorder("name"), fontSize: "15px", outline: "none",
                          transition: "border-color 0.2s",
                        }}
                      />
                      {errors.name && <p style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="519-555-0100"
                        value={form.phone}
                        onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); touch("phone"); }}
                        onBlur={() => touch("phone")}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: "10px",
                          border: fieldBorder("phone"), fontSize: "15px", outline: "none",
                          transition: "border-color 0.2s",
                        }}
                      />
                      {errors.phone && <p style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px" }}>{errors.phone}</p>}
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Service Needed *</label>
                      <select
                        value={form.service}
                        onChange={e => { setForm(f => ({ ...f, service: e.target.value })); touch("service"); }}
                        onBlur={() => touch("service")}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: "10px",
                          border: fieldBorder("service"), fontSize: "15px", outline: "none",
                          background: "#fff", color: form.service ? "#111111" : "#9ca3af",
                          transition: "border-color 0.2s", appearance: "none",
                        }}
                      >
                        <option value="" disabled>Select a service...</option>
                        {MINI_FORM_SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && <p style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px" }}>{errors.service}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        marginTop: "4px",
                        width: "100%", padding: "14px", borderRadius: "10px",
                        background: isSubmitting ? "#6b9fd4" : "#0080ff",
                        color: "#ffffff", fontWeight: 700, fontSize: "15px",
                        border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        transition: "background 0.2s, transform 0.15s",
                      }}
                      onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = "#0060d0"; }}
                      onMouseLeave={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = "#0080ff"; }}
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          Request a Free Quote
                        </>
                      )}
                    </button>

                    <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>
                      We call back within the hour. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Social proof micro-copy below form */}
            <div className="flex items-center gap-3 mt-4 justify-center">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} style={{ color: "#0080ff", fill: "#0080ff" }} />
                ))}
              </div>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Rated 5.0 by 200+ London homeowners</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── How It Works section ──────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    number: "01",
    title: "Call or Request a Quote",
    desc: "Reach us by phone or fill out the form above. We pick up 24/7 and respond to online requests within the hour.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Free Camera Inspection",
    desc: "A certified technician arrives and performs a live sewer video inspection at no charge. You see the problem on screen before we do anything.",
    icon: Camera,
  },
  {
    number: "03",
    title: "Problem Solved, Guaranteed",
    desc: "We fix the issue using the right method for your situation. Every job is backed by our workmanship guarantee and up to a 20-year warranty.",
    icon: CheckCircle2,
  },
];

function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [stepsVisible, setStepsVisible] = useState<boolean[]>([false, false, false]);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each step in
          [0, 1, 2].forEach(i => {
            setTimeout(() => {
              setStepsVisible(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 200);
          });
          // Draw the connector line
          setTimeout(() => setLineWidth(100), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden" style={{ backgroundColor: "#f5f7fa" }}
    >
      <div className="container">
        <div className="text-center mb-14">
          <div className="eyebrow mx-auto mb-4" style={{ color: "#0080ff" }}>Simple Process</div>
          <h2
            style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", marginBottom: "12px" }}
          >
            How It Works
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "460px", margin: "0 auto", fontSize: "16px", lineHeight: "26px" }}>
            Getting your drain or sewer fixed is straightforward. Here is what to expect from your first call to the final fix.
          </p>
        </div>

        {/* Roofex-style process cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10" style={{ columnGap: "56px", rowGap: "0" }} id="how-steps-grid" data-mobile-gap="true">
          {HOW_STEPS.map((step, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === HOW_STEPS.length - 1;
            // Stagger delay: 0ms, 150ms, 300ms — each card slides up from below
            const delay = idx * 150;
            return (
              <div
                key={idx}
                className="relative"
                style={{
                  opacity: stepsVisible[idx] ? 1 : 0,
                  transform: stepsVisible[idx] ? "translateY(0) scale(1)" : "translateY(44px) scale(0.97)",
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                  // Mobile: add bottom margin so cards have visible white space between them
                  paddingBottom: isLast ? 0 : undefined,
                }}
              >
                {/* Card */}
                <div
                  className="process-step-card"
                  style={{
                    background: "#F4F4EB",
                    borderRadius: isFirst ? "24px 10px 10px 24px" : "10px",
                    padding: "28px 20px 28px 16px",
                    height: "100%",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "flex-start" }}>
                    {/* Left: step number + dashed line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "40px" }}>
                      <span style={{
                        fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800,
                        color: "#0080ff",
                        lineHeight: 1,
                        fontFamily: "inherit",
                      }}>
                        {step.number}
                      </span>
                      <div style={{
                        width: "2px",
                        flex: 1,
                        minHeight: "48px",
                        borderLeft: "1.5px dashed rgba(17,19,35,0.18)",
                        marginTop: "10px",
                      }} />
                    </div>
                    {/* Right: title + desc */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontWeight: 700, fontSize: "clamp(15px, 3.5vw, 18px)", color: "#111111", marginBottom: "8px", lineHeight: "1.3" }}>
                        {step.title}
                      </h3>
                      <p style={{ color: "#6b7280", fontSize: "clamp(13px, 3vw, 14px)", lineHeight: "22px" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: right-arrow connector in the column gap */}
                {!isLast && (
                  <div
                    className="hidden md:flex items-center justify-center"
                    style={{
                      position: "absolute",
                      right: "-56px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#17171A",
                      zIndex: 10,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                      pointerEvents: "none",
                    }}
                  >
                    <ArrowRight size={22} style={{ color: "#ffffff" }} />
                  </div>
                )}

                {/* Mobile: down-arrow connector between stacked cards — 96px height gives clear gap */}
                {!isLast && (
                  <div
                    className="flex md:hidden items-center justify-center"
                    style={{
                      height: "96px",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#17171A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                    }}>
                      <ArrowDown size={20} style={{ color: "#ffffff" }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA below steps */}
        <div className="text-center mt-12">
          <a
            href="tel:5194518342"
            className="btn-blue"
            style={{ fontSize: "16px", padding: "16px 36px", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Phone size={16} />
            Call 519-451-8342 Now
          </a>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "12px" }}>Available 24/7 including weekends and holidays</p>
        </div>
      </div>
    </section>
  );
}

export default function DDHome() {
  // Prefetch the two most-visited next routes while the browser is idle
  usePrefetchRoutes(["/services", "/contact"]);

  const services = getAllServices();
  const testimonials = TESTIMONIALS;

  const heroRef = useScrollReveal();
  const heroVideoRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const trenchlessSectionRef = useScrollReveal<HTMLElement>();
  const trenchlessImageRef = useScrollReveal();
  const trenchlessRef = useScrollReveal();
  const aboutSectionRef = useScrollReveal<HTMLElement>();
  const testimonialsSectionRef = useScrollReveal<HTMLElement>();
  const testimonialsRef = useScrollReveal();
  const ctaSectionRef = useScrollReveal<HTMLElement>();
  const ctaRef = useScrollReveal();

  const featuredServices = getFeaturedServices();
  const displayServices = featuredServices.length > 0 ? featuredServices : services.slice(0, 6);

  return (
    <>
    <DDLayout>
      {/* SEO */}
      <title>Discount Drain | London Ontario Drain and Sewer Specialists Since 1970</title>
      <meta name="description" content="Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970. Free sewer video camera inspection with every service call. Available 24/7. Call 519-451-8342." />
      <meta name="keywords" content="drain cleaning London Ontario, sewer repair London ON, wet basement waterproofing, trenchless pipe repair, sewer camera inspection, Discount Drain, 24/7 emergency drain service, Southwestern Ontario drain specialist" />
      <link rel="canonical" href="https://discountdrain.ca/" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discountdrain.ca/" />
      <meta property="og:title" content="Discount Drain | London Ontario Drain and Sewer Specialists Since 1970" />
      <meta property="og:description" content="Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970. Free sewer video camera inspection with every service call. Available 24/7. Call 519-451-8342." />
      <meta property="og:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Discount Drain | London Ontario Drain and Sewer Specialists Since 1970" />
      <meta name="twitter:description" content="Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970. Free sewer video camera inspection with every service call. Available 24/7. Call 519-451-8342." />
      <meta name="twitter:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      {/* JSON-LD LocalBusiness */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Plumber",
        "name": "Discount Drain",
        "url": "https://discountdrain.ca",
        "logo": "https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg",
        "image": "https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg",
        "description": "Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970. Free sewer video camera inspection with every service call. Available 24/7.",
        "telephone": "+1-519-451-8342",
        "email": "office@discountdrain.ca",
        "foundingDate": "1970",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressRegion": "ON",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 42.9849,
          "longitude": -81.2453
        },
        "areaServed": [
          { "@type": "City", "name": "London", "addressRegion": "ON" },
          { "@type": "City", "name": "Strathroy", "addressRegion": "ON" },
          { "@type": "City", "name": "St. Thomas", "addressRegion": "ON" },
          { "@type": "City", "name": "Woodstock", "addressRegion": "ON" },
          { "@type": "City", "name": "Ingersoll", "addressRegion": "ON" },
          { "@type": "City", "name": "Tillsonburg", "addressRegion": "ON" },
          { "@type": "City", "name": "Aylmer", "addressRegion": "ON" },
          { "@type": "City", "name": "Exeter", "addressRegion": "ON" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Drain and Sewer Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Sewer Video Camera Inspection" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trenchless Pipe Repair" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wet Basement Waterproofing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drain Cleaning and Power Flushing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sewer Repair and Installation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Catch Basin Cleaning" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Septic Service and Repairs" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Machine Excavating" } }
          ]
        },
        "sameAs": [
          "https://www.facebook.com/discountdrain",
          "https://www.google.com/maps/search/Discount+Drain+London+Ontario"
        ]
      }) }} />

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

        {/* CSS-only particle layer — runs on GPU compositor, no JS rAF */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="p" />
          ))}
        </div>

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

              {/* Trust badge strip */}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {/* BBB Accredited */}
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  <img
                    src="/manus-storage/bbb-logo_3ded212f.png"
                    alt="BBB Accredited Business"
                    style={{ height: "28px", width: "auto", objectFit: "contain" }}
                  />
                  <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "10px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#6B7280", margin: 0, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.05em" }}>Accredited</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#1E3A5F", margin: 0, lineHeight: 1.2 }}>Business</p>
                  </div>
                </div>

                {/* WSIB Compliant */}
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  <img
                    src="/manus-storage/wsib-logo_7e6e0e32.png"
                    alt="WSIB Ontario"
                    style={{ height: "28px", width: "auto", objectFit: "contain" }}
                  />
                  <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "10px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#6B7280", margin: 0, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.05em" }}>Registered</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#1E3A5F", margin: 0, lineHeight: 1.2 }}>Compliant</p>
                  </div>
                </div>

                {/* Google 5-Star */}
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Google G mark in brand colours */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "10px" }}>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} fill="#FBBC05" color="#FBBC05" />
                      ))}
                    </div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#1E3A5F", margin: 0, lineHeight: 1.3 }}>Google Rated</p>
                  </div>
                </div>

                {/* Licensed & Insured */}
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  <Shield size={18} style={{ color: "#2563EB", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#6B7280", margin: 0, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.05em" }}>Licensed &amp;</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#1E3A5F", margin: 0, lineHeight: 1.2 }}>Fully Insured</p>
                  </div>
                </div>
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
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 55, suffix: "+", label: "Years in Business", icon: Award, delay: 0 },
              { value: 20, suffix: "+", label: "Skilled Technicians", icon: Users, delay: 75 },
              { value: 20, suffix: "-Year", label: "Basement Warranty", icon: Shield, delay: 150 },
              { value: 24, suffix: "/7", label: "Emergency Dispatch", icon: Clock, delay: 225 },
            ].map(({ value, suffix, label, icon: Icon, delay }) => (
              <StatTile key={label} value={value} suffix={suffix} label={label} icon={Icon} delay={delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US / ABOUT ─── */}
      <section ref={aboutSectionRef} className="py-20 section-entrance" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Content — slides in first (0ms) */}
            <div ref={statsRef} className="fade-in-up">
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
                    loading="lazy"
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
      <section ref={trenchlessSectionRef} className="py-20 overflow-hidden section-entrance" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image — appears first (0ms delay) */}
            <div ref={trenchlessImageRef} className="relative fade-in-up">
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

            {/* Content — slides in after image (150ms delay) */}
            <div ref={trenchlessRef} className="fade-in-up" style={{ transitionDelay: "150ms" }}>
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

      {/* ─── TRUST + LEAD CAPTURE ─── */}
      <TrustFormSection />

      {/* ─── HOW IT WORKS ─── */}
      <HowItWorksSection />

      {/* ─── REVIEW MARQUEE ─── */}
      <ReviewMarquee />

      {/* ─── SERVICE AREA MAP TEASER ─── */}
      <ServiceAreaTeaser />

      {/* ─── CTA SECTION ─── */}
      <section
        ref={ctaSectionRef}
        className="relative py-24 overflow-hidden section-entrance"
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
    <ScrollDepthBanner />
    </>
  );
}
