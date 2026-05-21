import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCard {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

const RESIDENTIAL_SERVICES: ServiceCard[] = [
  {
    category: "RESIDENTIAL",
    title: "Free Sewer Video Camera Inspection",
    description:
      "Don't just clean your sewer line — see it. We show you your sewer line on the spot, in minutes. A $400 value, absolutely free with every service call.",
    image: "/manus-storage/sewer-camera_89fadfa4.jpg",
    href: "/services/sewer-camera-inspection",
    cta: "Book Your Free Inspection",
  },
  {
    category: "RESIDENTIAL",
    title: "No-Dig Trenchless Pipe Repair",
    description:
      "Stop before you let anyone dig up your driveway or landscaping. Our CIPP trenchless technology replaces underground pipe from the inside out with no excavation required.",
    image: "/manus-storage/trenchless-cipp_0e8cbbf0.jpg",
    href: "/services/trenchless-pipe-repair",
    cta: "Get a Free Assessment",
  },
  {
    category: "RESIDENTIAL",
    title: "Wet Basement Waterproofing",
    description:
      "We fix wet and leaky basements permanently, backed by a 20-year warranty. Stop basement leaks and protect your home's foundation with our proven waterproofing solutions.",
    image: "/manus-storage/wet-basement_f9b9e799.jpg",
    href: "/services/wet-basement-repair",
    cta: "Stop Your Basement Leaks",
  },
  {
    category: "RESIDENTIAL",
    title: "Sewer Repair and Installation",
    description:
      "Our certified technicians solve your sewer and drain problems quickly and professionally. We handle everything from minor repairs to full replacements.",
    image: "/manus-storage/sewer-excavation_2011c5b0.jpg",
    href: "/services/sewer-repair-installation",
    cta: "Get a Free Quote",
  },
  {
    category: "RESIDENTIAL",
    title: "Drain Cleaning and Power Flushing",
    description:
      "Proper maintenance prevents clogging. We use the latest hydro-jetting technology to keep your drains flowing cleanly and affordably, clearing years of buildup in a single visit.",
    image: "/manus-storage/drain-cleaning_89acad85.jpg",
    href: "/services/drain-cleaning",
    cta: "Schedule a Cleaning",
  },
  {
    category: "RESIDENTIAL",
    title: "Dump Trucks and Machine Excavating",
    description:
      "From deep excavations to parking lot preparation and pool installation, our fleet of dump trucks and excavators handles any earthmoving project with precision and speed.",
    image: "/manus-storage/dump-truck_92b5ca4e.jpg",
    href: "/services/excavation-services",
    cta: "Request an Estimate",
  },
];

const COMMERCIAL_SERVICES: ServiceCard[] = [
  {
    category: "COMMERCIAL",
    title: "Sewer Video Camera Inspections",
    description:
      "Commercial-grade video inspection to diagnose sewer and drain problems quickly. We document everything on video so you have a clear record for insurance and compliance.",
    image: "/manus-storage/sewer-camera_89fadfa4.jpg",
    href: "/services/sewer-camera-inspection",
    cta: "Book a Commercial Inspection",
  },
  {
    category: "COMMERCIAL",
    title: "Municipal Services",
    description:
      "From sewer lining to manhole restoration and water main repair, we deliver effective solutions for all municipal drainage infrastructure needs.",
    image: "/manus-storage/municipal-manhole_1ff6ab05.jpg",
    href: "/commercial",
    cta: "Discuss Your Project",
  },
  {
    category: "COMMERCIAL",
    title: "No-Dig Trenchless Systems",
    description:
      "Replace underground pipe without disturbing surface materials or parking lots. Minimal disruption to your business operations, completed in as little as one day.",
    image: "/manus-storage/trenchless-cipp_0e8cbbf0.jpg",
    href: "/services/trenchless-pipe-repair",
    cta: "Get a Free Assessment",
  },
  {
    category: "COMMERCIAL",
    title: "Catch Basin Cleaning",
    description:
      "We solve catch basin problems quickly using vacuum trucks and the latest technology. Regular cleaning prevents flooding, property damage, and regulatory issues.",
    image: "/manus-storage/catch-basin_834522ce.jpg",
    href: "/services/drain-cleaning",
    cta: "Schedule a Cleaning",
  },
  {
    category: "COMMERCIAL",
    title: "Commercial Sewer Repair",
    description:
      "Highly trained technicians working to solve commercial sewer and drain problems using the latest products and methods. We minimize downtime and get your business back to normal fast.",
    image: "/manus-storage/sewer-excavation_2011c5b0.jpg",
    href: "/services/sewer-repair-installation",
    cta: "Get a Free Quote",
  },
  {
    category: "COMMERCIAL",
    title: "Septic Service",
    description:
      "Preventative maintenance and a full service line of repairs and replacements on septic beds and sewers for commercial properties and rural businesses across Southwestern Ontario.",
    image: "/manus-storage/septic-service_baff70a9.jpg",
    href: "/commercial",
    cta: "Request an Estimate",
  },
];

// Arrow button that expands to show a CTA label on hover
function ArrowCTA({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {/* CTA label — slides in from the left when hovered */}
        <div
          style={{
            overflow: "hidden",
            maxWidth: hovered ? "220px" : "0px",
            opacity: hovered ? 1 : 0,
            transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            whiteSpace: "nowrap",
            marginRight: hovered ? "10px" : "0px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#0F172A",
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            {label}
          </span>
        </div>

        {/* Arrow circle */}
        <div
          className="flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: hovered ? "#2563EB" : "#0F172A",
            color: "#FFFFFF",
            flexShrink: 0,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            boxShadow: hovered ? "0 4px 16px rgba(37,99,235,0.35)" : "none",
          }}
        >
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}

// ─── RAF lerp scroll hook ─────────────────────────────────────────────────────
// Returns a ref to attach to the scrolling track element.
// Reads the wrapper's scroll progress and lerps the translateX toward the
// target value every animation frame — completely bypassing React state for
// the position update so there are zero re-renders during scroll.
function useLerpScroll(
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  count: number,
  activeTab: string,
  onActiveIdxChange: (idx: number) => void
) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Lerp factor: higher = snappier, lower = more floaty. 0.09 gives a silky feel.
  const LERP = 0.09;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Reset immediately on tab change
    track.style.transform = "translateX(0px)";

    let currentX = 0;
    let targetX = 0;
    let rafId = 0;
    let lastActiveIdx = 0;

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalHeight = wrapper.offsetHeight;
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = totalHeight - vh;
      if (scrollable <= 0) return 0;

      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      const containerW = wrapper.offsetWidth;
      const cardW = containerW * 0.74;
      const gap = containerW * 0.025;
      const stepPx = cardW + gap;
      const maxTranslate = stepPx * (count - 1);

      return -(progress * maxTranslate);
    };

    const tick = () => {
      targetX = computeTarget();

      // Lerp: ease current toward target
      currentX += (targetX - currentX) * LERP;

      // Only write to DOM when the delta is meaningful (avoid sub-pixel noise)
      if (Math.abs(targetX - currentX) < 0.05) {
        currentX = targetX;
      }

      track.style.transform = `translateX(${currentX}px)`;

      // Derive active index from current position (not target) for smooth dot tracking
      const containerW = wrapper.offsetWidth;
      const cardW = containerW * 0.74;
      const gap = containerW * 0.025;
      const stepPx = cardW + gap;
      const rawIdx = stepPx > 0 ? -currentX / stepPx : 0;
      const newIdx = Math.min(count - 1, Math.max(0, Math.round(rawIdx)));
      if (newIdx !== lastActiveIdx) {
        lastActiveIdx = newIdx;
        onActiveIdxChange(newIdx);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, activeTab]);

  return trackRef;
}

export default function ScrollServicesSection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const services = activeTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;
  const count = services.length;

  // Reset active dot when tab changes
  useEffect(() => {
    setActiveIdx(0);
  }, [activeTab]);

  // Listen for custom event from nav to switch tabs
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail as "residential" | "commercial";
      if (tab === "residential" || tab === "commercial") {
        setActiveTab(tab);
      }
    };
    window.addEventListener("services:setTab", handler);
    return () => window.removeEventListener("services:setTab", handler);
  }, []);

  const trackRef = useLerpScroll(wrapperRef, count, activeTab, setActiveIdx);

  // 400px scroll travel per card
  const scrollTravel = (count - 1) * 400;

  return (
    <div
      id="services-section"
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${scrollTravel}px)` }}
      className="relative"
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 overflow-hidden bg-white"
        style={{ height: "100vh" }}
      >
        {/* Section header */}
        <div className="container pt-16 pb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}
            >
              Our Services
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#0F172A", fontFamily: "'Inter Tight', sans-serif" }}
            >
              Everything You Need,
              <br />
              Under One Roof
            </h2>
          </div>

          {/* Tab toggle */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setActiveTab("residential")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeTab === "residential" ? "#2563EB" : "#F1F5F9",
                color: activeTab === "residential" ? "#FFFFFF" : "#475569",
              }}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeTab === "commercial" ? "#2563EB" : "#F1F5F9",
                color: activeTab === "commercial" ? "#FFFFFF" : "#475569",
              }}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Card track */}
        <div className="container overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: "2.5%", willChange: "transform" }}
          >
            {services.map((service, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="flex-shrink-0 rounded-2xl overflow-hidden flex"
                style={{
                  width: "74%",
                  height: "400px",
                  border: "1px solid #E2E8F0",
                }}
              >
                {/* Left: image panel */}
                <div
                  className="flex-shrink-0 relative"
                  style={{
                    width: "42%",
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#CBD5E1",
                  }}
                >
                  {/* Flagship badge — only on the first residential card */}
                  {activeTab === "residential" && i === 0 && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "#FBBF24",
                        boxShadow: "0 2px 8px rgba(251,191,36,0.45)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#92400E" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#92400E",
                          fontFamily: "'Inter Tight', sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Free Camera Inspection
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: content panel */}
                <div
                  className="flex flex-col justify-between p-10 flex-1"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div>
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-4"
                      style={{ color: "#94A3B8", letterSpacing: "0.14em" }}
                    >
                      {service.category}
                    </p>
                    <h3
                      className="font-bold leading-snug mb-4"
                      style={{
                        fontSize: "clamp(20px, 2.2vw, 30px)",
                        color: "#0F172A",
                        fontFamily: "'Inter Tight', sans-serif",
                        maxWidth: "420px",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#475569", maxWidth: "400px" }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom row: expanding arrow CTA + progress dots */}
                  <div className="flex items-center justify-between mt-6">
                    <ArrowCTA href={service.href} label={service.cta} />

                    <div className="flex items-center gap-2">
                      {services.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: dotIdx === activeIdx ? "20px" : "8px",
                            height: "8px",
                            backgroundColor: dotIdx === activeIdx ? "#2563EB" : "#CBD5E1",
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
    </div>
  );
}
