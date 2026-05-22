import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** "light" = white text for dark hero backgrounds; "dark" = charcoal text for light page backgrounds */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Reusable breadcrumb navigation component.
 * Renders a visual breadcrumb trail and can be paired with a BreadcrumbList JSON-LD
 * script tag in the parent page for structured data.
 *
 * Usage:
 *   <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Drain Cleaning" }]} />
 */
export default function Breadcrumb({ items, variant = "dark", className = "" }: BreadcrumbProps) {
  const isLight = variant === "light";

  const linkColor = isLight ? "rgba(255,255,255,0.7)" : "#0080ff";
  const separatorColor = isLight ? "rgba(255,255,255,0.4)" : "#c0cdd8";
  const currentColor = isLight ? "#ffffff" : "#3F4049";

  return (
    <nav
      aria-label="breadcrumb"
      className={`flex items-center flex-wrap gap-1 text-sm ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <span key={index} className="flex items-center gap-1">
            {isFirst && (
              <Home
                size={13}
                style={{ color: isLast ? currentColor : linkColor, flexShrink: 0, marginRight: "2px" }}
              />
            )}
            {isLast || !item.href ? (
              <span
                style={{
                  color: currentColor,
                  fontWeight: isLast ? 600 : 400,
                  maxWidth: "260px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {item.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight
                size={13}
                style={{ color: separatorColor, flexShrink: 0 }}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}

/**
 * Generates a BreadcrumbList JSON-LD object for use in a <script> tag.
 * Pass the output to dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[], baseUrl = "https://discountdrain.ca") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href.startsWith("http") ? item.href : `${baseUrl}${item.href}` } : {}),
    })),
  };
}
