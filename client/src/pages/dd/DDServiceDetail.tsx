import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { Phone, CheckCircle2, ArrowRight, Star, Clock, Shield, ChevronDown } from "lucide-react";
import DDLayout from "./DDLayout";
import { getServiceBySlug } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";
import Breadcrumb, { buildBreadcrumbJsonLd } from "@/components/dd/Breadcrumb";
import ServiceGallery from "@/components/dd/ServiceGallery";
import { SERVICE_GALLERY } from "@/data/serviceGallery";

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

      {/* ─── Our Process ─── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="eyebrow mx-auto mb-4" style={{ color: "#0080ff" }}>Our Process</div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#111111", lineHeight: "1.2" }}>
              How It Works
            </h2>
            <p style={{ color: "#555555", fontSize: "16px", maxWidth: "520px", margin: "16px auto 0", lineHeight: "26px" }}>
              Getting your drain or sewer fixed is straightforward. Here is what to expect from your first call to the final fix.
            </p>
          </div>

          {/* Roofex-style cards — service-specific steps */}
          {(() => {
            const SERVICE_STEPS: Record<string, { num: string; title: string; desc: string }[]> = {
              "sewer-camera-inspection": [
                { num: "01", title: "Book Your Free Inspection", desc: "Call us or request online any time — 24/7. We schedule a same-day or next-day visit at no charge to you." },
                { num: "02", title: "Watch the Camera Live", desc: "Our technician feeds a high-resolution camera through your drain line and shows you the footage on a monitor at the job site in real time." },
                { num: "03", title: "Get a Clear Diagnosis", desc: "We walk you through exactly what the camera found — in plain language — and explain your options before recommending any repair." },
              ],
              "trenchless-pipe-repair": [
                { num: "01", title: "Free Camera Inspection", desc: "We run a high-resolution camera through your pipe to pinpoint the damage and determine whether UV CIPP lining, spot patch, or ElastoFlake coating is the right fix." },
                { num: "02", title: "No-Dig Repair", desc: "We insert and cure the liner or coating from inside the existing pipe — no trench, no driveway damage, no disruption to your landscaping." },
                { num: "03", title: "20-Year Warranty", desc: "A post-repair camera confirms the result. Your new pipe-within-a-pipe is seamless, root-proof, and backed by our written 20-year warranty." },
              ],
              "wet-basement-repair": [
                { num: "01", title: "On-Site Assessment", desc: "We inspect your foundation, drainage, and basement walls to identify exactly where water is entering and what is causing it." },
                { num: "02", title: "Targeted Waterproofing", desc: "We install the right solution — interior drainage channel, crack injection, sump pump, or exterior excavation — based on what the assessment reveals." },
                { num: "03", title: "Dry Basement, 20-Year Warranty", desc: "Work is complete, your basement is dry, and the repair is backed by a written 20-year transferable warranty." },
              ],
              "sewer-repair-installation": [
                { num: "01", title: "Camera Inspection First", desc: "We run a video camera through your sewer line to locate the break, offset, or root intrusion and determine the best repair method." },
                { num: "02", title: "Right Method for the Job", desc: "We choose from UV CIPP lining, pipe bursting, spot patch, ElastoFlake coating, or open-cut excavation — whichever is most effective for your situation." },
                { num: "03", title: "Confirmed and Warranted", desc: "A post-repair camera confirms the fix. All sewer repair and installation work is backed by our standard written warranty." },
              ],
              "drain-cleaning": [
                { num: "01", title: "Diagnose the Blockage", desc: "We run a camera through the drain to see exactly what is causing the clog — grease, roots, debris, or a structural issue — before we touch anything." },
                { num: "02", title: "High-Pressure Power Flush", desc: "We clear the blockage using the right tool for the job: drain snake, hydro-jetting, or power flushing, depending on what the camera showed." },
                { num: "03", title: "Camera Confirms Clear", desc: "A final camera pass confirms the drain is fully open. If we find an underlying issue, we explain your options before any additional work begins." },
              ],
              "excavation-services": [
                { num: "01", title: "Site Assessment and Plan", desc: "We assess the excavation site, confirm underground utility locations, and give you a clear scope of work and timeline before any digging starts." },
                { num: "02", title: "Precision Excavation", desc: "Our equipment operators dig to the required depth and dimensions — whether for sewer access, pool installation, parking lot prep, or foundation work." },
                { num: "03", title: "Haul Away and Restore", desc: "Spoil is loaded and removed by our dump trucks. We backfill, compact, and restore the surface to the agreed-upon finish." },
              ],
              "municipal-services": [
                { num: "01", title: "Scope and Mobilise", desc: "We review the project specifications, confirm access requirements, and mobilise the right equipment and crew for the municipal scope of work." },
                { num: "02", title: "Execute the Work", desc: "Our certified crew performs sewer lining, manhole restoration, catch basin repair, water main work, or other municipal drainage tasks to specification." },
                { num: "03", title: "Inspection and Sign-Off", desc: "Work is inspected, documented, and handed off with all required records. We coordinate with municipal contacts throughout to keep the project on schedule." },
              ],
              "septic-repairs": [
                { num: "01", title: "Inspect the System", desc: "We assess the septic tank, distribution box, and tile bed to identify the failure point — whether it is a blocked outlet, a failing bed, or a cracked tank." },
                { num: "02", title: "Repair or Replace", desc: "We pump, repair, or replace the components that are failing. For tile bed failures, we design and install a new bed to current Ontario Building Code standards." },
                { num: "03", title: "System Restored", desc: "Your septic system is back in service. We provide maintenance guidance so you know how to keep it running efficiently for years to come." },
              ],
              "catch-basin-cleaning": [
                { num: "01", title: "Inspect the Basin", desc: "We inspect the catch basin and outlet pipe to assess sediment depth, structural condition, and whether the outlet is clear before cleaning begins." },
                { num: "02", title: "Vacuum and Flush", desc: "We remove accumulated sediment, debris, and standing water using a vacuum truck, then flush the outlet pipe to confirm it is flowing freely." },
                { num: "03", title: "Report and Recommend", desc: "You receive a condition report. If we find cracks, damaged grates, or a blocked outlet pipe, we explain the repair options before any additional work is done." },
              ],
            };
            const steps = SERVICE_STEPS[slug ?? ""] ?? [
              { num: "01", title: "Call or Request Online", desc: "Reach us any time — 24 hours a day, 7 days a week. Tell us what is happening and we will schedule a same-day or next-day visit." },
              { num: "02", title: "Free Camera Inspection", desc: "Our technician runs a high-resolution camera through your drain line and shows you exactly what is wrong on a monitor at the job site." },
              { num: "03", title: "Problem Solved", desc: "We fix the issue on the spot whenever possible and back the work with our 20-year warranty." },
            ];
            return (
          <div className="grid grid-cols-1 md:grid-cols-3 mt-2" style={{ columnGap: "56px", rowGap: "24px" }}>
            {steps.map((step, idx, arr) => {
              const isFirst = idx === 0;
              const isLast = idx === arr.length - 1;
              return (
                <div key={idx} style={{ position: "relative" }}>
                  {/* Card */}
                  <div
                    style={{
                      background: "#F4F4EB",
                      borderRadius: isFirst ? "40px 10px 10px 40px" : "10px",
                      padding: "40px 28px 40px 24px",
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
                    <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "flex-start" }}>
                      {/* Left: step number + dashed line */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "36px", fontWeight: 800, color: "#0080ff", lineHeight: "1" }}>
                          {step.num}
                        </span>
                        <div style={{ width: "1px", flex: 1, minHeight: "80px", borderLeft: "1.5px dashed rgba(17,19,35,0.2)", marginTop: "10px" }} />
                      </div>
                      {/* Right: title + desc */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#111111", marginBottom: "10px", lineHeight: "1.35" }}>{step.title}</h3>
                        <p style={{ color: "#555555", fontSize: "14px", lineHeight: "24px" }}>{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector — sits centred in the 56px column gap */}
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
                </div>
              );
            })}
          </div>
            );
          })()}
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

      {/* Service Gallery */}
      {SERVICE_GALLERY[slug ?? ""] && SERVICE_GALLERY[slug ?? ""].length > 0 && (
        <ServiceGallery
          items={SERVICE_GALLERY[slug ?? ""]}
          title={`${service.title} — Real Project Photos`}
        />
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
