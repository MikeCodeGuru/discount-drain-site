import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

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
    image: "/manus-storage/sewer-camera_89fadfa4.jpg",
    href: "/services/free-camera-inspection",
  },
  {
    category: "RESIDENTIAL",
    title: "No-Dig Trenchless Pipe Repair",
    description:
      "Stop before you let anyone dig up your driveway or landscaping. Our CIPP trenchless technology replaces underground pipe from the inside out with no excavation required.",
    image: "/manus-storage/trenchless-cipp_0e8cbbf0.jpg",
    href: "/services/trenchless-pipe-repair",
  },
  {
    category: "RESIDENTIAL",
    title: "Wet Basement Waterproofing",
    description:
      "We fix wet and leaky basements permanently, backed by a 20-year warranty. Stop basement leaks and protect your home's foundation with our proven waterproofing solutions.",
    image: "/manus-storage/wet-basement_f9b9e799.jpg",
    href: "/services/wet-basement-waterproofing",
  },
  {
    category: "RESIDENTIAL",
    title: "Sewer Repair and Installation",
    description:
      "Our certified technicians solve your sewer and drain problems quickly and professionally. We handle everything from minor repairs to full replacements.",
    image: "/manus-storage/sewer-excavation_2011c5b0.jpg",
    href: "/services/sewer-repair-installation",
  },
  {
    category: "RESIDENTIAL",
    title: "Drain Cleaning and Power Flushing",
    description:
      "Proper maintenance prevents clogging. We use the latest hydro-jetting technology to keep your drains flowing cleanly and affordably, clearing years of buildup in a single visit.",
    image: "/manus-storage/drain-cleaning_89acad85.jpg",
    href: "/services/drain-cleaning",
  },
  {
    category: "RESIDENTIAL",
    title: "Dump Trucks and Machine Excavating",
    description:
      "From deep excavations to parking lot preparation and pool installation, our fleet of dump trucks and excavators handles any earthmoving project with precision and speed.",
    image: "/manus-storage/dump-truck_92b5ca4e.jpg",
    href: "/services/excavation",
  },
];

const COMMERCIAL_SERVICES: ServiceCard[] = [
  {
    category: "COMMERCIAL",
    title: "Sewer Video Camera Inspections",
    description:
      "Commercial-grade video inspection to diagnose sewer and drain problems quickly. We document everything on video so you have a clear record for insurance and compliance.",
    image: "/manus-storage/sewer-camera_89fadfa4.jpg",
    href: "/services/commercial-camera-inspection",
  },
  {
    category: "COMMERCIAL",
    title: "Municipal Services",
    description:
      "From sewer lining to manhole restoration and water main repair, we deliver effective solutions for all municipal drainage infrastructure needs.",
    image: "/manus-storage/municipal-manhole_1ff6ab05.jpg",
    href: "/services/municipal-services",
  },
  {
    category: "COMMERCIAL",
    title: "No-Dig Trenchless Systems",
    description:
      "Replace underground pipe without disturbing surface materials or parking lots. Minimal disruption to your business operations, completed in as little as one day.",
    image: "/manus-storage/trenchless-cipp_0e8cbbf0.jpg",
    href: "/services/commercial-trenchless",
  },
  {
    category: "COMMERCIAL",
    title: "Catch Basin Cleaning",
    description:
      "We solve catch basin problems quickly using vacuum trucks and the latest technology. Regular cleaning prevents flooding, property damage, and regulatory issues.",
    image: "/manus-storage/catch-basin_834522ce.jpg",
    href: "/services/catch-basin-cleaning",
  },
  {
    category: "COMMERCIAL",
    title: "Commercial Sewer Repair",
    description:
      "Highly trained technicians working to solve commercial sewer and drain problems using the latest products and methods. We minimize downtime and get your business back to normal fast.",
    image: "/manus-storage/sewer-excavation_2011c5b0.jpg",
    href: "/services/commercial-sewer-repair",
  },
  {
    category: "COMMERCIAL",
    title: "Septic Service",
    description:
      "Preventative maintenance and a full service line of repairs and replacements on septic beds and sewers for commercial properties and rural businesses across Southwestern Ontario.",
    image: "/manus-storage/septic-service_baff70a9.jpg",
    href: "/services/septic-service",
  },
];

export default function ScrollServicesSection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const services = activeTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;
  const count = services.length;

  // Reset when tab changes
  useEffect(() => {
    setActiveIdx(0);
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(0px)";
    }
  }, [activeTab]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalHeight = wrapper.offsetHeight;
      const vh = window.innerHeight;
      // scrolled = how many px of the wrapper have gone above the viewport top
      const scrolled = -rect.top;
      // scrollable = total scroll distance available in this section
      const scrollable = totalHeight - vh;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      // Card width = 74% of container width, gap = 2.5%
      const containerW = wrapper.offsetWidth;
      const cardW = containerW * 0.74;
      const gap = containerW * 0.025;
      const stepPx = cardW + gap;
      const maxTranslate = stepPx * (count - 1);

      const translateX = -(progress * maxTranslate);
      track.style.transform = `translateX(${translateX}px)`;

      const newIdx = Math.min(count - 1, Math.round(progress * (count - 1)));
      setActiveIdx(newIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [count, activeTab]);

  // Section height: viewport height + scroll travel per card
  // 300px scroll travel per card transition feels natural
  const scrollTravel = (count - 1) * 300;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${scrollTravel}px)` }}
      className="relative"
    >
      {/* Sticky container — fills exactly one viewport, no empty space */}
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

          {/* Tab toggle — top right, matching SwiftForm CTA button position */}
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

        {/* Card track — horizontally panning row */}
        <div className="container overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: "2.5%", willChange: "transform", transition: "transform 0.05s linear" }}
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden flex"
                style={{
                  width: "74%",
                  height: "400px",
                  border: "1px solid #E2E8F0",
                }}
              >
                {/* Left: image panel */}
                <div
                  className="flex-shrink-0"
                  style={{
                    width: "42%",
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#CBD5E1",
                  }}
                />

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

                  {/* Bottom row: arrow CTA + progress dots */}
                  <div className="flex items-center justify-between mt-6">
                    <Link href={service.href}>
                      <button
                        className="flex items-center justify-center rounded-full transition-all hover:opacity-80"
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "#0F172A",
                          color: "#FFFFFF",
                          flexShrink: 0,
                        }}
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <ArrowRight size={18} />
                      </button>
                    </Link>

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
