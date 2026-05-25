import { useEffect, useRef, useState } from "react";
import { X, Phone, Camera } from "lucide-react";

const SESSION_KEY = "dd_scroll_banner_dismissed";
const TRIGGER_DEPTH = 0.70;
const AUTO_DISMISS_MS = 6000; // slide away after 6 seconds

export default function ScrollDepthBanner() {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);

  const dismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setRendered(false), 400);
  };

  const startAutoDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!hoveringRef.current) dismiss();
    }, AUTO_DISMISS_MS);
  };

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = scrolled / total;
      if (depth >= TRIGGER_DEPTH) {
        setRendered(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisible(true);
            startAutoDismiss();
          });
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
        willChange: "transform",
      }}
      onMouseEnter={() => {
        hoveringRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        startAutoDismiss();
      }}
    >
      {/* Subtle top shadow */}
      <div
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 100%)",
          height: "16px",
          marginBottom: "-1px",
          pointerEvents: "none",
        }}
      />

      {/* Banner body */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "3px solid #FEDA86",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.10)",
          padding: "18px 24px 20px",
          position: "relative",
        }}
      >
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
            color: "#9CA3AF",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <X size={17} strokeWidth={2} />
        </button>

        {/* ── Desktop layout: icon | centred copy | buttons ── */}
        {/* ── Mobile layout: stacked (icon+copy then buttons) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingRight: "28px",
          }}
        >
          {/* Row 1: icon + copy (centred on desktop) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Camera icon accent */}
            <div
              style={{
                flexShrink: 0,
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                backgroundColor: "#EFF6FF",
                border: "1.5px solid #BFDBFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={20} color="#2563EB" strokeWidth={2} />
            </div>

            {/* Copy — centred text on desktop via flex-1 + text-align */}
            <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#111111",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Claim Your{" "}
                <span style={{ color: "#2563EB" }}>FREE $400 Camera Inspection</span>
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  color: "#6B7280",
                  margin: "4px 0 0",
                  lineHeight: 1.45,
                }}
              >
                See exactly what is happening inside your pipes. Included with every service call at no extra charge.
              </p>
            </div>
          </div>

          {/* Row 2: CTA buttons — full-width equal on mobile, auto-width on desktop */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a
              href="tel:5194518342"
              className="dd-banner-call-btn"
              style={{
                flex: "1 1 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "0px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                textAlign: "center",
              }}
            >
              <Phone size={14} strokeWidth={2.5} />
              Call Now
            </a>
            <a
              href="/contact"
              style={{
                flex: "1 1 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                backgroundColor: "transparent",
                color: "#3F4049",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "0px",
                border: "1.5px solid #D1D5DB",
                textDecoration: "none",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                textAlign: "center",
              }}
            >
              Request Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
