import { useState } from "react";
import { Phone, CheckCircle2, Send } from "lucide-react";
import DDLayout from "./DDLayout";

import { toast } from "sonner";

const SERVICE_OPTIONS = [
  "Drain Cleaning",
  "Sewer Camera Inspection",
  "Trenchless Pipe Repair",
  "Wet Basement / Waterproofing",
  "Sewer Repair or Installation",
  "Excavation Services",
  "Catch Basin Cleaning",
  "Septic Service",
  "Emergency Service",
  "Not Sure / Other",
];

export default function DDQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    urgency: "within_week",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Quote request sent! We will be in touch shortly.");
    }, 800);
  };

  return (
    <DDLayout>
      <title>Get a Free Quote | Discount Drain | London Ontario</title>
      <meta name="description" content="Get a free drain and sewer repair quote from Discount Drain in London Ontario. Free camera inspection included. Call 519-451-8342 or fill out the form." />

      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="eyebrow mb-4">No Obligation</div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#111111", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Get a Free Quote
          </h1>
          <p style={{ color: "#8c9baa", fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Fill out the form below and we will get back to you with an honest, no-obligation assessment. Free sewer camera inspection included with every service call.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px" }}>Prefer to Call?</h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: "22px", marginBottom: "16px" }}>
                  We answer 24 hours a day, 7 days a week. For emergencies, calling is the fastest way to reach us.
                </p>
                <a href="tel:5194518342" className="btn-white justify-center text-sm" style={{ padding: "14px 20px" }}>
                  <Phone size={14} />
                  519-451-8342
                </a>
              </div>

              <div className="service-card-v2">
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "14px" }}>What to Expect</h4>
                {[
                  "We respond within a few hours",
                  "Free sewer camera inspection on site",
                  "Honest assessment with no pressure",
                  "Upfront pricing before any work begins",
                  "WSIB compliant and fully insured crew",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 mb-3">
                    <CheckCircle2 size={14} style={{ color: "#0080ff", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#555555", fontSize: "13px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="service-card-v2" style={{ padding: "40px" }}>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={52} style={{ color: "#0080ff", margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "8px" }}>Quote Request Received!</h3>
                    <p style={{ color: "#8c9baa", maxWidth: "360px", margin: "0 auto", lineHeight: "26px" }}>
                      We will review your request and get back to you shortly. For urgent issues, call us at 519-451-8342.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111111", marginBottom: "4px" }}>
                      Tell Us About Your Project
                    </h2>
                    <p style={{ color: "#8c9baa", fontSize: "14px", marginBottom: "8px" }}>
                      Fields marked with <span style={{ color: "#0080ff" }}>*</span> are required.
                    </p>

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
                          Phone Number <span style={{ color: "#0080ff" }}>*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="519-555-0100"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="dd-input"
                          required
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
                        Property Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, London, ON"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="dd-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                        Service Needed <span style={{ color: "#0080ff" }}>*</span>
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="dd-input"
                        required
                      >
                        <option value="">Select a service...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                        How Soon Do You Need Service?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { value: "emergency", label: "Emergency" },
                          { value: "today", label: "Today" },
                          { value: "within_week", label: "This Week" },
                          { value: "flexible", label: "Flexible" },
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm({ ...form, urgency: value })}
                            className="py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                            style={{
                              backgroundColor: form.urgency === value ? "#0080ff" : "#f5f7fa",
                              color: form.urgency === value ? "#ffffff" : "#555555",
                              border: form.urgency === value ? "2px solid #0080ff" : "2px solid transparent",
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                        Describe the Problem
                      </label>
                      <textarea
                        placeholder="Tell us what is happening. The more detail you provide, the better we can prepare for your call."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="dd-input"
                        rows={4}
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
                          Submit Quote Request
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
    </DDLayout>
  );
}
