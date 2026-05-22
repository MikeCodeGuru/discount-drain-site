import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { Link } from "wouter";

export interface GalleryItem {
  src: string;
  alt: string;
  type?: "image" | "video";
  caption?: string;
  label?: "before" | "after" | string; // optional badge label
  poster?: string; // poster image for video tiles
}

interface ServiceGalleryProps {
  items: GalleryItem[];
  title?: string;
  serviceSlug?: string;
}

export default function ServiceGallery({ items, title = "Project Gallery", serviceSlug }: ServiceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setLightboxIndex(null);
  };

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    if (videoRef.current) videoRef.current.pause();
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  }, [lightboxIndex, items.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    if (videoRef.current) videoRef.current.pause();
    setLightboxIndex((lightboxIndex + 1) % items.length);
  }, [lightboxIndex, items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  if (!items || items.length === 0) return null;

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;
  const gridItems = items.slice(0, 9);

  // Label badge colors
  const getLabelStyle = (label: string) => {
    if (label.toLowerCase() === "before") {
      return { background: "rgba(239,68,68,0.9)", color: "#fff" };
    }
    if (label.toLowerCase() === "after") {
      return { background: "rgba(22,151,194,0.95)", color: "#fff" };
    }
    return { background: "rgba(0,128,255,0.85)", color: "#fff" };
  };

  return (
    <section
      style={{
        padding: "80px 0 0",
        background: "#F4F8FF",
        borderTop: "1px solid #dce8f7",
      }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div style={{ width: "32px", height: "2px", background: "#0080ff" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0080ff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Our Work
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              marginTop: "10px",
              fontSize: "15px",
              color: "#555555",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              maxWidth: "520px",
            }}
          >
            Browse real photos and videos from our job sites. Click any image or video to view full screen.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "220px",
            gap: "10px",
          }}
          className="gallery-grid"
        >
          {gridItems.map((item, i) => {
            const isHero = i === 0;
            const isVideo = item.type === "video";
            return (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                style={{
                  gridColumn: isHero ? "span 2" : "span 1",
                  gridRow: isHero ? "span 2" : "span 1",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                  cursor: isVideo ? "pointer" : "zoom-in",
                  background: "#dce8f7",
                }}
                className="gallery-thumb"
              >
                {isVideo ? (
                  /* Video tile — shows poster or dark background with play icon */
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: item.poster
                        ? `url(${item.poster}) center/cover no-repeat`
                        : "linear-gradient(135deg, #0060d0 0%, #003a8c 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Dark overlay for readability */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                      }}
                    />
                    {/* Play button */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        transition: "transform 0.2s ease",
                      }}
                      className="gallery-play-btn"
                    >
                      <Play size={26} style={{ color: "#0060d0", marginLeft: "3px" }} fill="#0060d0" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                )}

                {/* Hover overlay for images */}
                {!isVideo && (
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,60,160,0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <div
                      className="gallery-icon"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transform: "scale(0.8)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      <ZoomIn size={20} style={{ color: "#0060d0" }} />
                    </div>
                  </div>
                )}

                {/* Before/After or custom label badge */}
                {item.label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      ...getLabelStyle(item.label),
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      zIndex: 3,
                    }}
                  >
                    {item.label}
                  </div>
                )}

                {/* Video badge */}
                {isVideo && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(0,96,208,0.85)",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      zIndex: 3,
                    }}
                  >
                    <Play size={9} fill="#fff" />
                    VIDEO
                  </div>
                )}

                {/* Caption on hero tile */}
                {isHero && item.caption && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 20px 16px",
                      background: "linear-gradient(to top, rgba(0,30,80,0.8) 0%, transparent 100%)",
                      zIndex: 2,
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 600,
                        margin: 0,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {items.length > 9 && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#888",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textAlign: "center",
            }}
          >
            Showing 9 of {items.length} items. Call us to see more of our work.
          </p>
        )}

        {/* CTA below gallery */}
        <div
          style={{
            marginTop: "48px",
            paddingBottom: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#111111",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: 0,
            }}
          >
            Ready to get started? We offer free estimates and same-day service.
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#555555",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: 0,
              maxWidth: "420px",
            }}
          >
            Every service call includes a free sewer camera inspection — a $400 value at no charge.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
            <Link href="/quote">
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#0080ff",
                  color: "#fff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "background 0.2s ease, transform 0.15s ease",
                  boxShadow: "0 4px 16px rgba(0,128,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0060d0";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0080ff";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Get a Free Quote
              </a>
            </Link>
            <a
              href="tel:5194518342"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#0080ff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                border: "2px solid #0080ff",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#0080ff";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#0080ff";
              }}
            >
              Call 519-451-8342
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5,10,25,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10000,
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            {lightboxIndex + 1} / {items.length}
          </div>

          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {currentItem.type === "video" ? (
              <video
                key={lightboxIndex}
                ref={videoRef}
                src={currentItem.src}
                controls
                autoPlay
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  borderRadius: "8px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                  background: "#000",
                }}
              />
            ) : (
              <img
                key={lightboxIndex}
                src={currentItem.src}
                alt={currentItem.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                }}
              />
            )}
            {currentItem.caption && (
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {currentItem.caption}
              </p>
            )}
          </div>

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
              }}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}

      {/* Hover styles */}
      <style>{`
        .gallery-thumb:hover .gallery-overlay {
          background: rgba(0,60,160,0.4) !important;
        }
        .gallery-thumb:hover .gallery-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        .gallery-thumb:hover img {
          transform: scale(1.05);
        }
        .gallery-thumb:hover .gallery-play-btn {
          transform: scale(1.1);
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 160px !important;
          }
          .gallery-grid > div:first-child {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
