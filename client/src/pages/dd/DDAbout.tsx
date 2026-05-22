import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Shield, CheckCircle2, Star, Clock, Award, Users, Truck, ArrowRight } from "lucide-react";
import DDLayout from "./DDLayout";
import { TEAM_MEMBERS } from "@/data/team";

const HERO_IMG = "/manus-storage/dd-hero-drain_7551245e.jpg";
const EXCAVATION_IMG = "/manus-storage/sewer-repair-1_b9db9364.jpeg";
const CAMERA_IMG = "/manus-storage/sewer-camera_39c33547.jpg";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mark body so CSS can apply the hidden state (progressive enhancement)
    document.body.classList.add("js-scroll-ready");
    // Immediately reveal if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px 100px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function DDAbout() {
  const team = TEAM_MEMBERS;
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <DDLayout>
      <title>About Discount Drain | Family-Owned Since 1970 | London Ontario</title>
      <meta name="description" content="Discount Drain has served London and Southwestern Ontario since 1970. Family-owned and operated, WSIB compliant, fully insured, and BBB accredited. Over 20 skilled technicians on staff." />
      <meta name="keywords" content="about Discount Drain, London Ontario drain company, family-owned drain specialist, BBB accredited plumber London ON, WSIB compliant drain contractor, sewer repair company history" />
      <link rel="canonical" href="https://discountdrain.ca/about" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discountdrain.ca/about" />
      <meta property="og:title" content="About Discount Drain | Family-Owned Since 1970 | London Ontario" />
      <meta property="og:description" content="Discount Drain has served London and Southwestern Ontario since 1970. Family-owned and operated, WSIB compliant, fully insured, and BBB accredited. Over 20 skilled technicians on staff." />
      <meta property="og:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Discount Drain" />
      <meta property="og:locale" content="en_CA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Discount Drain | Family-Owned Since 1970 | London Ontario" />
      <meta name="twitter:description" content="Discount Drain has served London and Southwestern Ontario since 1970. Family-owned and operated, WSIB compliant, fully insured, and BBB accredited. Over 20 skilled technicians on staff." />
      <meta name="twitter:image" content="https://discountdemo-bh4z4tjq.manus.space/manus-storage/dd-hero-drain_e639a1fd.jpg" />

      {/* Page Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ minHeight: "420px", backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative container" style={{ zIndex: 2 }}>
          <div className="eyebrow mb-4" style={{ color: "#60b3ff", backgroundColor: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.3)" }}>
            Our Story
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            About Discount Drain
          </h1>
          <p className="text-white/80" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Family-owned and operated since 1970. Over 55 years of solving drain and sewer problems across London and Southwestern Ontario.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div ref={ref1} className="fade-in-up">
              <div className="eyebrow mb-4">Our History</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#111111", marginBottom: "20px", lineHeight: "1.15" }}>
                A Family Business Built on Trust
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                Discount Drain was founded in 1970 by Herman Marche, who set out to help London residents and business owners with their sewer, drainage, and plumbing problems. Herman built the business on a simple principle: show up when you say you will, do the job right, and charge a fair price.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                In 1991, his son Barry took over ownership and has spent the past three decades growing the company into London's finest sewer, septic, and drainage repair, replace, and install company. Today, Discount Drain employs over 20 skilled technicians and operates a full fleet of service vehicles, excavators, and combination vac trucks.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                We are WSIB compliant and fully insured. Every technician on our team is trained in safety and certified in industry-specific instruction. When you call Discount Drain, you are calling a team that has been solving drain and sewer problems in this community for over 55 years.
              </p>
              <a href="tel:5194518342" className="btn-primary">
                <Phone size={15} />
                Call 519-451-8342
              </a>
            </div>

            {/* Image */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="col-span-2 rounded-3xl overflow-hidden"
                style={{ aspectRatio: "16/7", backgroundImage: `url(${EXCAVATION_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1", backgroundImage: `url(${CAMERA_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="rounded-2xl overflow-hidden bg-blue-600 flex flex-col items-center justify-center p-6 text-center"
                style={{ aspectRatio: "1" }}
              >
                <div className="text-white font-extrabold" style={{ fontSize: "52px", lineHeight: 1 }}>55+</div>
                <div className="text-white/80 font-semibold mt-2" style={{ fontSize: "14px" }}>Years Serving London</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20" style={{ backgroundColor: "#f5f7fa" }}>
        <div ref={ref2} className="fade-in-up container">
          <div className="text-center mb-14">
            <div className="eyebrow mx-auto mb-4">Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#111111", marginBottom: "12px" }}>
              Credentials and Commitments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "WSIB Compliant", desc: "All employees are covered under WSIB. You are fully protected on every job." },
              { icon: CheckCircle2, title: "Fully Insured", desc: "Comprehensive liability insurance on all work, vehicles, and equipment." },
              { icon: Star, title: "BBB Accredited", desc: "Accredited member of the Better Business Bureau with an A+ rating." },
              { icon: Clock, title: "24/7 Emergency", desc: "Our emergency dispatch line is staffed around the clock, every day of the year." },
              { icon: Award, title: "55+ Years Experience", desc: "Over five decades of drain and sewer expertise serving Southwestern Ontario." },
              { icon: Users, title: "20+ Technicians", desc: "A full team of certified, trained professionals ready for any size job." },
              { icon: Truck, title: "Full Fleet", desc: "Service vans, dump trucks, excavators, and combination vac trucks on hand." },
              { icon: CheckCircle2, title: "20-Year Warranty", desc: "Our wet basement waterproofing work is backed by a 20-year written warranty." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="service-card-v2 text-center">
                <div className="flex items-center justify-center mx-auto mb-4 rounded-2xl" style={{ width: "52px", height: "52px", backgroundColor: "#e8f3ff" }}>
                  <Icon size={22} style={{ color: "#0080ff" }} />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111111", marginBottom: "8px" }}>{title}</h3>
                <p style={{ color: "#8c9baa", fontSize: "14px", lineHeight: "22px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 bg-white">
          <div ref={ref3} className="fade-in-up container">
            <div className="text-center mb-14">
              <div className="eyebrow mx-auto mb-4">The People Behind the Work</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#111111", marginBottom: "12px" }}>
                Meet Our Team
              </h2>
              <p style={{ color: "#8c9baa", maxWidth: "480px", margin: "0 auto" }}>
                Our technicians are certified, trained, and committed to doing the job right every time.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="text-center">
                  <div
                    className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden"
                    style={{ backgroundImage: `url(${member.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", border: "3px solid #e8f3ff" }}
                  />
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "4px" }}>{member.name}</h3>
                  <div style={{ color: "#0080ff", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>{member.jobTitle}</div>
                  <p style={{ color: "#8c9baa", fontSize: "14px", lineHeight: "22px" }}>{member.bio}</p>
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
            Ready to Work With Us?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: "30px" }}>
            Call today for a free sewer camera inspection and honest assessment of your drain or sewer problem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "16px 32px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/contact" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "16px 32px" }}>
              Contact Us
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
