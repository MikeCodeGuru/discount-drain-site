import { useEffect, useState } from "react";
import { X, Phone, Camera } from "lucide-react";

const SESSION_KEY = "dd_scroll_banner_dismissed";
const TRIGGER_DEPTH = 0.70;

export default function ScrollDepthBanner() {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // If already dismissed this session, never show
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = scrolled / total;
      if (depth >= TRIGGER_DEPTH) {
        setRendered(true);
        // Small delay so the element is in the DOM before we trigger the slide-in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    // Remove from DOM after transition completes
    setTimeout(() => setRendered(false), 400);
  };

  if (!rendered) return null;

  return (
    <div
      role="dialog"
      aria-label="Special offer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        // Prevent the banner from covering the sticky mobile CTA bar if present
        willChange: "transform",
      }}
    >
      {/* Backdrop shadow line */}
      <div
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 100%)",
          height: "24px",
          marginBottom: "-1px",
          pointerEvents: "none",
        }}
      />

      {/* Banner body */}
      <div
        style={{
          backgroundColor: "#3F4049",
          borderTop: "3px solid #FEDA86",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {/* Camera icon accent */}
        <div
          style={{
            flexShrink: 0,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#FEDA86",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Camera size={22} color="#3F4049" strokeWidth={2} />
        </div>

        {/* Copy */}
        <div style={{ flex: "1 1 220px", minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'Taviraj', Georgia, serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            Get Your{" "}
            <span style={{ color: "#FEDA86" }}>FREE $400 Camera Inspection</span>
          </p>
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.72)",
              margin: "4px 0 0",
              lineHeight: 1.4,
            }}
          >
            See exactly what's happening inside your pipes — included with every service call.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <a
            href="tel:5194518342"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              backgroundColor: "#FEDA86",
              color: "#3F4049",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              padding: "11px 20px",
              borderRadius: "0px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
          >
            <Phone size={14} strokeWidth={2.5} />
            Call Now
          </a>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              padding: "11px 20px",
              borderRadius: "0px",
              border: "1.5px solid rgba(255,255,255,0.35)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
          >
            Request Online
          </a>
        </div>

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss offer"
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.55)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
