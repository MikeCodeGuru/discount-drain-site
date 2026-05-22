/**
 * PageLoader — shown while a lazy-loaded route chunk is being fetched.
 *
 * Design tokens:
 *   Charcoal  #3F4049  (background)
 *   Gold      #FEDA86  (spinner accent)
 *   Off-white #F9F7F0  (skeleton shimmer base)
 *
 * Two variants:
 *   "page"   — full-viewport overlay used as the Suspense fallback for top-level routes
 *   "inline" — constrained height for nested lazy sections
 */

interface PageLoaderProps {
  variant?: "page" | "inline";
}

export default function PageLoader({ variant = "page" }: PageLoaderProps) {
  const isPage = variant === "page";

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isPage ? "fixed inset-0 z-50" : "w-full py-24"
      }`}
      style={{ backgroundColor: isPage ? "#F9F7F0" : "transparent" }}
      aria-label="Loading page…"
      role="status"
    >
      {/* Animated logo wordmark */}
      <div className="mb-8 flex flex-col items-center leading-none select-none">
        <span
          style={{
            fontFamily: "'Taviraj', Georgia, serif",
            fontSize: "28px",
            fontWeight: 600,
            color: "#3F4049",
            letterSpacing: "-0.01em",
          }}
        >
          DISCOUNT
        </span>
        <span
          style={{
            fontFamily: "'Taviraj', Georgia, serif",
            fontSize: "28px",
            fontWeight: 600,
            color: "#FEDA86",
            letterSpacing: "-0.01em",
            lineHeight: "1",
          }}
        >
          DRAIN
        </span>
      </div>

      {/* Gold ring spinner */}
      <div className="relative mb-8" style={{ width: 52, height: 52 }}>
        {/* Track ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "4px solid #E8E6DF" }}
        />
        {/* Spinning arc */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "4px solid transparent",
            borderTopColor: "#FEDA86",
            borderRightColor: "#FEDA86",
            animation: "dd-spin 0.8s linear infinite",
          }}
        />
      </div>

      {/* Skeleton content strips — mimic a generic page layout */}
      {isPage && (
        <div className="w-full max-w-md px-6 space-y-3">
          {/* Heading skeleton */}
          <div
            className="rounded"
            style={{
              height: 20,
              width: "72%",
              background: "linear-gradient(90deg, #E8E6DF 25%, #F0EDE6 50%, #E8E6DF 75%)",
              backgroundSize: "200% 100%",
              animation: "dd-shimmer 1.4s ease-in-out infinite",
            }}
          />
          {/* Sub-heading skeleton */}
          <div
            className="rounded"
            style={{
              height: 14,
              width: "55%",
              background: "linear-gradient(90deg, #E8E6DF 25%, #F0EDE6 50%, #E8E6DF 75%)",
              backgroundSize: "200% 100%",
              animation: "dd-shimmer 1.4s ease-in-out 0.1s infinite",
            }}
          />
          {/* Body line 1 */}
          <div
            className="rounded mt-4"
            style={{
              height: 12,
              width: "100%",
              background: "linear-gradient(90deg, #E8E6DF 25%, #F0EDE6 50%, #E8E6DF 75%)",
              backgroundSize: "200% 100%",
              animation: "dd-shimmer 1.4s ease-in-out 0.2s infinite",
            }}
          />
          {/* Body line 2 */}
          <div
            className="rounded"
            style={{
              height: 12,
              width: "88%",
              background: "linear-gradient(90deg, #E8E6DF 25%, #F0EDE6 50%, #E8E6DF 75%)",
              backgroundSize: "200% 100%",
              animation: "dd-shimmer 1.4s ease-in-out 0.3s infinite",
            }}
          />
          {/* Body line 3 */}
          <div
            className="rounded"
            style={{
              height: 12,
              width: "65%",
              background: "linear-gradient(90deg, #E8E6DF 25%, #F0EDE6 50%, #E8E6DF 75%)",
              backgroundSize: "200% 100%",
              animation: "dd-shimmer 1.4s ease-in-out 0.4s infinite",
            }}
          />
        </div>
      )}

      {/* Keyframe styles injected inline so they work without a separate CSS file */}
      <style>{`
        @keyframes dd-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes dd-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
