import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { Phone, CheckCircle2, ArrowRight, Star, Clock, Shield, ChevronDown } from "lucide-react";
import DDLayout from "./DDLayout";
import { getServiceBySlug } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";
import Breadcrumb, { buildBreadcrumbJsonLd } from "@/components/dd/Breadcrumb";

// Related services shown at the bottom of specific service pages
const RELATED_SERVICES: Record<string, { slug: string; title: string; desc: string; img: string }[]> = {
  "sewer-camera-inspection": [
    {
      slug: "sewer-repair-installation",
      title: "Sewer Repair and Installation",
      desc: "Once the camera shows us what is wrong, we fix it. We use every repair method available: UV CIPP lining, pipe bursting, spot patch, ElastoFlake coating, and open-cut excavation.",
      img: "/manus-storage/sewer-repair-1_b9db9364.jpeg",
    },
    {
      slug: "trenchless-pipe-repair",
      title: "Trenchless Pipe Repair",
      desc: "If the camera shows root intrusion, cracks, or corrosion, trenchless lining can fix the pipe from the inside without digging up your driveway or yard.",
      img: "/manus-storage/trenchless-liner-1_c697c087.jpeg",
    },
  ],
  "trenchless-pipe-repair": [
    {
      slug: "sewer-camera-inspection",
      title: "Free Sewer Camera Inspection",
      desc: "Every trenchless repair starts with a camera inspection. We show you the footage on site so you understand exactly what needs to be fixed and why.",
      img: "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
    },
    {
      slug: "sewer-repair-installation",
      title: "Sewer Repair and Installation",
      desc: "When trenchless is not the right answer, we excavate and replace. We handle the full repair from permits to surface restoration.",
      img: "/manus-storage/sewer-repair-2_d3da9160.jpeg",
    },
  ],
  "wet-basement-repair": [
    {
      slug: "sewer-camera-inspection",
      title: "Free Sewer Camera Inspection",
      desc: "A wet basement is sometimes caused by a blocked or broken weeping tile connection to the sewer. A camera inspection can rule that out before waterproofing work begins.",
      img: "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
    },
    {
      slug: "excavation-services",
      title: "Excavation Services",
      desc: "Exterior waterproofing and weeping tile replacement require excavation around the foundation. Our crew handles the dig and the restoration as part of the same job.",
      img: "/manus-storage/service-excavation_b7ce058d.jpg",
    },
  ],
  "sewer-repair-installation": [
    {
      slug: "trenchless-pipe-repair",
      title: "Trenchless Pipe Repair",
      desc: "For many sewer line failures, trenchless lining is faster and less disruptive than excavation. We will tell you honestly which method is right after the camera inspection.",
      img: "/manus-storage/trenchless-liner-2_62207afb.jpg",
    },
    {
      slug: "sewer-camera-inspection",
      title: "Free Sewer Camera Inspection",
      desc: "Every sewer repair starts with a camera inspection. We show you the footage on site so you see exactly what is wrong before any work begins.",
      img: "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
    },
  ],
  "drain-cleaning": [
    {
      slug: "sewer-camera-inspection",
      title: "Free Sewer Camera Inspection",
      desc: "After clearing a blocked drain, we run the camera through to confirm the line is fully clear and check for root intrusion or structural damage that could cause the blockage to return.",
      img: "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
    },
    {
      slug: "trenchless-pipe-repair",
      title: "Trenchless Pipe Repair",
      desc: "If the camera shows root intrusion or cracks that will keep causing blockages, trenchless lining is the permanent fix. No digging, completed in a single day in most cases.",
      img: "/manus-storage/trenchless-liner-1_c697c087.jpeg",
    },
  ],
  "excavation-services": [
    {
      slug: "sewer-repair-installation",
      title: "Sewer Repair and Installation",
      desc: "Most of our excavation work is for sewer line repair and replacement. We handle the full job from camera inspection through excavation, pipe replacement, and surface restoration.",
      img: "/manus-storage/sewer-repair-1_b9db9364.jpeg",
    },
    {
      slug: "wet-basement-repair",
      title: "Wet Basement Waterproofing",
      desc: "Exterior waterproofing requires excavating around the foundation. We handle both the excavation and the waterproofing as part of the same job, with a 20-year warranty on the result.",
      img: "/manus-storage/wet-basement-1_5eff930f.jpeg",
    },
  ],
  "septic-repairs": [
    {
      slug: "sewer-repair-installation",
      title: "Sewer Repair and Installation",
      desc: "When a sewer line fails, the damage spreads fast. Our crew handles everything from spot repairs to full replacements, with same-day response and a free camera inspection included.",
      img: "/manus-storage/sewer-repair-1_b9db9364.jpeg",
    },
    {
      slug: "trenchless-pipe-repair",
      title: "Trenchless Pipe Repair",
      desc: "Replace a damaged pipe without digging up your driveway or yard. Our UV-cured CIPP lining system restores the pipe from the inside, with no excavation required in most cases.",
      img: "/manus-storage/trenchless-liner-1_c697c087.jpeg",
    },
  ],
  "municipal-services": [
    {
      slug: "catch-basin-cleaning",
      title: "Catch Basin Cleaning",
      desc: "Municipalities and property managers rely on us to keep catch basins clear and compliant. We clean, repair, and restore basins of all sizes using vacuum trucks and high-pressure flushing.",
      img: "/manus-storage/catchbasin-hero_434c10ae.jpg",
    },
    {
      slug: "sewer-repair-installation",
      title: "Sewer Repair and Installation",
      desc: "From emergency main breaks to planned infrastructure upgrades, our certified technicians handle sewer repair and installation for municipal and commercial clients across Southwestern Ontario.",
      img: "/manus-storage/sewer-repair-2_d3da9160.jpeg",
    },
  ],
  "catch-basin-cleaning": [
    {
      slug: "municipal-services",
      title: "Municipal Services",
      desc: "Beyond catch basins, we handle the full range of municipal drainage work including sewer lining, manhole restoration, and water main repair. One contractor for the entire job.",
      img: "/manus-storage/municipal-hero_59376e39.jpg",
    },
    {
      slug: "drain-cleaning",
      title: "Drain Cleaning and Power Flushing",
      desc: "When a catch basin is clear but drainage is still slow, the problem is usually further down the line. Our power flushing service clears blockages in the outlet pipe and storm sewer connection.",
      img: "/manus-storage/service-drain-cleaning_ce593909.jpg",
    },
  ],
};

const HERO_IMGS: Record<string, string> = {
  // Sewer camera inspection: technician using camera unit inside a drain
  "sewer-camera-inspection": "/manus-storage/service-camera-inspection_dbb5bfc5.jpg",
  // Trenchless pipe repair: real client UV liner installation photo
  "trenchless-pipe-repair": "/manus-storage/trenchless-liner-2_62207afb.jpg",
  // Wet basement waterproofing: real client basement waterproofing photo
  "wet-basement-repair": "/manus-storage/wet-basement-1_5eff930f.jpeg",
  "wet-basement-waterproofing": "/manus-storage/wet-basement-1_5eff930f.jpeg",
  // Sewer repair & installation: real client sewer excavation photo
  "sewer-repair-installation": "/manus-storage/sewer-repair-1_b9db9364.jpeg",
  // Drain cleaning: high-pressure water jetting inside a drain
  "drain-cleaning": "/manus-storage/service-drain-cleaning_ce593909.jpg",
  // Excavation: real client sewer excavation photo
  "excavation-services": "/manus-storage/sewer-repair-2_d3da9160.jpeg",
  // Septic service and repairs: real client septic system photo
  "septic-repairs": "/manus-storage/septic-system-1_b4c2e004.jpeg",
  // Municipal services: infrastructure crew working on sewer manhole in a street
  "municipal-services": "/manus-storage/municipal-hero_59376e39.jpg",
  // Catch basin cleaning: technician cleaning a catch basin grate in a parking lot
  "catch-basin-cleaning": "/manus-storage/catchbasin-hero_434c10ae.jpg",
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mark body so CSS can apply the hidden state (progressive enhancement)
    document.body.classList.add("js-scroll-ready");
    // Immediately reveal if already in viewport
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
  const service = slug && slug !== ":slug" ? getServiceBySlug(slug) : undefined;
  const testimonials = TESTIMONIALS;
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  const heroImg = HERO_IMGS[slug ?? ""] ?? "/manus-storage/dd-hero-drain_7551245e.jpg";

  if (!slug) {
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

  const ogImage = "https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg";
  const pageTitle = `${service.metaTitle ?? service.title} | Discount Drain | London Ontario`;
  const pageDesc = service.metaDesc ?? service.shortDesc;
  const canonicalUrl = `https://discountdrain.ca/services/${slug}`;

  return (
    <DDLayout>
      <title>{pageTitle}</title>
      {pageDesc && <meta name="description" content={pageDesc} />}
      {service.metaKeywords && <meta name="keywords" content={service.metaKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      {pageDesc && <meta property="og:description" content={pageDesc} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {pageDesc && <meta name="twitter:description" content={pageDesc} />}
      <meta name="twitter:image" content={ogImage} />

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

      {/* Structured Data - BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${slug}` },
        ])
      )}} />

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
          <Breadcrumb
            variant="light"
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
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
      {testimonials.length > 0 && (
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

      {/* Related Services */}
      {RELATED_SERVICES[slug ?? ""] && (
        <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="container">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#111111", marginBottom: "8px" }}>
              Related Services
            </h2>
            <p style={{ color: "#666666", fontSize: "15px", marginBottom: "32px", lineHeight: "24px" }}>
              Other services our customers in London Ontario commonly need alongside this one.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RELATED_SERVICES[slug ?? ""].map((rel) => (
                <Link key={rel.slug} href={`/services/${rel.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    className="flex gap-5 rounded-2xl overflow-hidden group"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e8f3ff", transition: "box-shadow 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,128,255,0.10)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: "140px",
                        minHeight: "140px",
                        backgroundImage: `url(${rel.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="flex flex-col justify-center py-5 pr-5">
                      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "8px", lineHeight: "1.3" }}>
                        {rel.title}
                      </h3>
                      <p style={{ color: "#555555", fontSize: "14px", lineHeight: "22px", marginBottom: "12px" }}>
                        {rel.desc}
                      </p>
                      <span className="flex items-center gap-1" style={{ color: "#0080ff", fontSize: "14px", fontWeight: 600 }}>
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
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
