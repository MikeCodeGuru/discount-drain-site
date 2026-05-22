import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Camera, Wrench, Droplets, Building2, Shield, CheckCircle2, ArrowRight, Star } from "lucide-react";
import DDLayout from "./DDLayout";
import { TESTIMONIALS } from "@/data/testimonials";

const HERO_IMG = "/manus-storage/sewer-repair-1_b9db9364.jpeg";

function useScrollReveal() {
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
  return ref;
}

const commercialServices = [
  { icon: Camera, title: "Sewer Video Camera Inspections", desc: "Commercial-grade video inspection to diagnose sewer and drain problems quickly, accurately, and with minimal disruption to your operations.", slug: "sewer-camera-inspection" },
  { icon: Building2, title: "Municipal Services", desc: "From sewer lining to manhole restoration and water main repair, we deliver effective solutions for all municipal drainage needs.", slug: "municipal-services" },
  { icon: Wrench, title: "Trenchless Systems", desc: "Replace underground pipe without disturbing any surface materials. Minimal disruption to your business, parking lot, or landscaping.", slug: "trenchless-pipe-repair" },
  { icon: Droplets, title: "Catch Basin Cleaning", desc: "We solve catch basin problems quickly and professionally using the latest technology. Affordable and effective for any commercial property.", slug: "catch-basin-cleaning" },
  { icon: Wrench, title: "Sewer Repair and Installation", desc: "Highly trained technicians working to solve commercial sewer and drain problems using the latest products and methods.", slug: "sewer-repair-installation" },
  { icon: Shield, title: "Septic Service", desc: "Preventative maintenance and a full service line of repairs and replacements on septic beds and sewers for commercial and rural properties.", slug: "septic-repairs" },
];

export default function DDCommercial() {
  const testimonials = TESTIMONIALS;
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  return (
    <DDLayout>
      <title>Commercial Drain and Sewer Services | London Ontario | Discount Drain</title>
      <meta name="description" content="Commercial drain cleaning, sewer repair, catch basin cleaning, and municipal services in London Ontario. Minimal disruption to your business. Call 519-451-8342." />
      <meta name="keywords" content="commercial drain cleaning London Ontario, commercial sewer repair London ON, catch basin cleaning, municipal sewer services Ontario, industrial drain contractor, trenchless commercial pipe repair" />
      <link rel="canonical" href="https://discountdrain.ca/commercial" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discountdrain.ca/commercial" />
      <meta property="og:title" content="Commercial Drain and Sewer Services | London Ontario | Discount Drain" />
      <meta property="og:description" content="Commercial drain cleaning, sewer repair, catch basin cleaning, and municipal services in London Ontario. Minimal disruption to your business. Call 519-451-8342." />
      <meta property="og:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Commercial Drain and Sewer Services | London Ontario | Discount Drain" />
      <meta name="twitter:description" content="Commercial drain cleaning, sewer repair, catch basin cleaning, and municipal services in London Ontario. Minimal disruption to your business. Call 519-451-8342." />
      <meta name="twitter:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />

      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ minHeight: "420px", backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative container" style={{ zIndex: 2 }}>
          <div className="eyebrow mb-4" style={{ color: "#60b3ff", backgroundColor: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.3)" }}>
            For Businesses
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Commercial Drain and Sewer Services
          </h1>
          <p className="text-white/80 mb-8" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Keeping your business running is our priority. We work efficiently to minimize downtime and disruption on every commercial job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:5194518342" className="btn-primary">
              <Phone size={15} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-white">
              Get a Commercial Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div ref={ref1} className="fade-in-up container">
          <div className="text-center mb-14">
            <div className="eyebrow mx-auto mb-4">Commercial Services</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#111111", marginBottom: "12px" }}>
              What We Do for Businesses
            </h2>
            <p style={{ color: "#8c9baa", maxWidth: "520px", margin: "0 auto", fontSize: "17px", lineHeight: "28px" }}>
              From restaurants and retail to municipalities and industrial facilities, we have the equipment and experience to handle any commercial drain or sewer job.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="service-card-v2 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-5 rounded-2xl" style={{ width: "52px", height: "52px", backgroundColor: "#e8f3ff" }}>
                    <Icon size={22} style={{ color: "#0080ff" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "10px", lineHeight: "1.3" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "#8c9baa", fontSize: "15px", lineHeight: "24px", flex: 1 }}>
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: "#0080ff" }}>
                    <Link href={`/services/${service.slug}`} style={{ color: "#0080ff", textDecoration: "none" }}>Learn More</Link>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div ref={ref2} className="fade-in-up">
              <div className="eyebrow mb-4">The Commercial Advantage</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                Minimal Disruption, Maximum Reliability
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                We understand that every hour of downtime costs your business money. Our team works quickly, cleanly, and professionally to get your drains and sewers back in service as fast as possible.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                With over 55 years of experience and a full fleet of commercial-grade equipment, we handle jobs of any size, from a single clogged drain to a full municipal sewer replacement.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "24/7 emergency response for commercial clients",
                  "Full fleet including vac trucks, excavators, and service vans",
                  "WSIB compliant and fully insured on every job",
                  "Trenchless options to minimize surface disruption",
                  "Serving London and all of Southwestern Ontario",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#222222", fontSize: "15px" }}>{point}</span>
                  </div>
                ))}
              </div>
              <a href="tel:5194518342" className="btn-primary">
                <Phone size={15} />
                Call 519-451-8342
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "55+", label: "Years of Experience", color: "#0080ff" },
                { value: "20+", label: "Skilled Technicians", color: "#0060d0" },
                { value: "24/7", label: "Emergency Response", color: "#0080ff" },
                { value: "100%", label: "Insured and WSIB", color: "#0060d0" },
              ].map(({ value, label, color }) => (
                <div key={label} className="service-card-v2 text-center">
                  <div style={{ fontSize: "42px", fontWeight: 800, color, lineHeight: 1, marginBottom: "8px" }}>{value}</div>
                  <div style={{ color: "#8c9baa", fontSize: "14px", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111111", marginBottom: "32px", textAlign: "center" }}>
              Trusted by Businesses Across Southwestern Ontario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="testimonial-card">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#0080ff" style={{ color: "#0080ff" }} />
                    ))}
                  </div>
                  <p style={{ color: "#222222", fontSize: "14px", lineHeight: "24px", marginBottom: "16px", fontStyle: "italic" }}>
                    "{t.body}"
                  </p>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#111111" }}>{t.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "12px" }}>{t.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>
            Need Commercial Drain Service in London?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: "30px" }}>
            Call us today. We respond fast, work clean, and get your business back to normal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "16px 32px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "16px 32px" }}>
              Get a Commercial Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
