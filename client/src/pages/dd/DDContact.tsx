import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import DDLayout from "./DDLayout";

import { toast } from "sonner";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function DDContact() {
  const ref1 = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission delay for demo purposes
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent! We will get back to you shortly.");
    }, 800);
  };

  return (
    <DDLayout>
      <title>Contact Discount Drain | London Ontario | 519-451-8342</title>
      <meta name="description" content="Contact Discount Drain in London Ontario. Call 519-451-8342 or email office@discountdrain.ca. Available 24/7 for drain and sewer emergencies." />
      <meta name="keywords" content="contact Discount Drain, drain repair London Ontario phone number, 519-451-8342, emergency drain service London ON, sewer repair contact, drain company London Ontario" />
      <link rel="canonical" href="https://discountdrain.ca/contact" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discountdrain.ca/contact" />
      <meta property="og:title" content="Contact Discount Drain | London Ontario | 519-451-8342" />
      <meta property="og:description" content="Contact Discount Drain in London Ontario. Call 519-451-8342 or email office@discountdrain.ca. Available 24/7 for drain and sewer emergencies." />
      <meta property="og:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact Discount Drain | London Ontario | 519-451-8342" />
      <meta name="twitter:description" content="Contact Discount Drain in London Ontario. Call 519-451-8342 or email office@discountdrain.ca. Available 24/7 for drain and sewer emergencies." />
      <meta name="twitter:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />

      {/* Page Header */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="eyebrow mb-4">Get in Touch</div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#111111", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Contact Us
          </h1>
          <p style={{ color: "#8c9baa", fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Call, email, or fill out the form below. We respond quickly and are available 24/7 for emergencies.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div ref={ref1} className="fade-in-up">
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "24px" }}>
                Contact Information
              </h2>
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ width: "48px", height: "48px", backgroundColor: "#e8f3ff" }}>
                    <Phone size={20} style={{ color: "#0080ff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111", marginBottom: "4px" }}>Phone</div>
                    <a href="tel:5194518342" style={{ color: "#0080ff", fontSize: "18px", fontWeight: 700, textDecoration: "none" }}>
                      519-451-8342
                    </a>
                    <div style={{ color: "#8c9baa", fontSize: "13px", marginTop: "2px" }}>Available 24/7 for emergencies</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ width: "48px", height: "48px", backgroundColor: "#e8f3ff" }}>
                    <Mail size={20} style={{ color: "#0080ff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111", marginBottom: "4px" }}>Email</div>
                    <a href="mailto:office@discountdrain.ca" style={{ color: "#0080ff", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
                      office@discountdrain.ca
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ width: "48px", height: "48px", backgroundColor: "#e8f3ff" }}>
                    <MapPin size={20} style={{ color: "#0080ff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111", marginBottom: "4px" }}>Service Area</div>
                    <div style={{ color: "#555555", fontSize: "15px" }}>London and Southwestern Ontario</div>
                    <div style={{ color: "#8c9baa", fontSize: "13px", marginTop: "2px" }}>Including Strathroy, St. Thomas, Woodstock, and surrounding areas</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ width: "48px", height: "48px", backgroundColor: "#e8f3ff" }}>
                    <Clock size={20} style={{ color: "#0080ff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111", marginBottom: "4px" }}>Hours</div>
                    <div style={{ color: "#555555", fontSize: "15px" }}>Monday to Friday: 7am to 6pm</div>
                    <div style={{ color: "#555555", fontSize: "15px" }}>Saturday: 8am to 4pm</div>
                    <div style={{ color: "#0080ff", fontSize: "14px", fontWeight: 600, marginTop: "4px" }}>24/7 Emergency Service</div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="service-card-v2">
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111111", marginBottom: "12px" }}>Our Commitments</h4>
                {[
                  "Free sewer camera inspection with every call",
                  "WSIB compliant and fully insured",
                  "BBB Accredited Business",
                  "Family-owned since 1970",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={14} style={{ color: "#0080ff", flexShrink: 0 }} />
                    <span style={{ color: "#555555", fontSize: "13px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="service-card-v2" style={{ padding: "40px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "8px" }}>
                  Send Us a Message
                </h2>
                <p style={{ color: "#8c9baa", fontSize: "15px", marginBottom: "28px" }}>
                  Fill out the form and we will get back to you within a few hours. For urgent issues, please call us directly.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} style={{ color: "#0080ff", margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111111", marginBottom: "8px" }}>Message Sent!</h3>
                    <p style={{ color: "#8c9baa" }}>We will get back to you shortly. For urgent issues, call 519-451-8342.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                          Full Name <span style={{ color: "#0080ff" }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="dd-input"
                          required
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="519-555-0100"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="dd-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                        Email Address <span style={{ color: "#0080ff" }}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="dd-input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                        How Can We Help? <span style={{ color: "#0080ff" }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe your drain or sewer problem..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="dd-input"
                        rows={5}
                        required
                        style={{ resize: "vertical" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary justify-center"
                      disabled={isSubmitting}
                      style={{ padding: "16px 32px", fontSize: "16px" }}
                    >
                      {isSubmitting ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-0">
        <div style={{ position: "relative", height: "420px", width: "100%" }}>
          <iframe
            title="Discount Drain - London, Ontario"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46289.97!2d-81.2453!3d42.9849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef1cb4d4e7f67%3A0x4a5b9a7c8e6f1234!2sLondon%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Business info overlay card */}
          <div style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "14px 16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
            minWidth: "220px",
            maxWidth: "260px",
            fontFamily: "'Inter Tight', sans-serif",
            zIndex: 10,
          }}>
            <div style={{ fontWeight: 800, fontSize: "14px", color: "#111111", marginBottom: "10px", letterSpacing: "-0.01em" }}>
              Discount Drain
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "7px" }}>
              <MapPin size={13} style={{ color: "#0080ff", marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#4b5563", lineHeight: "18px" }}>London, Ontario, Canada</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
              <Phone size={13} style={{ color: "#0080ff", flexShrink: 0 }} />
              <a href="tel:5194518342" style={{ fontSize: "12px", color: "#4b5563", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0080ff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}>
                519-451-8342
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <Clock size={13} style={{ color: "#0080ff", marginTop: "2px", flexShrink: 0 }} />
              <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: "18px" }}>
                <div>Mon-Fri: 7:00 AM - 6:00 PM</div>
                <div>Sat: 8:00 AM - 4:00 PM</div>
                <div style={{ color: "#0080ff", fontWeight: 600 }}>24/7 Emergency Dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
