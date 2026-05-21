import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Camera, Wrench, Droplets, Truck, Shield, CheckCircle2, ArrowRight, Star } from "lucide-react";
import DDLayout from "./DDLayout";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-wet-basement-FsuMvi3AAMgHsP38ad6WDp.webp";
const CAMERA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-sewer-camera-fxX5uEXYMHW3AiBoSwi2aa.webp";
const TRENCHLESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/dd-trenchless-S93Mm3avhZ8CR5CSuviEck.webp";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Camera, Wrench, Droplets, Truck, Shield,
};

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

export default function DDResidential() {
  const { data: services } = trpc.services.list.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  const residentialServices = services ?? [];

  return (
    <DDLayout>
      <title>Residential Drain and Sewer Services | London Ontario | Discount Drain</title>
      <meta name="description" content="Residential drain cleaning, sewer repair, wet basement waterproofing, and trenchless pipe repair in London Ontario. Free camera inspection included. Call 519-451-8342." />

      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ minHeight: "420px", backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative container" style={{ zIndex: 2 }}>
          <div className="eyebrow mb-4" style={{ color: "#60b3ff", backgroundColor: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.3)" }}>
            For Homeowners
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Residential Drain and Sewer Services
          </h1>
          <p className="text-white/80 mb-8" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            From slow drains to full sewer replacements, we solve every residential drain and sewer problem in London and Southwestern Ontario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:5194518342" className="btn-primary">
              <Phone size={15} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-white">
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Free Inspection Banner */}
      <section style={{ backgroundColor: "#0080ff" }} className="py-6">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Camera size={22} style={{ color: "#ffffff", flexShrink: 0 }} />
              <p className="text-white font-semibold" style={{ fontSize: "16px" }}>
                Free Sewer Video Camera Inspection included with every residential service call. A $400 value at no charge.
              </p>
            </div>
            <a href="tel:5194518342" className="btn-white whitespace-nowrap" style={{ padding: "12px 24px" }}>
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div ref={ref1} className="fade-in-up container">
          <div className="text-center mb-14">
            <div className="eyebrow mx-auto mb-4">Residential Services</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#111111", marginBottom: "12px" }}>
              What We Do for Homeowners
            </h2>
            <p style={{ color: "#8c9baa", maxWidth: "520px", margin: "0 auto", fontSize: "17px", lineHeight: "28px" }}>
              Every job comes with a free sewer camera inspection so you know exactly what the problem is before any work begins.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialServices.map((service) => {
              const Icon = ICON_MAP[service.iconName ?? "Wrench"] ?? Wrench;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <div className="service-card-v2 h-full flex flex-col cursor-pointer">
                    <div className="flex items-center justify-center mb-5 rounded-2xl" style={{ width: "52px", height: "52px", backgroundColor: "#e8f3ff" }}>
                      <Icon size={22} style={{ color: "#0080ff" }} />
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "10px", lineHeight: "1.3" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#8c9baa", fontSize: "15px", lineHeight: "24px", flex: 1 }}>
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: "#0080ff" }}>
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature: Trenchless */}
      <section className="py-20" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/3", backgroundImage: `url(${TRENCHLESS_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div ref={ref2} className="fade-in-up">
              <div className="eyebrow mb-4">No Digging Required</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                Trenchless Technology Saves Your Property
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                Before you let anyone dig up your driveway or landscaping, call us. Our trenchless pipe repair technology replaces underground pipe from the inside out, with no excavation required.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "No excavation of driveways, lawns, or landscaping",
                  "Completed in as little as one day",
                  "Costs significantly less than traditional excavation",
                  "Long-lasting, seamless CIPP pipe lining",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#222222", fontSize: "15px" }}>{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/services/trenchless-pipe-repair" className="btn-primary">
                Learn About Trenchless
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature: Camera Inspection */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div ref={ref3} className="fade-in-up order-2 lg:order-1">
              <div className="eyebrow mb-4">Free With Every Call</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                Free Sewer Video Camera Inspection
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                We do not just clean your sewer line. We show you exactly what is happening inside it. Our free camera inspection is a $400 value included with every residential service call.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                You will see your sewer line on a monitor in real time. No guessing, no unnecessary work. Just an honest assessment of what needs to be done.
              </p>
              <a href="tel:5194518342" className="btn-primary">
                <Phone size={15} />
                Book a Free Inspection
              </a>
            </div>
            <div
              className="rounded-3xl overflow-hidden order-1 lg:order-2"
              style={{ aspectRatio: "4/3", backgroundImage: `url(${CAMERA_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="container">
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111111", marginBottom: "32px", textAlign: "center" }}>
              What London Homeowners Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="testimonial-card">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#0080ff" style={{ color: "#0080ff" }} />
                    ))}
                  </div>
                  <p style={{ color: "#222222", fontSize: "14px", lineHeight: "24px", marginBottom: "16px", fontStyle: "italic" }}>
                    "{t.body}"
                  </p>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#111111" }}>{t.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "12px" }}>{t.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>
            Drain Problem at Home? We Can Help.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: "30px" }}>
            Call today. Free camera inspection included. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "16px 32px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/quote" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "16px 32px" }}>
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
