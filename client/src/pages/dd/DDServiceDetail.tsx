import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { Phone, CheckCircle2, ArrowRight, Star, Clock, Shield, ChevronDown } from "lucide-react";
import DDLayout from "./DDLayout";
import { trpc } from "@/lib/trpc";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";

const HERO_IMGS: Record<string, string> = {
  // Sewer camera inspection: technician using camera unit inside a drain
  "sewer-camera-inspection": "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
  // Trenchless pipe repair: underground pipe lining / no-dig technology
  "trenchless-pipe-repair": "/manus-storage/service-trenchless_20587538.jpg",
  // Wet basement waterproofing: basement wall being waterproofed
  "wet-basement-repair": "/manus-storage/service-wet-basement_3fc273eb.jpg",
  "wet-basement-waterproofing": "/manus-storage/service-wet-basement_3fc273eb.jpg",
  // Sewer repair & installation: crew working on sewer pipe in trench
  "sewer-repair-installation": "/manus-storage/service-sewer-repair_eef7e9e9.jpg",
  // Drain cleaning: high-pressure water jetting inside a drain
  "drain-cleaning": "/manus-storage/service-drain-cleaning_ce593909.jpg",
  // Excavation: CAT excavator at a residential job site
  "excavation-services": "/manus-storage/service-excavation_b7ce058d.jpg",
};

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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "#e8f3ff" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", lineHeight: "1.4", flex: 1 }}>{question}</h4>
        <ChevronDown
          size={18}
          style={{
            color: "#0080ff",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>
      {open && (
        <p style={{ color: "#555555", lineHeight: "26px", fontSize: "15px", paddingBottom: "16px" }}>{answer}</p>
      )}
    </div>
  );
}

export default function DDServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = trpc.services.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug && slug !== ":slug" }
  );
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  const heroImg = HERO_IMGS[slug ?? ""] ?? "/manus-storage/dd-hero-drain_7551245e.jpg";

  if (isLoading) {
    return (
      <DDLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </DDLayout>
    );
  }

  if (!service) {
    return (
      <DDLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center py-20">
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111111", marginBottom: "16px" }}>Service Not Found</h1>
          <p style={{ color: "#8c9baa", marginBottom: "24px" }}>The service you are looking for does not exist.</p>
          <Link href="/services" className="btn-primary">View All Services</Link>
        </div>
      </DDLayout>
    );
  }

  const benefits = service.benefits ? JSON.parse(service.benefits as string) : [];
  const faqs = service.faqs ? JSON.parse(service.faqs as string) : [];

  return (
    <DDLayout>
      <title>{service.metaTitle ?? service.title} | Discount Drain | London Ontario</title>
      {service.metaDesc && <meta name="description" content={service.metaDesc} />}

      {/* Structured Data - Service */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.shortDesc,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Discount Drain",
          "telephone": "+15194518342",
          "address": { "@type": "PostalAddress", "addressLocality": "London", "addressRegion": "ON", "addressCountry": "CA" }
        },
        "areaServed": "London, Ontario"
      })}} />

      {/* Structured Data - FAQPage */}
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}} />
      )}

      {/* Page Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ minHeight: "420px", backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative container" style={{ zIndex: 2 }}>
          <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/services" style={{ color: "#60b3ff", textDecoration: "none" }}>Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {service.title}
          </h1>
          <p className="text-white/80 mb-8" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            {service.shortDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:5194518342" className="btn-primary">
              <Phone size={15} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-white">
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main body */}
            <div className="lg:col-span-2">
              <div ref={ref1} className="fade-in-up">
                <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 800, color: "#111111", marginBottom: "20px", lineHeight: "1.2" }}>
                  About This Service
                </h2>
                <div
                  style={{ color: "#555555", lineHeight: "30px", fontSize: "16px" }}
                  dangerouslySetInnerHTML={{ __html: (service.longDesc ?? service.shortDesc ?? "").replace(/\n\n/g, '</p><p style="margin-top:16px">').replace(/\n/g, '<br/>') }}
                />

                {benefits.length > 0 && (
                  <div className="mt-10">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#111111", marginBottom: "16px" }}>
                      What You Get
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {benefits.map((b: { title: string; desc: string } | string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "#f0f6ff", border: "1px solid #d0e8ff" }}>
                          <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                          <div>
                            {typeof b === 'object' ? (
                              <>
                                <div style={{ color: "#111111", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>{b.title}</div>
                                <div style={{ color: "#555555", fontSize: "13px", lineHeight: "20px" }}>{b.desc}</div>
                              </>
                            ) : (
                              <span style={{ color: "#222222", fontSize: "15px" }}>{b}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs - Accordion */}
                {faqs.length > 0 && (
                  <div className="mt-12">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#111111", marginBottom: "20px" }}>
                      Frequently Asked Questions
                    </h3>
                    <div className="flex flex-col">
                      {faqs.map((faq: { q: string; a: string }, i: number) => (
                        <FaqItem key={i} question={faq.q} answer={faq.a} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* CTA Card */}
                <div className="rounded-3xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>Ready to Get Started?</h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: "22px", marginBottom: "20px" }}>
                    Call us today for a free sewer camera inspection and honest assessment.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href="tel:5194518342" className="btn-white justify-center text-sm" style={{ padding: "14px 20px" }}>
                      <Phone size={14} />
                      519-451-8342
                    </a>
                    <Link href="/quote" className="btn-outline justify-center text-sm" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "14px 20px" }}>
                      Free Quote
                    </Link>
                  </div>
                </div>

                {/* Google Reviews */}
                <GoogleReviewsWidget variant="service" maxReviews={3} />

                {/* Trust Badges */}
                <div className="service-card-v2">
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "14px" }}>Why Discount Drain</h4>
                  {[
                    { icon: Shield, text: "WSIB Compliant and Fully Insured" },
                    { icon: Star, text: "BBB Accredited Business" },
                    { icon: Clock, text: "24/7 Emergency Dispatch" },
                    { icon: CheckCircle2, text: "Free Camera Inspection Included" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 mb-3">
                      <Icon size={15} style={{ color: "#0080ff", flexShrink: 0 }} />
                      <span style={{ color: "#555555", fontSize: "13px" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
          <div ref={ref2} className="fade-in-up container">
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111111", marginBottom: "32px", textAlign: "center" }}>
              What Our Customers Say
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

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>
            Need {service.title} in London Ontario?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "17px", maxWidth: "480px", margin: "0 auto 28px", lineHeight: "28px" }}>
            Call us today. We pick up 24 hours a day, 7 days a week. Free camera inspection included with every service call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "16px 32px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "16px 32px" }}>
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
