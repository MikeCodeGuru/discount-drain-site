/**
 * DDServiceArea - Interactive Service Area Map Page
 *
 * Shows London ON as the primary hub with surrounding towns marked.
 * Uses Google Maps with custom markers and a coverage radius circle.
 */

import { useRef } from "react";
import { Link } from "wouter";
import { MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import DDLayout from "./DDLayout";
import { MapView } from "@/components/Map";

// London, ON coordinates
const LONDON_CENTER = { lat: 42.9849, lng: -81.2453 };

const SERVICE_TOWNS = [
  { name: "London", lat: 42.9849, lng: -81.2453, primary: true, desc: "Main service hub" },
  { name: "Strathroy", lat: 42.9581, lng: -81.6168, primary: false, desc: "~40 min west" },
  { name: "St. Thomas", lat: 42.7759, lng: -81.1789, primary: false, desc: "~25 min south" },
  { name: "Woodstock", lat: 43.1306, lng: -80.7465, primary: false, desc: "~45 min east" },
  { name: "Ingersoll", lat: 43.0395, lng: -80.8836, primary: false, desc: "~35 min east" },
  { name: "Tillsonburg", lat: 42.8597, lng: -80.7275, primary: false, desc: "~50 min southeast" },
  { name: "Aylmer", lat: 42.7706, lng: -80.9842, primary: false, desc: "~40 min southeast" },
  { name: "Exeter", lat: 43.3500, lng: -81.4833, primary: false, desc: "~45 min northwest" },
  { name: "Parkhill", lat: 43.1500, lng: -81.6833, primary: false, desc: "~50 min northwest" },
  { name: "Dorchester", lat: 42.9833, lng: -81.0667, primary: false, desc: "~20 min east" },
  { name: "Komoka", lat: 42.9667, lng: -81.4167, primary: false, desc: "~15 min west" },
  { name: "Belmont", lat: 42.8833, lng: -81.0833, primary: false, desc: "~25 min southeast" },
];

const COVERAGE_AREAS = [
  { region: "London Core", towns: ["London", "Komoka", "Dorchester", "Belmont"] },
  { region: "West Middlesex", towns: ["Strathroy", "Parkhill", "Exeter"] },
  { region: "Elgin County", towns: ["St. Thomas", "Aylmer", "Tillsonburg"] },
  { region: "Oxford County", towns: ["Woodstock", "Ingersoll"] },
];

export default function DDServiceArea() {
  const mapRef = useRef<google.maps.Map | null>(null);

  function handleMapReady(map: google.maps.Map) {
    mapRef.current = map;

    // Draw a coverage radius circle (~80km)
    new google.maps.Circle({
      map,
      center: LONDON_CENTER,
      radius: 80000, // 80km radius
      strokeColor: "#0080ff",
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: "#0080ff",
      fillOpacity: 0.06,
    });

    // Add markers for each town
    SERVICE_TOWNS.forEach((town) => {
      const pinEl = document.createElement("div");
      pinEl.style.cssText = `
        width: ${town.primary ? "44px" : "32px"};
        height: ${town.primary ? "44px" : "32px"};
        background: ${town.primary ? "#0080ff" : "#ffffff"};
        border: ${town.primary ? "3px solid #ffffff" : "2px solid #0080ff"};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        cursor: pointer;
        transition: transform 0.15s ease;
      `;
      pinEl.innerHTML = `<svg width="${town.primary ? 20 : 14}" height="${town.primary ? 20 : 14}" viewBox="0 0 24 24" fill="${town.primary ? "#ffffff" : "#0080ff"}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: town.lat, lng: town.lng },
        title: town.name,
        content: pinEl,
      });

      // Info window on click
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: 'Inter', sans-serif; padding: 4px 2px; min-width: 160px;">
            <div style="font-weight: 700; font-size: 14px; color: #111111; margin-bottom: 4px;">${town.name}, ON</div>
            <div style="font-size: 12px; color: #777777; margin-bottom: 8px;">${town.desc}</div>
            <a href="tel:5194518342" style="display: inline-flex; align-items: center; gap: 4px; background: #0080ff; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none;">
              Call 519-451-8342
            </a>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
      });

      // Hover effect
      pinEl.addEventListener("mouseenter", () => {
        pinEl.style.transform = "scale(1.15)";
      });
      pinEl.addEventListener("mouseleave", () => {
        pinEl.style.transform = "scale(1)";
      });
    });
  }

  return (
    <DDLayout>
      <title>Service Area | Discount Drain London Ontario</title>
      <meta name="description" content="Discount Drain serves London and all of Southwestern Ontario including Strathroy, St. Thomas, Woodstock, Ingersoll, Tillsonburg, Aylmer, Exeter, and more. Call 519-451-8342." />
      <link rel="canonical" href="https://discountdrain.ca/site/service-area" />

      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a14 0%, #0d1a2e 50%, #0a1628 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #0080ff 0%, transparent 60%)" }} />
        <div className="relative container text-center" style={{ zIndex: 2 }}>
          <div className="eyebrow mx-auto mb-5" style={{ color: "#60b3ff", backgroundColor: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.3)" }}>
            Southwestern Ontario
          </div>
          <h1 className="text-white mb-5" style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Our Service Area
          </h1>
          <p className="text-white/75 mx-auto" style={{ fontSize: "18px", lineHeight: "30px", maxWidth: "560px" }}>
            Based in London, Ontario, we serve homeowners and businesses across a wide area of Southwestern Ontario. If you are within roughly 80 km of London, we come to you.
          </p>
        </div>
      </section>

      {/* Map + Coverage */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid #e8eaed" }}>
                <MapView
                  initialCenter={LONDON_CENTER}
                  initialZoom={9}
                  onMapReady={handleMapReady}
                  className="h-[520px]"
                />
              </div>
              <p className="mt-3 text-center" style={{ fontSize: "13px", color: "#8c9baa" }}>
                Click any marker to see location details and call us directly.
              </p>
            </div>

            {/* Coverage list */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #e8eaed", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <MapPin size={18} style={{ color: "#0080ff" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111111" }}>Coverage Areas</h3>
                </div>
                {COVERAGE_AREAS.map((area) => (
                  <div key={area.region} className="mb-5">
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#0080ff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                      {area.region}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.towns.map((town) => (
                        <span
                          key={town}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: "#f0f6ff", color: "#0060d0", fontWeight: 500, fontSize: "13px" }}
                        >
                          {town}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)", boxShadow: "0 4px 16px rgba(0,128,255,0.3)" }}
              >
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Not sure if we cover your area?
                </h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: "22px", marginBottom: "16px" }}>
                  Call us and we will let you know right away. We pick up 24 hours a day, 7 days a week.
                </p>
                <a
                  href="tel:5194518342"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm"
                  style={{ backgroundColor: "#ffffff", color: "#0060d0", textDecoration: "none" }}
                >
                  <Phone size={15} />
                  519-451-8342
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Towns grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="eyebrow mx-auto mb-4">Every Town We Serve</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
              Serving 12+ Communities Across Southwestern Ontario
            </h2>
            <p style={{ color: "#8c9baa", maxWidth: "520px", margin: "16px auto 0", fontSize: "16px", lineHeight: "26px" }}>
              Our fleet of service vehicles and excavators reaches every corner of the region. Same-day service is available for most locations within our coverage area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SERVICE_TOWNS.map((town) => (
              <div
                key={town.name}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  backgroundColor: town.primary ? "#f0f6ff" : "#f9fafb",
                  border: town.primary ? "1px solid #c2d9ff" : "1px solid #e8eaed",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: town.primary ? "#0080ff" : "#e8eaed",
                  }}
                >
                  <MapPin size={13} style={{ color: town.primary ? "#ffffff" : "#8c9baa" }} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                    {town.name}
                    {town.primary && (
                      <span
                        className="ml-2 px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: "#0080ff", color: "#ffffff", fontWeight: 600 }}
                      >
                        HQ
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8c9baa", marginTop: "2px" }}>{town.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="eyebrow mb-4">Why Local Matters</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", marginBottom: "20px" }}>
                We Know Southwestern Ontario Soil, Clay, and Pipes
              </h2>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "16px" }}>
                London and Southwestern Ontario have unique drainage challenges. The region sits on heavy clay soil that expands and contracts with freeze-thaw cycles, putting enormous stress on sewer lines and weeping tile systems. Most of the housing stock was built between the 1950s and 1980s using clay tile pipes that are now reaching the end of their service life.
              </p>
              <p style={{ color: "#8c9baa", lineHeight: "28px", marginBottom: "28px" }}>
                Our technicians have spent decades working in these specific conditions. We know which neighbourhoods have the oldest infrastructure, which areas flood most during spring thaw, and which trenchless methods work best in Southwestern Ontario clay. That local knowledge saves you time and money.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "55+ years serving London and surrounding communities",
                  "Familiar with local municipal codes and permit requirements",
                  "Rapid response times across the entire service area",
                  "Relationships with local inspectors and contractors",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#0080ff", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#222222", fontSize: "15px" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Communities Served", value: "12+" },
                { label: "Km Coverage Radius", value: "80" },
                { label: "Years in the Region", value: "55+" },
                { label: "Same-Day Response", value: "24/7" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-6 text-center"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e8eaed", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  <div style={{ fontSize: "42px", fontWeight: 800, color: "#0080ff", lineHeight: 1, marginBottom: "8px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "#8c9baa", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 50%, #3298fe 100%)" }}
      >
        <div className="container">
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Ready for Service in Your Area?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "17px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: "28px" }}>
            Call now for a free sewer camera inspection. We serve all of Southwestern Ontario, 24 hours a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "18px 36px" }}>
              <Phone size={16} />
              Call 519-451-8342
            </a>
            <Link href="/site/quote" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "18px 36px" }}>
              Get a Free Quote
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </DDLayout>
  );
}
