/**
 * ReviewMarquee
 * Infinite horizontal auto-scrolling ticker of review cards, inspired by the
 * Roofex testimonials-ticker pattern. Uses a pure-CSS @keyframes marquee so
 * there is zero JS dependency and no rAF loop. The card set is duplicated in
 * the DOM so the loop is perfectly seamless. Hovering pauses the animation.
 */

import { Star } from "lucide-react";

interface ReviewCard {
  id: number;
  name: string;
  location: string;
  body: string;
  rating: number;
  serviceType?: string | null;
  avatarColor?: string;
}

const AVATAR_COLORS = [
  "#1697C2",
  "#E8A020",
  "#2E7D32",
  "#7B1FA2",
  "#C62828",
  "#00695C",
  "#1565C0",
  "#AD1457",
];

const REVIEWS: ReviewCard[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "London, ON",
    rating: 5,
    body: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong. Professional, honest, and the price was fair.",
    serviceType: "Sewer Camera Inspection",
    avatarColor: AVATAR_COLORS[0],
  },
  {
    id: 2,
    name: "James T.",
    location: "Strathroy, ON",
    rating: 5,
    body: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands. The job was done in one day.",
    serviceType: "Trenchless Pipe Repair",
    avatarColor: AVATAR_COLORS[1],
  },
  {
    id: 3,
    name: "Linda K.",
    location: "St. Thomas, ON",
    rating: 5,
    body: "Had a wet basement for years. Discount Drain fixed it permanently with a 20-year warranty. Family-owned business that truly cares about their customers.",
    serviceType: "Wet Basement Repair",
    avatarColor: AVATAR_COLORS[2],
  },
  {
    id: 4,
    name: "Robert P.",
    location: "London, ON",
    rating: 5,
    body: "Called at 11pm on a Sunday with a backed-up main sewer. They had a technician at my door within two hours. Problem solved by midnight.",
    serviceType: "Emergency Service",
    avatarColor: AVATAR_COLORS[3],
  },
  {
    id: 5,
    name: "Maria C.",
    location: "Woodstock, ON",
    rating: 5,
    body: "They came out to inspect a slow drain and found a cracked pipe we had no idea about. Fixed it the same day with their trenchless method. No mess, no fuss.",
    serviceType: "Drain Cleaning",
    avatarColor: AVATAR_COLORS[4],
  },
  {
    id: 6,
    name: "Dave H.",
    location: "London, ON",
    rating: 5,
    body: "Used Discount Drain for our commercial property. On time, on budget, and the crew was respectful of our tenants. Will use again without hesitation.",
    serviceType: "Sewer Repair",
    avatarColor: AVATAR_COLORS[5],
  },
  {
    id: 7,
    name: "Karen B.",
    location: "Dorchester, ON",
    rating: 5,
    body: "The technician explained everything clearly before starting. No surprise charges, no upselling — just honest, quality work. Highly recommend.",
    serviceType: "Drain Cleaning",
    avatarColor: AVATAR_COLORS[6],
  },
  {
    id: 8,
    name: "Tom W.",
    location: "London, ON",
    rating: 5,
    body: "Fast response, fair pricing, and excellent workmanship. They replaced our old clay sewer line with minimal disruption to our yard. Outstanding service.",
    serviceType: "Sewer Replacement",
    avatarColor: AVATAR_COLORS[7],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill="#FBBF24"
          stroke="none"
        />
      ))}
    </div>
  );
}

function Card({ review, suffix }: { review: ReviewCard; suffix: string }) {
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="review-marquee-card"
      style={{
        width: "360px",
        flexShrink: 0,
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e8eaed",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        userSelect: "none",
      }}
      aria-hidden={suffix === "-clone" ? "true" : undefined}
    >
      <StarRating rating={review.rating} />
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.65",
          color: "#333333",
          flex: 1,
          marginBottom: "20px",
          fontStyle: "normal",
        }}
      >
        &ldquo;{review.body}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{review.name}</div>
          <div style={{ color: "#8c9baa", fontSize: "12px", marginTop: "1px" }}>{review.location}</div>
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: review.avatarColor ?? "#1697C2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}

export default function ReviewMarquee() {
  return (
    <section
      style={{
        backgroundColor: "#f8f9fa",
        paddingTop: "72px",
        paddingBottom: "72px",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1697C2",
            marginBottom: "10px",
          }}
        >
          Verified Customer Reviews
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 38px)",
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          What Londoners Are Saying
        </h2>
        <p style={{ color: "#777777", fontSize: "15px", marginTop: "10px" }}>
          Family-owned since 1970 · 4.9 ★ on Google · 200+ reviews
        </p>
      </div>

      {/* Ticker wrapper — overflow:hidden clips the track */}
      <div
        className="review-ticker-wrapper"
        style={{ overflow: "hidden", position: "relative" }}
      >
        {/* Left + right fade edges */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "120px",
            height: "100%",
            background: "linear-gradient(to right, #f8f9fa, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "100%",
            background: "linear-gradient(to left, #f8f9fa, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* The scrolling track — duplicated for seamless loop */}
        <div className="review-ticker-track">
          {/* Original set */}
          {REVIEWS.map((r) => (
            <Card key={`orig-${r.id}`} review={r} suffix="" />
          ))}
          {/* Duplicate set — aria-hidden so screen readers skip it */}
          {REVIEWS.map((r) => (
            <Card key={`clone-${r.id}`} review={r} suffix="-clone" />
          ))}
        </div>
      </div>

      {/* Inline keyframe + track styles */}
      <style>{`
        @keyframes reviewMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .review-ticker-track {
          display: flex;
          flex-direction: row;
          gap: 20px;
          width: max-content;
          padding: 8px 10px 16px;
          animation: reviewMarquee 38s linear infinite;
          will-change: transform;
        }

        .review-ticker-wrapper:hover .review-ticker-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .review-ticker-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
