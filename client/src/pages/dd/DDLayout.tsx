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
} from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";

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

const RESIDENTIAL_SERVICES = [
  { label: "Free Sewer Camera Inspection", desc: "See inside your pipes in real time. $400 value, free with every call.", href: "/services/sewer-camera-inspection", icon: "camera" },
  { label: "No-Dig Trenchless Repair", desc: "Fix your sewer line without digging up your yard or driveway.", href: "/services/trenchless-pipe-repair", icon: "wrench" },
  { label: "Wet Basement Waterproofing", desc: "Permanent wet basement fix backed by a 20-year warranty.", href: "/services/wet-basement-repair", icon: "droplets" },
  { label: "Sewer Repair and Installation", desc: "Expert sewer line repair and new installation for any situation.", href: "/services/sewer-repair-installation", icon: "wrench" },
  { label: "Drain Cleaning and Power Flushing", desc: "Clear blockages and restore full flow with high-pressure flushing.", href: "/services/drain-cleaning", icon: "droplets" },
  { label: "Excavation and Machine Services", desc: "Dump trucks and machine excavating for any size project.", href: "/services/excavation-services", icon: "truck" },
  { label: "Septic Service and Repairs", desc: "Preventative maintenance and full repairs for septic systems.", href: "/services/septic-repairs", icon: "shield" },
];

const COMMERCIAL_SERVICES = [
  { label: "Free Sewer Camera Inspection", desc: "Commercial-grade CCTV inspection to diagnose problems fast.", href: "/services/sewer-camera-inspection", icon: "camera" },
  { label: "No-Dig Trenchless Repair", desc: "Minimal disruption to operations. No surface restoration needed.", href: "/services/trenchless-pipe-repair", icon: "wrench" },
  { label: "Municipal Services", desc: "Sewer lining, manhole restoration, and water main repair.", href: "/services/municipal-services", icon: "building" },
  { label: "Catch Basin Cleaning", desc: "Keep storm drains and catch basins clear and compliant.", href: "/services/catch-basin-cleaning", icon: "droplets" },
  { label: "Sewer Repair and Installation", desc: "Commercial sewer repair and installation by certified technicians.", href: "/services/sewer-repair-installation", icon: "wrench" },
  { label: "Septic Service and Repairs", desc: "Commercial septic maintenance, repairs, and replacements.", href: "/services/septic-repairs", icon: "shield" },
];

// Flat list kept for footer use
const SERVICE_LINKS = [
  { label: "Free Sewer Camera Inspection", href: "/services/sewer-camera-inspection" },
  { label: "No-Dig Trenchless Repair", href: "/services/trenchless-pipe-repair" },
  { label: "Wet Basement Waterproofing", href: "/services/wet-basement-repair" },
  { label: "Sewer Repair and Installation", href: "/services/sewer-repair-installation" },
  { label: "Drain Cleaning and Power Flushing", href: "/services/drain-cleaning" },
  { label: "Excavation and Machine Services", href: "/services/excavation-services" },
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock size={12} />
              <span className="font-semibold text-white">24/7 Emergency Service Available</span>
            </div>
            <div className="flex items-center gap-2" style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "16px" }}>
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com/DiscountDrain/", label: "Facebook" },
                { Icon: FaYoutube, href: "https://www.youtube.com/channel/UC0g_G8fwtZRCJLC0pvK5FDw?view_as=subscriber", label: "YouTube" },
                { Icon: FaInstagram, href: "https://www.instagram.com/discountdrainservice/?hl=en", label: "Instagram" },
                { Icon: FaXTwitter, href: "https://x.com/Discount_Drain", label: "X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
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

                  {/* Mega-menu: grouped Residential / Commercial */}
                  {servicesOpen && (
                    <div
                      className="absolute z-50"
                      onMouseEnter={openMenu}
                      onMouseLeave={scheduleClose}
                      style={{
                        top: "calc(100% + 4px)",
                        left: "-24px",
                        width: "760px",
                        background: "#FFFFFF",
                        border: "1px solid #E8E9EC",
                        borderRadius: "20px",
                        boxShadow: "0 24px 64px rgba(26,27,32,0.14), 0 4px 16px rgba(26,27,32,0.06)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Two-column grouped grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>

                        {/* Left col: Residential */}
                        <div style={{ padding: "20px 12px 20px 20px", borderRight: "1px solid #F0F1F3" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", paddingLeft: "8px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0080ff", flexShrink: 0 }} />
                            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#0080ff", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              Residential
                            </p>
                          </div>
                          {RESIDENTIAL_SERVICES.map((s) => (
                            <Link
                              key={s.href + "-res"}
                              href={s.href}
                              className="mega-item-res"
                            >
                              <span className="mega-item-title">{s.label}</span>
                              <span className="mega-item-desc">{s.desc}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Right col: Commercial */}
                        <div style={{ padding: "20px 20px 20px 12px", background: "#F8FAFF" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", paddingLeft: "8px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#1E3A5F", flexShrink: 0 }} />
                            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#1E3A5F", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              Commercial
                            </p>
                          </div>
                          {COMMERCIAL_SERVICES.map((s) => (
                            <Link
                              key={s.href + "-com"}
                              href={s.href}
                              className="mega-item-com"
                            >
                              <span className="mega-item-title">{s.label}</span>
                              <span className="mega-item-desc">{s.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTA strip */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 20px",
                          borderTop: "1px solid #F0F1F3",
                          background: "#FAFAFA",
                        }}
                      >
                        <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Serving London, ON and surrounding areas
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
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0060d0"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0080ff"; }}
                        >
                          View All Services
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
                link.hasDropdown ? (
                  <div key={link.label}>
                    {/* Services accordion trigger */}
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold rounded-xl transition-colors hover:bg-blue-50"
                      style={{ color: location.startsWith("/services") ? "#0080ff" : "#222222", borderBottom: mobileServicesOpen ? "none" : "1px solid #f5f7fa", background: "transparent", cursor: "pointer" }}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>
                    {/* Accordion body */}
                    {mobileServicesOpen && (
                      <div style={{ borderBottom: "1px solid #f5f7fa", paddingBottom: "8px", marginBottom: "4px" }}>
                        {/* Residential group */}
                        <div style={{ padding: "10px 12px 4px 12px" }}>
                          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0080ff", marginBottom: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Residential</p>
                          {RESIDENTIAL_SERVICES.map((s) => (
                            <Link
                              key={s.href + "-mob-res"}
                              href={s.href}
                              style={{ display: "block", padding: "7px 8px", fontSize: "13px", fontWeight: 500, color: "#1A1B20", textDecoration: "none", borderRadius: "8px" }}
                              onClick={() => setMobileOpen(false)}
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                        {/* Commercial group */}
                        <div style={{ padding: "10px 12px 4px 12px", marginTop: "4px", background: "#F8FAFF", borderRadius: "10px", margin: "4px 8px" }}>
                          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E3A5F", marginBottom: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Commercial</p>
                          {COMMERCIAL_SERVICES.map((s) => (
                            <Link
                              key={s.href + "-mob-com"}
                              href={s.href}
                              style={{ display: "block", padding: "7px 8px", fontSize: "13px", fontWeight: 500, color: "#1A1B20", textDecoration: "none", borderRadius: "8px" }}
                              onClick={() => setMobileOpen(false)}
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/services"
                          style={{ display: "block", margin: "8px 12px 0", padding: "9px 12px", fontSize: "13px", fontWeight: 700, color: "#ffffff", background: "#0080ff", borderRadius: "10px", textDecoration: "none", textAlign: "center" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          View All Services
                        </Link>
                      </div>
                    )}
                  </div>
                ) : link.servicesTab ? (
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
                  { Icon: FaFacebook, href: "https://www.facebook.com/DiscountDrain/" },
                  { Icon: FaYoutube, href: "https://www.youtube.com/channel/UC0g_G8fwtZRCJLC0pvK5FDw?view_as=subscriber" },
                  { Icon: FaInstagram, href: "https://www.instagram.com/discountdrainservice/?hl=en" },
                  { Icon: FaXTwitter, href: "https://x.com/Discount_Drain" },
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
