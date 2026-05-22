import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { Camera, Wrench, Droplets, Truck, Shield, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import DDLayout from "./DDLayout";
import { getAllServices } from "@/data/services";
import Breadcrumb, { buildBreadcrumbJsonLd } from "@/components/dd/Breadcrumb";

const HERO_IMG = "/manus-storage/sewer-camera_39c33547.jpg";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Camera, Wrench, Droplets, Truck, Shield,
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

export default function DDServices() {
  const services = getAllServices();
  const ref1 = useScrollReveal();

  // Read ?tab= query param passed from the mobile Services section CTA
  const search = useSearch();
  const params = new URLSearchParams(search);
  const tabParam = params.get("tab");
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">(
    tabParam === "commercial" ? "commercial" : "residential"
  );

  // Filter by category field:
  // residential tab: show services with category 'residential' or 'both'
  // commercial tab: show services with category 'commercial' or 'both'
  const filteredServices = services.filter((s) =>
    activeTab === "commercial"
      ? s.category === "commercial" || s.category === "both"
      : s.category === "residential" || s.category === "both"
  );

  return (
    <DDLayout>
      <title>Drain and Sewer Services | London Ontario | Discount Drain</title>
      <meta name="description" content="Complete drain and sewer services in London Ontario: free camera inspections, trenchless pipe repair, wet basement waterproofing, drain cleaning, sewer repair, and excavation. Call 519-451-8342." />
      <meta name="keywords" content="drain and sewer services London Ontario, sewer camera inspection, trenchless pipe repair, wet basement waterproofing, drain cleaning London ON, sewer repair installation, excavation services, catch basin cleaning, septic repair" />
      <link rel="canonical" href="https://discountdrain.ca/services" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discountdrain.ca/services" />
      <meta property="og:title" content="Drain and Sewer Services | London Ontario | Discount Drain" />
      <meta property="og:description" content="Complete drain and sewer services in London Ontario: free camera inspections, trenchless pipe repair, wet basement waterproofing, drain cleaning, sewer repair, and excavation. Call 519-451-8342." />
      <meta property="og:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Drain and Sewer Services | London Ontario | Discount Drain" />
      <meta name="twitter:description" content="Complete drain and sewer services in London Ontario: free camera inspections, trenchless pipe repair, wet basement waterproofing, drain cleaning, sewer repair, and excavation. Call 519-451-8342." />
      <meta name="twitter:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />

      {/* Structured Data: BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ])
      )}} />

      {/* Page Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ minHeight: "380px", backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative container" style={{ zIndex: 2 }}>
          <Breadcrumb
            variant="light"
            className="mb-5"
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
          <div className="eyebrow mb-4" style={{ color: "#60b3ff", backgroundColor: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.3)" }}>
            What We Do
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Our Services
          </h1>
          <p className="text-white/80" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            From free camera inspections to trenchless repairs and wet basement waterproofing, we have the expertise to handle any drain or sewer problem.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div ref={ref1} className="fade-in-up container">
          {/* Tab toggle */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab("residential")}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeTab === "residential" ? "#2563EB" : "#F1F5F9",
                color: activeTab === "residential" ? "#FFFFFF" : "#475569",
              }}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeTab === "commercial" ? "#2563EB" : "#F1F5F9",
                color: activeTab === "commercial" ? "#FFFFFF" : "#475569",
              }}
            >
              Commercial
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredServices.length > 0 ? filteredServices : services).map((service) => {
                const Icon = ICON_MAP[service.iconName ?? "Wrench"] ?? Wrench;
                return (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    <div className="service-card-v2 h-full flex flex-col cursor-pointer">
                      <div
                        className="flex items-center justify-center mb-5 rounded-2xl"
                        style={{ width: "52px", height: "52px", backgroundColor: "#e8f3ff" }}
                      >
                        <Icon size={22} style={{ color: "#0080ff" }} />
                      </div>
                      <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "10px", lineHeight: "1.3" }}>
                        {service.title}
                      </h2>
                      <p style={{ color: "#8c9baa", fontSize: "15px", lineHeight: "24px", flex: 1 }}>
                        {service.shortDesc}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: "#0080ff" }}>
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
        </div>
      </section>

      {/* Why Discount Drain */}
      <section className="py-20" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="eyebrow mb-4">Why Choose Us</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                The Discount Drain Difference
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                We have been solving drain and sewer problems in London and Southwestern Ontario since 1970. Every service call includes a free sewer video camera inspection, a $400 value at no charge to you.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Free sewer video camera inspection with every service call",
                  "No-dig trenchless technology saves your driveway and landscaping",
                  "20-year warranty on wet basement waterproofing",
                  "24/7 emergency dispatch, 365 days a year",
                  "WSIB compliant and fully insured on every job",
                  "Family-owned and operated since 1970",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#222222", fontSize: "15px" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-3xl p-10 text-white">
              <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "16px" }}>
                Get a Free Assessment
              </h3>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: "28px", marginBottom: "28px" }}>
                Not sure what service you need? Call us and we will send a technician to assess the problem. The camera inspection is free, and there is no obligation.
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:5194518342" className="btn-white justify-center">
                  <Phone size={15} />
                  Call 519-451-8342
                </a>
                <Link href="/quote" className="btn-outline justify-center" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}>
                  Request a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
