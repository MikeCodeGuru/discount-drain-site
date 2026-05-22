import type { GalleryItem } from "@/components/dd/ServiceGallery";

/**
 * Gallery images for each service page.
 * Keyed by service slug (matches the URL /services/:slug).
 * Images sourced from client's Google Drive, uploaded to CDN.
 */
export const SERVICE_GALLERY: Record<string, GalleryItem[]> = {
  // ── Sewer Camera Inspection ──────────────────────────────────────────────
  // Uses "Free video service and estimates" folder assets
  // + UV liner inspection images (camera work is part of the liner process)
  "sewer-camera-inspection": [
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Sewer camera inspection view inside pipe",
      caption: "Live camera feed inside a residential sewer line",
    },
    {
      src: "/manus-storage/uv-3_f554d0ff.jpeg",
      alt: "Pipe interior captured during camera inspection",
      caption: "Identifying cracks and root intrusion before repair",
    },
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Sewer inspection job site",
      caption: "Pre-inspection site setup",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Drain access point for camera inspection",
      caption: "Camera access point preparation",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "Pipe coating inspection result",
      caption: "Post-inspection pipe condition assessment",
    },
  ],

  // ── Trenchless Pipe Repair (UV Liner / Coating) ──────────────────────────
  "trenchless-pipe-repair": [
    {
      src: "/manus-storage/uv-2_1c8e324e.jpg",
      alt: "UV liner being installed in sewer pipe",
      caption: "UV-cured liner installation — no digging required",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Inside view of lined pipe after UV curing",
      caption: "Finished liner — smooth, seamless pipe interior",
    },
    {
      src: "/manus-storage/uv-3_f554d0ff.jpeg",
      alt: "Trenchless repair pipe inspection",
      caption: "Post-lining camera verification",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "Pipe coating applied during trenchless repair",
      caption: "Structural pipe coating for long-term protection",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Trenchless sewer repair equipment on site",
      caption: "Minimal surface disruption — no excavation needed",
    },
  ],

  // ── Wet Basement Waterproofing ────────────────────────────────────────────
  "wet-basement-repair": [
    {
      src: "/manus-storage/wet-1_1437e573.jpeg",
      alt: "Wet basement waterproofing work in progress",
      caption: "Interior waterproofing membrane installation",
    },
    {
      src: "/manus-storage/wet-2_ee98a72b.jpeg",
      alt: "Basement drainage system being installed",
      caption: "French drain and sump pump system installation",
    },
    {
      src: "/manus-storage/wet-3_6cef77a5.jpeg",
      alt: "Waterproofing work on basement walls",
      caption: "Exterior waterproofing coating applied to foundation",
    },
    {
      src: "/manus-storage/wet-4_e60014e2.jpeg",
      alt: "Completed basement waterproofing project",
      caption: "Finished project — dry basement guaranteed for 20 years",
    },
  ],

  // ── Sewer Repair and Installation ────────────────────────────────────────
  "sewer-repair-installation": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Sewer repair excavation work",
      caption: "Precision excavation to access damaged sewer line",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "New sewer pipe being installed",
      caption: "New PVC sewer pipe installation",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Sewer line connection work",
      caption: "Connecting new sewer line to existing infrastructure",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Sewer pipe repair in progress",
      caption: "Replacing deteriorated clay pipe with modern PVC",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Sewer installation job site",
      caption: "Full sewer line replacement project",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "Sewer repair completed",
      caption: "Backfill and site restoration after repair",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Sewer installation final inspection",
      caption: "Final camera inspection confirms clean installation",
    },
  ],

  // ── Drain Cleaning and Power Flushing ────────────────────────────────────
  // Uses sewer and UV liner assets (drain cleaning uses similar equipment)
  "drain-cleaning": [
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "High-pressure drain cleaning in progress",
      caption: "High-pressure water jetting clears blockages completely",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "Power flushing equipment setup",
      caption: "Professional power flushing equipment on site",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Camera inspection after drain cleaning",
      caption: "Post-cleaning camera confirms clear pipe",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Drain cleaning service",
      caption: "Clearing root intrusion and grease buildup",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Drain access for cleaning",
      caption: "Drain access point for power flushing",
    },
  ],

  // ── Excavation Services ───────────────────────────────────────────────────
  "excavation-services": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Machine excavation for sewer work",
      caption: "Precision excavation with minimal surface damage",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Excavation equipment on job site",
      caption: "Our fleet handles excavations of any scale",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Deep excavation project",
      caption: "Deep excavation for foundation and sewer access",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Excavation and pipe work combined",
      caption: "Excavation combined with sewer repair",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Site restoration after excavation",
      caption: "Site fully restored after project completion",
    },
  ],

  // ── Septic Service and Repairs ────────────────────────────────────────────
  "septic-repairs": [
    {
      src: "/manus-storage/septic-1_cf2e24bc.jpeg",
      alt: "Septic system inspection and service",
      caption: "Septic system access and inspection",
    },
    {
      src: "/manus-storage/septic-2_249f9f7f.jpeg",
      alt: "Septic tank pumping service",
      caption: "Septic tank pumping and cleaning",
    },
    {
      src: "/manus-storage/septic-3_ce83c299.jpeg",
      alt: "Septic system repair work",
      caption: "Septic system component repair",
    },
    {
      src: "/manus-storage/septic-4_94266bfd.jpeg",
      alt: "Septic bed inspection",
      caption: "Septic bed condition assessment",
    },
    {
      src: "/manus-storage/septic-5_eb2456cc.jpeg",
      alt: "Septic system maintenance",
      caption: "Preventative maintenance keeps your system healthy",
    },
    {
      src: "/manus-storage/septic-6_278d83e6.jpeg",
      alt: "Septic repair in progress",
      caption: "Septic line repair and replacement",
    },
    {
      src: "/manus-storage/septic-7_e8b8ebc9.jpeg",
      alt: "Septic system installation",
      caption: "New septic system installation",
    },
    {
      src: "/manus-storage/septic-8_b96c56bd.jpeg",
      alt: "Completed septic service project",
      caption: "Project complete — system restored to full function",
    },
  ],

  // ── Catch Basin Cleaning ──────────────────────────────────────────────────
  // Uses sewer and excavation assets (catch basin work is similar)
  "catch-basin-cleaning": [
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Catch basin cleaning service",
      caption: "Vacuum truck removes debris from catch basin",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "Catch basin inspection",
      caption: "Inspecting catch basin for damage and blockages",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Storm drain cleaning",
      caption: "Storm drain and catch basin maintenance",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Camera inspection of catch basin outlet",
      caption: "Camera inspection confirms clean outlet pipe",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Catch basin repair work",
      caption: "Catch basin repair and concrete restoration",
    },
  ],

  // ── Municipal Services ────────────────────────────────────────────────────
  "municipal-services": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Municipal sewer main repair",
      caption: "Municipal sewer main repair and lining",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Large-diameter pipe installation",
      caption: "Large-diameter municipal pipe installation",
    },
    {
      src: "/manus-storage/uv-2_1c8e324e.jpg",
      alt: "Municipal sewer lining project",
      caption: "CIPP lining for municipal infrastructure renewal",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Municipal infrastructure project",
      caption: "Coordinated municipal infrastructure project",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Manhole restoration work",
      caption: "Manhole restoration and structural repair",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "Municipal pipe coating",
      caption: "Structural pipe coating for municipal systems",
    },
  ],
};
