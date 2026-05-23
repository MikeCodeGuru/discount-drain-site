import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import BackToTop from "@/components/dd/BackToTop";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
} from "lucide-react";

const LOGO_URL = "/manus-storage/discount-drain-logo-transparent_1c22873b.png";

const NAV_LINKS = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Residential", href: "/residential", servicesTab: "residential" as const },
  { label: "Commercial", href: "/commercial", servicesTab: "commercial" as const },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Service Area", href: "/service-area" },
];

const SERVICE_LINKS = [
  { label: "Free Sewer Camera Inspection", href: "/services/sewer-camera-inspection" },
  { label: "No-Dig Trenchless Repair", href: "/services/trenchless-pipe-repair" },
  { label: "Wet Basement Waterproofing", href: "/services/wet-basement-repair" },
  { label: "Sewer Repair and Installation", href: "/services/sewer-repair-installation" },
  { label: "Drain Cleaning and Power Flushing", href: "/services/drain-cleaning" },
  { label: "Excavation Services", href: "/services/excavation-services" },
  { label: "Catch Basin Cleaning", href: "/services/catch-basin-cleaning" },
  { label: "Septic Service and Repairs", href: "/services/septic-repairs" },
  { label: "Municipal Services", href: "/services/municipal-services" },
];

interface DDLayoutProps {
  children: React.ReactNode;
  hideAnnouncement?: boolean;
}

export default function DDLayout({ children, hideAnnouncement = false }: DDLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location, navigate] = useLocation();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  // On homepage: scroll to services section and switch tab.
  // On other pages: navigate to the full page.
  const handleServicesTabLink = (
    e: React.MouseEvent,
    tab: "residential" | "commercial",
    href: string
  ) => {
    e.preventDefault();
    if (location === "/") {
      const section = document.getElementById("services-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("services:setTab", { detail: tab }));
        }, 150);
      }
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clean up close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Announcement Bar */}
      {!hideAnnouncement && (
        <div style={{ backgroundColor: "#0080ff" }} className="py-2.5 px-4 text-center">
          <p className="text-sm font-semibold text-white">
            Free Sewer Video Camera Inspection with every service call. A $400 value, at no charge.{" "}
            <a href="tel:5194518342" className="underline font-bold text-white hover:text-blue-100 transition-colors">
              Call 519-451-8342
            </a>
          </p>
        </div>
      )}

      {/* Top Contact Bar */}
      <div style={{ backgroundColor: "#111111" }} className="py-2 px-4 hidden md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:5194518342" className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors">
              <Phone size={12} />
              <span>519-451-8342</span>
            </a>
            <a href="mailto:office@discountdrain.ca" className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors">
              <Mail size={12} />
              <span>office@discountdrain.ca</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <MapPin size={12} />
              <span>London and Southwestern Ontario</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Clock size={12} />
            <span className="font-semibold text-white">24/7 Emergency Service Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="sticky top-0 z-50 bg-white transition-shadow duration-200"
        style={{
          borderBottom: "1px solid #dee0e4",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img
              src={LOGO_URL}
              alt="Discount Drain"
              style={{ height: "72px", width: "auto" }}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors"
                    style={{ color: location.startsWith("/services") ? "#0080ff" : "#222222" }}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Mega-menu */}
                  {servicesOpen && (
                    <div
                      className="absolute z-50"
                      onMouseEnter={openMenu}
                      onMouseLeave={scheduleClose}
                      style={{
                        top: "calc(100% + 4px)",
                        left: "-24px",
                        width: "640px",
                        background: "#FFFFFF",
                        border: "1px solid #E8E9EC",
                        borderRadius: "20px",
                        boxShadow: "0 24px 64px rgba(26,27,32,0.14), 0 4px 16px rgba(26,27,32,0.06)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Top section: 2-col grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>

                        {/* Left col: service links */}
                        <div style={{ padding: "24px 8px 24px 24px", borderRight: "1px solid #F0F1F3" }}>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.16em",
                              textTransform: "uppercase" as const,
                              color: "#9CA3AF",
                              marginBottom: "12px",
                              paddingLeft: "8px",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                          >
                            Services
                          </p>
                          {SERVICE_LINKS.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "9px 10px",
                                borderRadius: "10px",
                                fontSize: "13.5px",
                                fontWeight: 500,
                                color: "#1A1B20",
                                textDecoration: "none",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                transition: "background 0.15s, color 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "#EBF4FF";
                                (e.currentTarget as HTMLAnchorElement).style.color = "#0060d0";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                                (e.currentTarget as HTMLAnchorElement).style.color = "#1A1B20";
                              }}
                            >
                              {/* Blue dot accent */}
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: "#0080ff",
                                  flexShrink: 0,
                                }}
                              />
                              {s.label}
                            </Link>
                          ))}
                        </div>

                        {/* Right col: featured card */}
                        <div
                          style={{
                            padding: "24px",
                            background: "#F8F9FA",
                            display: "flex",
                            flexDirection: "column" as const,
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase" as const,
                                color: "#9CA3AF",
                                marginBottom: "12px",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              Featured
                            </p>
                            {/* Featured service image */}
                            <div
                              style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                                marginBottom: "14px",
                                aspectRatio: "16/9",
                                background: "#E8E9EC",
                              }}
                            >
                              <img
                                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp"
                                alt="Free sewer camera inspection"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </div>
                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#1A1B20",
                                marginBottom: "6px",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              Free Camera Inspection
                            </p>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#6B7280",
                                lineHeight: 1.5,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              A $400 value — included with every service call.
                            </p>
                          </div>
                          <Link
                            href="/services/sewer-camera-inspection"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              marginTop: "14px",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#0060d0",
                              textDecoration: "none",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              letterSpacing: "0.01em",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = "#0040a0";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = "#0060d0";
                            }}
                          >
                            Learn more
                            <span style={{ fontSize: "14px" }}>→</span>
                          </Link>
                        </div>
                      </div>

                      {/* Bottom CTA strip */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 24px",
                          borderTop: "1px solid #F0F1F3",
                          background: "#FAFAFA",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          Serving London, ON &amp; surrounding areas
                        </span>
                        <Link
                          href="/services"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 18px",
                            borderRadius: "999px",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            backgroundColor: "#0080ff",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            letterSpacing: "0.01em",
                            transition: "background 0.18s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0060d0";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0080ff";
                          }}
                        >
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : link.servicesTab ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleServicesTabLink(e, link.servicesTab!, link.href)}
                  className="px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  style={{ color: location === link.href ? "#0080ff" : "#222222", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold rounded-full transition-colors"
                  style={{ color: location === link.href ? "#0080ff" : "#222222" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/quote" className="btn-outline" style={{ padding: "10px 20px", fontSize: "14px" }}>
              Free Quote
            </Link>
            <a href="tel:5194518342" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
              <Phone size={14} />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} style={{ color: "#111111" }} /> : <Menu size={22} style={{ color: "#111111" }} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden bg-white"
            style={{ borderTop: "1px solid #dee0e4" }}
          >
            <div className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.servicesTab ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleServicesTabLink(e, link.servicesTab!, link.href)}
                    className="py-3 px-3 text-sm font-semibold rounded-xl transition-colors hover:bg-blue-50 cursor-pointer"
                    style={{ color: location === link.href ? "#0080ff" : "#222222", borderBottom: "1px solid #f5f7fa", textDecoration: "none", display: "block" }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="py-3 px-3 text-sm font-semibold rounded-xl transition-colors hover:bg-blue-50"
                    style={{ color: location === link.href ? "#0080ff" : "#222222", borderBottom: "1px solid #f5f7fa" }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/quote" className="btn-outline justify-center">
                  Get a Free Quote
                </Link>
                <a href="tel:5194518342" className="btn-primary justify-center">
                  <Phone size={14} />
                  Call 519-451-8342
                </a>
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #dee0e4" }}>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Mail size={14} />
                  <a href="mailto:office@discountdrain.ca" className="hover:text-blue-600">office@discountdrain.ca</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>24/7 Emergency Service</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111111" }} className="pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src={LOGO_URL}
                alt="Discount Drain"
                style={{ height: "80px", width: "auto", marginBottom: "16px" }}
              />
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "22px", maxWidth: "260px" }}>
                Family-owned drain and sewer specialists serving London and Southwestern Ontario since 1970.
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/DiscountDrain/" },
                  { Icon: Youtube, href: "https://www.youtube.com/channel/UC0g_G8fwtZRCJLC0pvK5FDw?view_as=subscriber" },
                  { Icon: Instagram, href: "https://www.instagram.com/discountdrainservice/?hl=en" },
                  { Icon: Twitter, href: "https://x.com/Discount_Drain" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-colors"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#0080ff";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Services
              </h4>
              {SERVICE_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block mb-2.5 text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Company
              </h4>
              {[
                { label: "About Us", href: "/about" },
                { label: "Residential", href: "/residential" },
                { label: "Commercial", href: "/commercial" },
                { label: "Blog and Resources", href: "/blog" },
                { label: "Service Area", href: "/service-area" },
                { label: "Contact Us", href: "/contact" },
                { label: "Free Quote", href: "/quote" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block mb-2.5 text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Contact
              </h4>
              <div className="flex flex-col gap-4">
                <a href="tel:5194518342" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                  <Phone size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#0080ff" }} />
                  <div>
                    <div className="font-semibold text-white">519-451-8342</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>24/7 Emergency Line</div>
                  </div>
                </a>
                <a href="mailto:office@discountdrain.ca" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                  <Mail size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#0080ff" }} />
                  <span>office@discountdrain.ca</span>
                </a>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <MapPin size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#0080ff" }} />
                  <span>London and Southwestern Ontario</span>
                </div>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Clock size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#0080ff" }} />
                  <span>24/7 Emergency Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
              2026 Discount Drain. All rights reserved. Family-owned since 1970.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", textDecoration: "none" }} className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", textDecoration: "none" }} className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Call Bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.15)" }}
      >
        <a
          href="tel:5194518342"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold text-sm"
          style={{ backgroundColor: "#0080ff" }}
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/quote"
          className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm"
          style={{ backgroundColor: "#111111", color: "#ffffff" }}
        >
          Free Quote
        </Link>
      </div>
      {/* Back-to-top button — visible on all long pages after 400 px scroll */}
      <BackToTop />
    </div>
  );
}
