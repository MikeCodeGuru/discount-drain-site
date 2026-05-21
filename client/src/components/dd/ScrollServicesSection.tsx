import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

// Service images
const CAMERA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp";
const TRENCHLESS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/trenchless-tech-aq27wqzhBVwtJcMqn5vyp6.webp";
const BASEMENT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/wet-basement-KCdDkXrFxEYTLvyifn5MV5.webp";
const EXCAVATION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/excavation-truck-hn3hyopRK6GMkwRppqE9JE.webp";
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/hero-drain-7Qr6hJCJVsmcjoSkPJtcfU.webp";

interface ServiceCard {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const RESIDENTIAL_SERVICES: ServiceCard[] = [
  {
    category: "RESIDENTIAL",
    title: "Free Sewer Video Camera Inspection",
    description:
      "Don't just clean your sewer line — see it. We show you your sewer line on the spot, in minutes. A $400 value, absolutely free with every service call.",
    image: CAMERA_IMG,
    href: "/services/free-camera-inspection",
  },
  {
    category: "RESIDENTIAL",
    title: "No-Dig Trenchless Pipe Repair",
    description:
      "Stop before you let anyone dig up your driveway or landscaping. Our no-dig trenchless technology replaces underground pipe from the inside out, with no excavation required.",
    image: TRENCHLESS_IMG,
    href: "/services/trenchless-pipe-repair",
  },
  {
    category: "RESIDENTIAL",
    title: "Wet Basement Waterproofing",
    description:
      "We fix wet and leaky basements permanently, backed by a 20-year warranty. Stop basement leaks and protect your home's foundation with our proven waterproofing solutions.",
    image: BASEMENT_IMG,
    href: "/services/wet-basement-waterproofing",
  },
  {
    category: "RESIDENTIAL",
    title: "Sewer Repair and Installation",
    description:
      "Our team of highly skilled and certified technicians solve your sewer and drain problems quickly and professionally. We handle everything from minor repairs to full replacements.",
    image: HERO_IMG,
    href: "/services/sewer-repair-installation",
  },
  {
    category: "RESIDENTIAL",
    title: "Drain Cleaning and Power Flushing",
    description:
      "Proper maintenance prevents clogging. We use the latest hydro-jetting technology to keep your drains flowing cleanly and affordably, clearing years of buildup in a single visit.",
    image: CAMERA_IMG,
    href: "/services/drain-cleaning",
  },
  {
    category: "RESIDENTIAL",
    title: "Excavation Services",
    description:
      "From deep excavations to parking lot preparation and pool installation, our fleet of dump trucks and excavators handles any earthmoving project with precision and speed.",
    image: EXCAVATION_IMG,
    href: "/services/excavation",
  },
];

const COMMERCIAL_SERVICES: ServiceCard[] = [
  {
    category: "COMMERCIAL",
    title: "Sewer Video Camera Inspections",
    description:
      "Commercial-grade video inspection to diagnose sewer and drain problems quickly and professionally. We document everything on video so you have a clear record for insurance and compliance.",
    image: CAMERA_IMG,
    href: "/services/commercial-camera-inspection",
  },
  {
    category: "COMMERCIAL",
    title: "Municipal Services",
    description:
      "From sewer lining to manhole restoration and water main repair, we deliver effective solutions for all municipal drainage needs. Our crews are certified and WSIB compliant.",
    image: EXCAVATION_IMG,
    href: "/services/municipal-services",
  },
  {
    category: "COMMERCIAL",
    title: "No-Dig Trenchless Systems",
    description:
      "Replace underground pipe without disturbing any surface materials. Minimal disruption to your business operations, completed in as little as one day using our CIPP lining system.",
    image: TRENCHLESS_IMG,
    href: "/services/commercial-trenchless",
  },
  {
    category: "COMMERCIAL",
    title: "Catch Basin Cleaning",
    description:
      "We solve catch basin problems quickly and professionally using the latest vacuum and hydro-jetting technology. Affordable preventative maintenance that protects your property from flooding.",
    image: HERO_IMG,
    href: "/services/catch-basin-cleaning",
  },
  {
    category: "COMMERCIAL",
    title: "Commercial Sewer Repair",
    description:
      "Highly trained technicians working to solve commercial sewer and drain problems using the latest products and methods. We minimize downtime and get your business back to normal fast.",
    image: CAMERA_IMG,
    href: "/services/commercial-sewer-repair",
  },
  {
    category: "COMMERCIAL",
    title: "Septic Service",
    description:
      "Preventative maintenance and a full service line of repairs and replacements on septic beds and sewers. We serve commercial properties, farms, and rural businesses across Southwestern Ontario.",
    image: BASEMENT_IMG,
    href: "/services/septic-service",
  },
];

function HorizontalScrollTrack({ services }: { services: ServiceCard[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const cardCount = services.length;

    function onScroll() {
      if (!outer || !track) return;
      const rect = outer.getBoundingClientRect();
      const outerHeight = outer.offsetHeight;
      const viewportH = window.innerHeight;

      // scrollProgress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom
      const scrolled = -rect.top;
      const scrollable = outerHeight - viewportH;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      // Total translateX needed: move (cardCount - 1) full viewport widths to the left
      const trackWidth = track.scrollWidth;
      const viewportW = window.innerWidth;
      const maxTranslate = trackWidth - viewportW;
      const translateX = -progress * maxTranslate;

      track.style.transform = `translateX(${translateX}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, [services]);

  // Outer section height: enough to scroll through all cards
  // Each card takes ~1 viewport height worth of scroll
  const cardCount = services.length;

  return (
    <div
      ref={outerRef}
      style={{ height: `${cardCount * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Card track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${cardCount * 100}vw`,
            willChange: "transform",
            transition: "transform 0.05s linear",
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex h-full"
              style={{ width: "100vw" }}
            >
              {/* Card inner — two columns */}
              <div className="flex w-full h-full">
                {/* Left: image */}
                <div
                  className="relative flex-shrink-0"
                  style={{ width: "45%", height: "100%" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                  />
                  {/* Subtle gradient overlay for text legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Right: content */}
                <div
                  className="flex flex-col justify-center flex-1 px-16 py-20"
                  style={{ backgroundColor: "#f0f4f8" }}
                >
                  {/* Card number */}
                  <div
                    className="mb-6 font-mono text-sm"
                    style={{ color: "#0080ff", letterSpacing: "0.12em", fontWeight: 600 }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </div>

                  {/* Category label */}
                  <div
                    className="mb-4 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#8c9baa", letterSpacing: "0.14em" }}
                  >
                    {service.category}
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-6"
                    style={{
                      fontSize: "clamp(28px, 3vw, 48px)",
                      fontWeight: 800,
                      color: "#111111",
                      lineHeight: 1.15,
                      maxWidth: "520px",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-10"
                    style={{
                      fontSize: "17px",
                      lineHeight: "28px",
                      color: "#4a5568",
                      maxWidth: "480px",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <a
                      href="tel:5194518342"
                      className="btn-primary flex items-center gap-2"
                    >
                      <Phone size={15} />
                      Book This Service
                    </a>
                    <Link
                      href={service.href}
                      className="flex items-center gap-2 font-semibold text-sm"
                      style={{ color: "#0080ff" }}
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center gap-2 mt-14">
                    {services.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        style={{
                          width: dotIdx === i ? "24px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor: dotIdx === i ? "#0080ff" : "#d1d9e0",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ScrollServicesSection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">(
    "residential"
  );

  const services =
    activeTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      {/* Section header — outside the scroll track so it stays readable */}
      <div className="container pt-20 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="eyebrow mb-4">Our Services</div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 800,
                color: "#111111",
                lineHeight: 1.15,
                maxWidth: "560px",
              }}
            >
              Everything You Need, Under One Roof
            </h2>
          </div>

          {/* Tab toggle */}
          <div
            className="flex rounded-full p-1 flex-shrink-0"
            style={{ backgroundColor: "#f0f4f8", border: "1px solid #e2e8f0" }}
          >
            {(["residential", "commercial"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all"
                style={{
                  backgroundColor:
                    activeTab === tab ? "#0080ff" : "transparent",
                  color: activeTab === tab ? "#ffffff" : "#4a5568",
                  boxShadow:
                    activeTab === tab
                      ? "0 2px 8px rgba(0,128,255,0.25)"
                      : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <p
          className="mt-4"
          style={{
            fontSize: "17px",
            lineHeight: "28px",
            color: "#8c9baa",
            maxWidth: "520px",
          }}
        >
          {activeTab === "residential"
            ? "From free camera inspections to trenchless repairs and wet basement waterproofing — we solve every residential drain and sewer problem."
            : "Commercial-grade solutions for businesses, municipalities, and industrial properties across Southwestern Ontario."}
        </p>

        {/* Scroll hint */}
        <div
          className="flex items-center gap-2 mt-8"
          style={{ color: "#8c9baa", fontSize: "13px" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Scroll to explore each service</span>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <HorizontalScrollTrack key={activeTab} services={services} />

      {/* Bottom CTA */}
      <div className="container py-16 text-center">
        <Link href="/services" className="btn-outline">
          View All Services
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
