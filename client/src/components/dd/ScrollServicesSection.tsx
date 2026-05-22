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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-clean-2snTGdn5gWiZBi5urG5Haa.webp",
    href: "/services/sewer-camera-inspection",
    cta: "Book Your Free Inspection",
  },
  {
    category: "RESIDENTIAL",
    title: "No-Dig Trenchless Pipe Repair",
    description:
      "Stop before you let anyone dig up your driveway or landscaping. Our CIPP trenchless technology replaces underground pipe from the inside out with no excavation required.",
    image: "/manus-storage/trenchless-cipp_af2a3f19.jpg",
    href: "/services/trenchless-pipe-repair",
    cta: "Get a Free Assessment",
  },
  {
    category: "RESIDENTIAL",
    title: "Wet Basement Waterproofing",
    description:
      "We fix wet and leaky basements permanently, backed by a 20-year warranty. Stop basement leaks and protect your home's foundation with our proven waterproofing solutions.",
    image: "/manus-storage/wet-basement_34545357.jpg",
    href: "/services/wet-basement-repair",
    cta: "Stop Your Basement Leaks",
  },
  {
    category: "RESIDENTIAL",
    title: "Sewer Repair and Installation",
    description:
      "Our certified technicians solve your sewer and drain problems quickly and professionally. We handle everything from minor repairs to full replacements.",
    image: "/manus-storage/sewer-excavation_fd6549ea.jpg",
    href: "/services/sewer-repair-installation",
    cta: "Get a Free Quote",
  },
  {
    category: "RESIDENTIAL",
    title: "Drain Cleaning and Power Flushing",
    description:
      "Proper maintenance prevents clogging. We use the latest hydro-jetting technology to keep your drains flowing cleanly and affordably, clearing years of buildup in a single visit.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/drain-cleaning-clean-Sf7sybqH6jYeqQB2Q3NQFk.webp",
    href: "/services/drain-cleaning",
    cta: "Schedule a Cleaning",
  },
  {
    category: "RESIDENTIAL",
    title: "Septic Service and Repairs",
    description:
      "A properly maintained septic system can last for decades. We provide preventative maintenance and a full service line of repairs and replacements on septic beds and sewers.",
    image: "/manus-storage/septic-service_005b9ea5.jpg",
    href: "/services/septic-repairs",
    cta: "Schedule a Service Call",
  },
  {
    category: "RESIDENTIAL",
    title: "Dump Trucks and Machine Excavating",
    description:
      "From deep excavations to parking lot preparation and pool installation, our fleet of dump trucks and excavators handles any earthmoving project with precision and speed.",
    image: "/manus-storage/dump-truck_dcdbedae.jpg",
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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-clean-2snTGdn5gWiZBi5urG5Haa.webp",
    href: "/services/sewer-camera-inspection",
    cta: "Book a Commercial Inspection",
  },
  {
    category: "COMMERCIAL",
    title: "Drain Cleaning and Power Flushing",
    description:
      "High-pressure hydro-jetting to clear commercial drains, grease traps, and industrial lines. We keep your facility running without costly backups or health code violations.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/drain-cleaning-clean-Sf7sybqH6jYeqQB2Q3NQFk.webp",
    href: "/services/drain-cleaning",
    cta: "Schedule a Cleaning",
  },
  {
    category: "COMMERCIAL",
    title: "Municipal Services",
    description:
      "From sewer lining to manhole restoration and water main repair, we deliver effective solutions for all municipal drainage infrastructure needs.",
    image: "/manus-storage/municipal-manhole_9c9d4041.jpg",
    href: "/commercial",
    cta: "Discuss Your Project",
  },
  {
    category: "COMMERCIAL",
    title: "No-Dig Trenchless Systems",
    description:
      "Replace underground pipe without disturbing surface materials or parking lots. Minimal disruption to your business operations, completed in as little as one day.",
    image: "/manus-storage/trenchless-cipp_af2a3f19.jpg",
    href: "/services/trenchless-pipe-repair",
    cta: "Get a Free Assessment",
  },
  {
    category: "COMMERCIAL",
    title: "Sewer Repair and Installation",
    description:
      "Highly trained technicians working to solve commercial sewer and drain problems using the latest products and methods. We minimize downtime and get your business back to normal fast.",
    image: "/manus-storage/sewer-excavation_fd6549ea.jpg",
    href: "/services/sewer-repair-installation",
    cta: "Get a Free Quote",
  },
  {
    category: "COMMERCIAL",
    title: "Dump Trucks and Machine Excavating",
    description:
      "Large-scale earthmoving for commercial sites, parking lots, and infrastructure projects. Our fleet of excavators and dump trucks handles any volume with precision and efficiency.",
    image: "/manus-storage/dump-truck_dcdbedae.jpg",
    href: "/services/excavation-services",
    cta: "Request an Estimate",
  },
  {
    category: "COMMERCIAL",
    title: "Catch Basin Cleaning",
    description:
      "We solve catch basin problems quickly using vacuum trucks and the latest technology. Regular cleaning prevents flooding, property damage, and regulatory compliance issues.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/catch-basin-clean-ggWwSG2AwStSzyju2aT8wZ.webp",
    href: "/services/drain-cleaning",
    cta: "Schedule a Cleaning",
  },
  {
    category: "COMMERCIAL",
    title: "Septic Service and Repairs",
    description:
      "A properly maintained septic system can last for decades. We provide preventative maintenance and a full service line of repairs and replacements on septic beds and sewers for commercial properties.",
    image: "/manus-storage/septic-service_005b9ea5.jpg",
    href: "/services/septic-repairs",
    cta: "Request an Estimate",
  },
];

// ─── Arrow CTA (desktop only — hover expand) ─────────────────────────────────
function ArrowCTA({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
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
  );
}

// ─── RAF lerp scroll hook ─────────────────────────────────────────────────────
// Drives the card track translateX, per-card image parallax, and per-card
// scale from a single RAF loop. No React state is touched during scroll.
//
// Scale strategy:
//   The active card (closest to centre) scales to 1.02.
//   All other cards scale to 0.97.
//   The scale is lerped per-card so it eases in/out smoothly.
function useLerpScroll(
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  imageRefs: React.RefObject<(HTMLDivElement | null)[]>,
  cardRefs: React.RefObject<(HTMLElement | null)[]>,
  count: number,
  activeTab: string,
  onActiveIdxChange: (idx: number) => void
) {
  const trackRef = useRef<HTMLDivElement>(null);

  // 0.15 = snappy but still has a pleasant ease-out feel
  const LERP = 0.15;
  // Parallax strength: how many px the image moves per px of card offset.
  // 0.2 gives a more pronounced, dramatic 3D depth feel.
  const PARALLAX_FACTOR = 0.2;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Reset immediately on tab change
    track.style.transform = "translateX(0px)";
    const imgs = imageRefs.current ?? [];
    imgs.forEach((el) => {
      if (el) el.style.transform = "translateX(0px)";
    });
    const cards = cardRefs.current ?? [];
    cards.forEach((el) => {
      if (el) el.style.transform = "scale(1)";
    });

    let currentX = 0;
    let targetX = 0;
    let rafId = 0;
    let lastActiveIdx = 0;
    // Per-card lerped scale values (start at 1 for all)
    const cardScales: number[] = Array.from({ length: count }, () => 1);

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
      // Translate far enough so the last card is fully visible in the viewport.
      // 0.85 ensures each card from 1 to (count-1) scrolls fully into view
      // before the section releases. The card is 74% wide so 0.85 of a step
      // brings the right edge of the last card close to the viewport centre.
      const maxTranslate = stepPx * (count - 1) * 0.85;

      return -(progress * maxTranslate);
    };

    const tick = () => {
      targetX = computeTarget();

      // Lerp toward target
      currentX += (targetX - currentX) * LERP;
      if (Math.abs(targetX - currentX) < 0.05) currentX = targetX;

      // Apply track translation
      track.style.transform = `translateX(${currentX}px)`;

      // ── Parallax: each image panel moves opposite to the track ──────────
      const containerW = wrapper.offsetWidth;
      const cardW = containerW * 0.74;
      const gap = containerW * 0.025;
      const stepPx = cardW + gap;

      const currentImgs = imageRefs.current ?? [];
      currentImgs.forEach((imgEl, i) => {
        if (!imgEl) return;
        // Offset of this card's natural position relative to currentX
        // When card i is perfectly in view: cardOffset ≈ 0
        const cardNaturalX = i * stepPx; // where card i sits in the track
        const cardOffset = cardNaturalX + currentX; // how far it is from the left edge
        // Shift the background in the opposite direction, scaled down
        const parallaxX = -cardOffset * PARALLAX_FACTOR;
        imgEl.style.transform = `translateX(${parallaxX}px)`;
      });

      // Active index from lerped position for smooth dot tracking
      const rawIdx = stepPx > 0 ? -currentX / stepPx : 0;
      const newIdx = Math.min(count - 1, Math.max(0, Math.round(rawIdx)));
      if (newIdx !== lastActiveIdx) {
        lastActiveIdx = newIdx;
        onActiveIdxChange(newIdx);
      }

      // ── Per-card scale: active = 1.02, inactive = 0.97 ──────────────────
      const SCALE_ACTIVE = 1.02;
      const SCALE_INACTIVE = 0.97;
      const SCALE_LERP = 0.1; // slightly slower than position for a floaty feel
      const currentCards = cardRefs.current ?? [];
      currentCards.forEach((cardEl, i) => {
        if (!cardEl) return;
        const targetScale = i === newIdx ? SCALE_ACTIVE : SCALE_INACTIVE;
        cardScales[i] = (cardScales[i] ?? 1) + (targetScale - (cardScales[i] ?? 1)) * SCALE_LERP;
        cardEl.style.transform = `scale(${cardScales[i].toFixed(4)})`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, activeTab]);

  return trackRef;
}

// ─── Mobile card (portrait: image on top, text below) ────────────────────────
// Each card has a solid white background so it fully covers the card beneath it
// when the sticky-stacking effect slides it into view.
function MobileServiceCard({
  service,
  isFirst,
  activeTab,
  stackIndex,
}: {
  service: ServiceCard;
  isFirst: boolean;
  activeTab: string;
  stackIndex: number;
}) {
  // The sticky offset: each card sticks at top:24px.
  // Later cards (higher stackIndex) have a higher z-index so they paint on top.
  return (
    <div
      style={{
        position: "sticky",
        top: "64px",
        zIndex: stackIndex + 1,
        // Solid background is essential — without it the card below shows through
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        // Subtle shadow so stacked cards have visible depth separation
        boxShadow: "0 4px 24px rgba(15,23,42,0.10)",
      }}
    >
      <Link href={service.href} style={{ textDecoration: "none", display: "block" }}>
        {/* Image — full width, fixed height */}
        <div style={{ position: "relative", width: "100%", height: "260px", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#CBD5E1",
            }}
          />
          {/* Flagship badge — only on first residential card */}
          {activeTab === "residential" && isFirst && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "#FBBF24",
                boxShadow: "0 2px 8px rgba(251,191,36,0.45)",
                zIndex: 1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#92400E" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#92400E", fontFamily: "'Inter Tight', sans-serif", whiteSpace: "nowrap" }}>
                Free Camera Inspection
              </span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div style={{ padding: "20px", backgroundColor: "#F1F5F9" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: "8px",
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            {service.category}
          </p>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "'Inter Tight', sans-serif",
              lineHeight: "1.3",
              marginBottom: "10px",
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#475569",
              lineHeight: "1.6",
              marginBottom: "16px",
            }}
          >
            {service.description}
          </p>
          {/* Simple text CTA with arrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#2563EB",
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            {service.cta}
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ScrollServicesSection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const services = activeTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;
  const count = services.length;

  // Refs for each card's image panel — populated via callback refs below
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Refs for each card wrapper — used for scale animation
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Detect mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset active dot and image refs when tab changes
  useEffect(() => {
    setActiveIdx(0);
    imageRefs.current = [];
    cardRefs.current = [];
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

  const trackRef = useLerpScroll(wrapperRef, imageRefs, cardRefs, count, activeTab, setActiveIdx);

  // 320px scroll travel per card — enough room for the lerp to ease each card
  // fully into view before the section releases the sticky scroll trap.
  const scrollTravel = (count - 1) * 320;

  // ── Shared section header ──────────────────────────────────────────────────
  const SectionHeader = () => (
    <div className="container pt-12 pb-8 flex items-start justify-between flex-wrap gap-4">
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
  );

  // ── MOBILE LAYOUT: SwiftForm-style sticky-stacking cards ──────────────────
  // Each card wrapper is position:sticky; top:24px.
  // Cards are stacked vertically in a single column.
  // As the user scrolls, each card slides up and stacks over the previous one
  // (later DOM elements naturally paint on top — no JS needed).
  // The container must be tall enough so each card has scroll room before it sticks.
  // We give it a bottom padding equal to (count - 1) * card-height so the last
  // card has room to fully slide in before the section ends.
  if (isMobile) {
    return (
      <div id="services-section" style={{ backgroundColor: "#FFFFFF" }}>
        <SectionHeader />
        {/* Stacking container: cards stack via position:sticky, no extra bottom padding needed */}
        <div
          className="container"
          style={{
            paddingBottom: "48px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {services.map((service, i) => (
            <MobileServiceCard
              key={`${activeTab}-${i}`}
              service={service}
              isFirst={i === 0}
              activeTab={activeTab}
              stackIndex={i}
            />
          ))}

          {/* Full-width View All Services CTA — immediately after last stacked card */}
          <Link
            href={`/services?tab=${activeTab}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "18px 24px",
              borderRadius: "16px",
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "'Inter Tight', sans-serif",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(37,99,235,0.30)",
              marginTop: "4px",
            }}
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // ── DESKTOP LAYOUT: sticky scroll trap with lerp animation ─────────────────
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
        <SectionHeader />

        {/* Card track + CTA row */}
        <div className="container overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: "2.5%", willChange: "transform" }}
          >
            {services.map((service, i) => (
              <Link
                key={`${activeTab}-${i}`}
                href={service.href}
                ref={(el: HTMLAnchorElement | null) => { cardRefs.current[i] = el; }}
                className="flex-shrink-0 rounded-2xl overflow-hidden flex"
                style={{
                  width: "74%",
                  height: "400px",
                  border: "1px solid #E2E8F0",
                  willChange: "transform",
                  transformOrigin: "center center",
                  textDecoration: "none",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                {/* Left: image panel — overflow hidden so parallax shift stays clipped */}
                <div
                  className="flex-shrink-0 relative overflow-hidden"
                  style={{ width: "42%" }}
                >
                  {/* Inner image div — this is what gets the parallax translateX.
                      It is slightly wider than its container so the shift never
                      reveals a gap at the edges. */}
                  <div
                    ref={(el) => { imageRefs.current[i] = el; }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      // Extra width on each side to absorb the parallax travel
                      left: "-8%",
                      right: "-8%",
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "#CBD5E1",
                      willChange: "transform",
                    }}
                  />

                  {/* Flagship badge — only on the first residential card */}
                  {activeTab === "residential" && i === 0 && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "#FBBF24",
                        boxShadow: "0 2px 8px rgba(251,191,36,0.45)",
                        zIndex: 1,
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
                    <ArrowCTA label={service.cta} />

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
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTAs — inside sticky container, directly below the card track */}
        <div
          className="flex justify-center items-center gap-4"
          style={{ marginTop: "28px" }}
        >
          {/* Primary: View All Services */}
          <Link
            href={`/services?tab=${activeTab}`}
            className="flex items-center gap-2 font-semibold rounded-full"
            style={{
              backgroundColor: "#0080ff",
              color: "#ffffff",
              padding: "14px 32px",
              fontSize: "15px",
              fontFamily: "'Inter Tight', sans-serif",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,128,255,0.35)",
              transition: "background-color 0.2s, box-shadow 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0060d0";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(0,128,255,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0080ff";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,128,255,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
            }}
          >
            View All Services
            <ArrowRight size={15} />
          </Link>

          {/* Ghost: Get a Free Quote */}
          <Link
            href="/contact"
            className="flex items-center gap-2 font-semibold rounded-full"
            style={{
              backgroundColor: "transparent",
              color: "#0080ff",
              padding: "13px 32px",
              fontSize: "15px",
              fontFamily: "'Inter Tight', sans-serif",
              textDecoration: "none",
              border: "2px solid #0080ff",
              transition: "background-color 0.2s, color 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,128,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
            }}
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
