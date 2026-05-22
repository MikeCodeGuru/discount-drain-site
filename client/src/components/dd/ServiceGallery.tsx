import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";

export interface GalleryItem {
  src: string;
  alt: string;
  type?: "image" | "video";
  caption?: string;
}

interface ServiceGalleryProps {
  items: GalleryItem[];
  title?: string;
}

export default function ServiceGallery({ items, title = "Project Gallery" }: ServiceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  }, [lightboxIndex, items.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
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

  // Build a masonry-style grid layout
  // First item is large (spans 2 cols on desktop), rest are standard
  const gridItems = items.slice(0, 9); // cap at 9 for clean grid

  return (
    <section
      style={{
        padding: "80px 0",
        background: "#F9F7F0",
        borderTop: "1px solid #E8E9EC",
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
            <div style={{ width: "32px", height: "2px", background: "#FEDA86" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9CA3AF",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Our Work
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Taviraj', Georgia, serif",
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 600,
              color: "#1A1B20",
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
              color: "#6B7280",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              maxWidth: "520px",
            }}
          >
            Browse real photos from our job sites. Click any image to view it full screen.
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
            // First item spans 2 cols + 2 rows for visual anchor
            const isHero = i === 0;
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
                  cursor: "zoom-in",
                  background: "#E8E9EC",
                }}
                className="gallery-thumb"
              >
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
                {/* Hover overlay */}
                <div
                  className="gallery-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(26,27,32,0)",
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
                    {item.type === "video" ? (
                      <Play size={20} style={{ color: "#3F4049" }} />
                    ) : (
                      <ZoomIn size={20} style={{ color: "#3F4049" }} />
                    )}
                  </div>
                </div>
                {/* Video badge */}
                {item.type === "video" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(26,27,32,0.75)",
                      color: "#FEDA86",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <Play size={10} />
                    VIDEO
                  </div>
                )}
                {/* Caption on hero */}
                {isHero && item.caption && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 20px 16px",
                      background: "linear-gradient(to top, rgba(26,27,32,0.75) 0%, transparent 100%)",
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

        {/* "View more" note if more than 9 items */}
        {items.length > 9 && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#9CA3AF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textAlign: "center",
            }}
          >
            Showing 9 of {items.length} photos. Call us to see more of our work.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10,10,14,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Close button */}
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
              transition: "background 0.2s",
              zIndex: 10000,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
            aria-label="Close lightbox"
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
              letterSpacing: "0.05em",
            }}
          >
            {lightboxIndex + 1} / {items.length}
          </div>

          {/* Prev button */}
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
                transition: "background 0.2s",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(254,218,134,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
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

          {/* Next button */}
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
                transition: "background 0.2s",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(254,218,134,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}

      {/* Hover styles via global CSS injection */}
      <style>{`
        .gallery-thumb:hover .gallery-overlay {
          background: rgba(26,27,32,0.45) !important;
        }
        .gallery-thumb:hover .gallery-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        .gallery-thumb:hover img {
          transform: scale(1.05);
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
