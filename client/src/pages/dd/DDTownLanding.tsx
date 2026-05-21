/**
 * DDTownLanding — Geo-targeted landing page for individual service area towns.
 *
 * Route: /service-area/:townSlug
 * Each town has unique headline, intro, whyUs copy, services list, and 5 FAQs.
 * Includes JSON-LD FAQ structured data for SEO.
 */

import { useParams, Link } from "wouter";
import { Phone, CheckCircle2, MapPin, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import DDLayout from "./DDLayout";
import { getTownBySlug, TOWNS } from "@/data/townContent";
import GoogleReviewsWidget from "@/components/dd/GoogleReviewsWidget";

const HERO_IMG =
  "/manus-storage/dd-hero-drain_7551245e.jpg";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #e8eaed", backgroundColor: "#ffffff" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#111111", lineHeight: "24px" }}>{q}</span>
        {open ? (
          <ChevronUp size={18} style={{ color: "#0080ff", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={18} style={{ color: "#8c9baa", flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <div
          className="px-6 pb-5"
          style={{ fontSize: "14px", color: "#555555", lineHeight: "24px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function DDTownLanding() {
  const params = useParams<{ townSlug: string }>();
  const town = getTownBySlug(params.townSlug ?? "");

  if (!town) {
    return (
      <DDLayout>
        <section className="py-32 text-center">
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111111", marginBottom: "16px" }}>
            Town Not Found
          </h1>
          <p style={{ color: "#8c9baa", marginBottom: "24px" }}>
            We could not find a page for that location. Please check our full service area.
          </p>
          <Link
            href="/service-area"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: "#0080ff", color: "#ffffff", textDecoration: "none" }}
          >
            View Service Area
          </Link>
        </section>
      </DDLayout>
    );
  }

  // JSON-LD FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: town.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // JSON-LD LocalBusiness structured data
  const localBizSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Discount Drain",
    telephone: "+15194518342",
    url: "https://discountdrain.ca",
    areaServed: {
      "@type": "City",
      name: town.name,
      addressRegion: town.province,
      addressCountry: "CA",
    },
    description: `Discount Drain provides professional drain and sewer services in ${town.name}, ${town.province}. Free sewer camera inspection included. 24/7 emergency service.`,
  };

  return (
    <DDLayout>
      {/* SEO meta */}
      <title>{town.headline} | Discount Drain</title>
      <meta
        name="description"
        content={`${town.subheadline}. Free sewer camera inspection included. Call 519-451-8342 for same-day service in ${town.name}, ${town.province}.`}
      />
      <link rel="canonical" href={`https://discountdrain.ca/service-area/${town.slug}`} />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "480px", display: "flex", alignItems: "center" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, zIndex: 0 }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,10,20,0.72)", zIndex: 1 }} />

        <div className="relative container py-20" style={{ zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/service-area" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Service Area</Link>
            <span>/</span>
            <span style={{ color: "#ffffff" }}>{town.name}</span>
          </nav>

          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                backgroundColor: "rgba(0,128,255,0.2)",
                border: "1px solid rgba(0,128,255,0.35)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#60b3ff",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <MapPin size={12} />
              {town.county}
            </div>

            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 58px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              {town.headline}
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.80)",
                lineHeight: "30px",
                maxWidth: "540px",
                marginBottom: "32px",
              }}
            >
              {town.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:5194518342"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold"
                style={{ backgroundColor: "#FEDA86", color: "#2A2A31", textDecoration: "none", fontSize: "15px" }}
              >
                <Phone size={16} />
                Call 519-451-8342
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "15px",
                }}
              >
                Get a Free Quote
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ backgroundColor: "#3F4049" }} className="py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "Free Camera Inspection Included",
              "BBB Accredited Business",
              "WSIB Compliant",
              "Fully Insured",
              "24/7 Emergency Service",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: "#FEDA86" }} />
                <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 500 }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTRO + SERVICES */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main copy */}
            <div className="lg:col-span-2">
              <div
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "#f0f6ff", color: "#0060d0", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Serving {town.name}, {town.province}
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 38px)",
                  fontWeight: 800,
                  color: "#111111",
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                  lineHeight: 1.2,
                }}
              >
                Drain and Sewer Experts in {town.name}
              </h2>
              <p style={{ fontSize: "16px", color: "#555555", lineHeight: "28px", marginBottom: "20px" }}>
                {town.intro}
              </p>
              <p style={{ fontSize: "16px", color: "#555555", lineHeight: "28px" }}>
                {town.whyUs}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:5194518342"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ backgroundColor: "#0080ff", color: "#ffffff", textDecoration: "none" }}
                >
                  <Phone size={15} />
                  Call Now — 519-451-8342
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ backgroundColor: "#f5f7fa", color: "#111111", textDecoration: "none", border: "1px solid #e8eaed" }}
                >
                  Send a Message
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Services sidebar */}
            <div>
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#f5f7fa", border: "1px solid #e8eaed" }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111111", marginBottom: "16px" }}>
                  Services Available in {town.name}
                </h3>
                <div className="flex flex-col gap-3">
                  {town.services.map((service) => (
                    <div key={service} className="flex items-start gap-3">
                      <CheckCircle2 size={15} style={{ color: "#0080ff", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontSize: "14px", color: "#333333", lineHeight: "22px" }}>{service}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 rounded-xl p-4"
                  style={{ backgroundColor: "#0080ff" }}
                >
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", marginBottom: "12px", lineHeight: "20px" }}>
                    Free sewer camera inspection included with every service call in {town.name}.
                  </p>
                  <a
                    href="tel:5194518342"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm"
                    style={{ backgroundColor: "#ffffff", color: "#0060d0", textDecoration: "none" }}
                  >
                    <Phone size={14} />
                    519-451-8342
                  </a>
                </div>
              </div>

              {/* Google reviews compact */}
              <div className="mt-5">
                <GoogleReviewsWidget variant="service" maxReviews={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#e8f0fe", color: "#0060d0", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Why Discount Drain
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
              The {town.name} Area's Most Trusted Drain Company
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Free Camera Inspection",
                desc: "A $400 value included with every service call. We show you the footage before recommending any repair.",
              },
              {
                title: "Honest Pricing",
                desc: "We diagnose first and recommend only what is needed. No upselling, no surprise charges on your invoice.",
              },
              {
                title: "20-Year Warranty",
                desc: "Our basement waterproofing is backed by a 20-year warranty — one of the strongest guarantees in the region.",
              },
              {
                title: "24/7 Emergency",
                desc: "Drain emergencies do not wait. Our dispatch is staffed around the clock, including weekends and holidays.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8eaed", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#f0f6ff" }}
                >
                  <CheckCircle2 size={18} style={{ color: "#0080ff" }} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#777777", lineHeight: "21px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "#f0f6ff", color: "#0060d0", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Frequently Asked Questions
              </div>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
                Questions About Drain Service in {town.name}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {town.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p style={{ fontSize: "15px", color: "#777777", marginBottom: "16px" }}>
                Have a question not answered here? Call us directly.
              </p>
              <a
                href="tel:5194518342"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: "#0080ff", color: "#ffffff", textDecoration: "none" }}
              >
                <Phone size={15} />
                519-451-8342
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEARBY TOWNS */}
      <section className="py-12" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="text-center mb-8">
            <p style={{ fontSize: "14px", color: "#8c9baa" }}>{town.nearbyNote}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {TOWNS.filter((t) => t.slug !== town.slug)
              .slice(0, 8)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/service-area/${t.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e8eaed",
                    color: "#0060d0",
                    textDecoration: "none",
                  }}
                >
                  <MapPin size={12} />
                  {t.name}
                </Link>
              ))}
            <Link
              href="/service-area"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "#0080ff",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              View All Areas
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 50%, #3298fe 100%)" }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready for Service in {town.name}?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.80)", fontSize: "17px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: "28px" }}>
            Call now and get your free sewer video camera inspection. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5194518342"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold"
              style={{ backgroundColor: "#FEDA86", color: "#2A2A31", textDecoration: "none", fontSize: "16px" }}
            >
              <Phone size={17} />
              Call 519-451-8342
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
