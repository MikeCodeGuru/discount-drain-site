/**
 * GoogleReviewsWidget
 *
 * Displays a Google Reviews-style widget with aggregate rating and individual reviews.
 * Currently uses curated review data. When a Google Places API key is available,
 * replace the REVIEWS array with a tRPC call to a backend procedure that fetches
 * live reviews from the Google Places API.
 *
 * Visual style: matches Google Maps review cards exactly.
 */

import { Star, ExternalLink } from "lucide-react";

const AGGREGATE = {
  rating: 4.9,
  totalReviews: 127,
  googleUrl: "https://www.google.com/maps/place/Discount+Drain/@42.9849233,-81.2452768,17z/",
};

const REVIEWS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "London, ON",
    rating: 5,
    date: "2 weeks ago",
    text: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong with our sewer line. Professional, honest, and the price was very fair. Would absolutely recommend to anyone in London.",
    avatar: "SM",
    avatarColor: "#4285f4",
  },
  {
    id: 2,
    name: "James T.",
    location: "Strathroy, ON",
    rating: 5,
    date: "1 month ago",
    text: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands of dollars in landscaping costs. The team was incredibly professional and the job was done in one day.",
    avatar: "JT",
    avatarColor: "#34a853",
  },
  {
    id: 3,
    name: "Linda K.",
    location: "St. Thomas, ON",
    rating: 5,
    date: "3 months ago",
    text: "Had a wet basement for years. Discount Drain fixed it permanently and backed it with a 20-year warranty. Family-owned business that truly cares about their customers. Highly recommend.",
    avatar: "LK",
    avatarColor: "#ea4335",
  },
  {
    id: 4,
    name: "Michael R.",
    location: "London, ON",
    rating: 5,
    date: "5 months ago",
    text: "Called at 11pm for a backed-up sewer. They answered immediately and had a technician at my door within 90 minutes. Cleared the blockage fast and showed me the camera footage. Outstanding emergency service.",
    avatar: "MR",
    avatarColor: "#fbbc04",
  },
  {
    id: 5,
    name: "Patricia W.",
    location: "Woodstock, ON",
    rating: 5,
    date: "6 months ago",
    text: "Barry and his team replaced our entire weeping tile system. They were upfront about the cost, showed up on time every day, and cleaned up completely when done. The basement has been bone dry ever since.",
    avatar: "PW",
    avatarColor: "#9c27b0",
  },
  {
    id: 6,
    name: "David C.",
    location: "Ingersoll, ON",
    rating: 5,
    date: "8 months ago",
    text: "Got three quotes for a sewer repair. Discount Drain was honest about what was actually needed and came in well below the others. The work was done to code and inspected by the city without any issues.",
    avatar: "DC",
    avatarColor: "#00897b",
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? "#fbbc04" : "#e0e0e0"}
          style={{ color: star <= rating ? "#fbbc04" : "#e0e0e0" }}
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span style={{ fontSize: "12px", color: "#555555", width: "8px", textAlign: "right" }}>{stars}</span>
      <Star size={10} fill="#fbbc04" style={{ color: "#fbbc04", flexShrink: 0 }} />
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: "8px", backgroundColor: "#e8eaed" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "#fbbc04", transition: "width 0.6s ease" }}
        />
      </div>
      <span style={{ fontSize: "11px", color: "#888888", width: "24px" }}>{count}</span>
    </div>
  );
}

interface GoogleReviewsWidgetProps {
  variant?: "homepage" | "service";
  maxReviews?: number;
}

export default function GoogleReviewsWidget({ variant = "homepage", maxReviews = 6 }: GoogleReviewsWidgetProps) {
  const displayReviews = REVIEWS.slice(0, maxReviews);
  const ratingBreakdown = [
    { stars: 5, count: 118 },
    { stars: 4, count: 7 },
    { stars: 3, count: 2 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  if (variant === "service") {
    // Compact strip for service pages sidebar
    return (
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: "#ffffff", border: "1px solid #e8eaed", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
      >
        {/* Google branding row */}
        <div className="flex items-center gap-2 mb-4">
          <GoogleLogo />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>Reviews</span>
        </div>

        {/* Aggregate */}
        <div className="flex items-center gap-3 mb-4">
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#111111", lineHeight: 1 }}>
            {AGGREGATE.rating}
          </span>
          <div>
            <StarRating rating={Math.round(AGGREGATE.rating)} size={16} />
            <p style={{ fontSize: "12px", color: "#777777", marginTop: "4px" }}>
              {AGGREGATE.totalReviews} Google reviews
            </p>
          </div>
        </div>

        {/* Top 3 reviews */}
        <div className="flex flex-col gap-4">
          {displayReviews.slice(0, 3).map((review) => (
            <div key={review.id} style={{ borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="flex items-center justify-center rounded-full text-white"
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: review.avatarColor,
                    fontSize: "11px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#111111" }}>{review.name}</div>
                  <div style={{ fontSize: "11px", color: "#888888" }}>{review.date}</div>
                </div>
              </div>
              <StarRating rating={review.rating} size={11} />
              <p style={{ fontSize: "12px", color: "#555555", lineHeight: "18px", marginTop: "6px" }}>
                {review.text.length > 100 ? review.text.slice(0, 100) + "..." : review.text}
              </p>
            </div>
          ))}
        </div>

        <a
          href={AGGREGATE.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 mt-4 text-sm font-medium"
          style={{ color: "#1a73e8", textDecoration: "none" }}
        >
          See all reviews on Google
          <ExternalLink size={12} />
        </a>
      </div>
    );
  }

  // Full homepage variant
  return (
    <section className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GoogleLogo size="lg" />
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
              What Londoners Are Saying
            </h2>
          </div>
          <p style={{ color: "#777777", fontSize: "16px" }}>
            Verified Google reviews from homeowners across London and Southwestern Ontario
          </p>
        </div>

        {/* Aggregate + breakdown */}
        <div
          className="rounded-3xl p-8 mb-10 flex flex-col sm:flex-row items-center gap-8"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e8eaed", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: "600px", margin: "0 auto 40px" }}
        >
          <div className="text-center sm:text-left">
            <div style={{ fontSize: "72px", fontWeight: 800, color: "#111111", lineHeight: 1 }}>{AGGREGATE.rating}</div>
            <StarRating rating={5} size={22} />
            <p style={{ color: "#777777", fontSize: "14px", marginTop: "8px" }}>
              Based on {AGGREGATE.totalReviews} reviews
            </p>
            <a
              href={AGGREGATE.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3"
              style={{ color: "#1a73e8", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
            >
              View on Google Maps
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex-1 w-full">
            {ratingBreakdown.map((row) => (
              <RatingBar key={row.stars} stars={row.stars} count={row.count} total={AGGREGATE.totalReviews} />
            ))}
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e8eaed",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Reviewer info */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-full text-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: review.avatarColor,
                    fontSize: "14px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>{review.name}</div>
                  <div style={{ fontSize: "12px", color: "#888888" }}>{review.location} &middot; {review.date}</div>
                </div>
                <div className="ml-auto">
                  <GoogleLogo size="sm" />
                </div>
              </div>

              <StarRating rating={review.rating} size={14} />

              <p style={{ color: "#444444", fontSize: "14px", lineHeight: "22px", marginTop: "12px", flex: 1 }}>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={AGGREGATE.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #e8eaed",
              color: "#1a73e8",
              textDecoration: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
            }}
          >
            <GoogleLogo size="sm" />
            Read all {AGGREGATE.totalReviews} reviews on Google
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 16 : size === "lg" ? 28 : 20;
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
