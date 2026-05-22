import type { GalleryItem } from "@/components/dd/ServiceGallery";

/**
 * Gallery items for each service page.
 * Keyed by service slug (matches /services/:slug).
 * Real job-site photos and videos from client's Google Drive, uploaded to CDN.
 * Labels: "before" (red badge), "after" (blue badge), or any custom string.
 */
export const SERVICE_GALLERY: Record<string, GalleryItem[]> = {

  // ── Sewer Camera Inspection ──────────────────────────────────────────────
  "sewer-camera-inspection": [
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Live camera feed inside a residential sewer line",
      caption: "Live camera feed inside a residential sewer line — root intrusion visible at the joint",
      label: "before",
    },
    {
      src: "/manus-storage/uv-3_f554d0ff.jpeg",
      alt: "Camera inspection reveals cracked pipe section",
      caption: "Cracked clay pipe section identified during inspection — repair recommended before failure",
    },
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Camera inspection access point setup at cleanout",
      caption: "Technician sets up camera at the main cleanout access point",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Drain access point prepared for camera insertion",
      caption: "Drain access prepared — camera inserted to locate blockage source",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "Post-inspection pipe condition assessment report",
      caption: "Post-inspection assessment — pipe condition documented with video footage for homeowner review",
      label: "after",
    },
  ],

  // ── Trenchless Pipe Repair (UV Liner / Coating) ──────────────────────────
  "trenchless-pipe-repair": [
    {
      src: "/manus-storage/lining-before_84ef94a9.mp4",
      alt: "Sewer pipe condition before UV liner installation",
      caption: "Pipe interior before lining — visible cracks, root intrusion, and deteriorated joints",
      type: "video",
      label: "before",
    },
    {
      src: "/manus-storage/lining-after_2c390ee0.mp4",
      alt: "Sewer pipe after UV liner installation — smooth and sealed",
      caption: "Same pipe after UV-cured liner installation — completely sealed, smooth interior, no excavation required",
      type: "video",
      label: "after",
    },
    {
      src: "/manus-storage/uv-process-1_e0d06a17.mp4",
      alt: "UV liner being pulled into position inside the pipe",
      caption: "UV liner pulled into position inside the host pipe before curing begins",
      type: "video",
      label: "Process",
    },
    {
      src: "/manus-storage/uv-process-2_57ff58e4.mp4",
      alt: "UV light curing the liner from inside the pipe",
      caption: "UV light train travels through the liner, curing it in place — the entire process takes under 2 hours",
      type: "video",
      label: "Process",
    },
    {
      src: "/manus-storage/uv-2_1c8e324e.jpg",
      alt: "UV liner installation equipment and setup on job site",
      caption: "Trenchless liner installation — no digging, no driveway damage, no disruption to your property",
      label: "before",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Camera verification after UV liner installation",
      caption: "Post-lining camera inspection confirms a seamless, fully sealed pipe interior",
      label: "after",
    },
    {
      src: "/manus-storage/uv-3_f554d0ff.jpeg",
      alt: "Finished liner viewed through camera — smooth pipe wall",
      caption: "Finished liner surface — structurally sound and rated for 50+ years of service life",
      label: "after",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "ElastoFlake pipe coating applied to rehabilitate pipe",
      caption: "ElastoFlake structural coating — an alternative to full lining for localized deterioration",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Trenchless repair site — minimal surface disturbance",
      caption: "Job site after trenchless repair — lawn and driveway completely undisturbed",
      label: "after",
    },
  ],

  // ── Wet Basement Waterproofing ────────────────────────────────────────────
  "wet-basement-repair": [
    {
      src: "/manus-storage/wet-1_1437e573.jpeg",
      alt: "Wet basement wall with active water seepage before waterproofing",
      caption: "Active water seepage through foundation wall — a common problem in London-area homes built before 1990",
      label: "before",
    },
    {
      src: "/manus-storage/wet-2_ee98a72b.jpeg",
      alt: "Interior waterproofing membrane and drainage channel being installed",
      caption: "Interior waterproofing membrane and perimeter drainage channel installed along the footing",
      label: "Process",
    },
    {
      src: "/manus-storage/wet-3_6cef77a5.jpeg",
      alt: "Exterior waterproofing coating applied to foundation wall",
      caption: "Exterior foundation wall exposed and coated with rubberized waterproofing membrane",
      label: "Process",
    },
    {
      src: "/manus-storage/wet-4_e60014e2.jpeg",
      alt: "Dry, finished basement after waterproofing — 20-year warranty",
      caption: "Completed project — basement is permanently dry, backed by our 20-year transferable warranty",
      label: "after",
    },
  ],

  // ── Sewer Repair and Installation ────────────────────────────────────────
  "sewer-repair-installation": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Excavation to expose collapsed sewer line",
      caption: "Collapsed clay sewer main exposed — this section had been failing for years before the homeowner noticed symptoms",
      label: "before",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "New PVC sewer pipe being lowered into trench",
      caption: "New Schedule 40 PVC sewer pipe lowered into the trench at correct grade",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Sewer line connection to city main",
      caption: "New sewer line connected to the city main — all connections pressure-tested before backfill",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Deteriorated clay pipe removed and replaced with PVC",
      caption: "Original clay pipe (left) replaced with modern PVC — clay pipe had root intrusion along its entire length",
      label: "before",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Full sewer line replacement project in progress",
      caption: "Full sewer line replacement from house to street — completed in a single day",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "Backfill and compaction after sewer repair",
      caption: "Trench backfilled and compacted — surface restoration completed same day",
      label: "after",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Final camera inspection confirms clean installation",
      caption: "Post-installation camera inspection — clean pipe, correct grade, no defects",
      label: "after",
    },
  ],

  // ── Drain Cleaning and Power Flushing ────────────────────────────────────
  "drain-cleaning": [
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Severely blocked drain with grease and debris buildup",
      caption: "Severely blocked kitchen drain — years of grease, soap, and food debris completely obstructing flow",
      label: "before",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "High-pressure water jetting equipment set up at cleanout",
      caption: "High-pressure water jetting equipment connected at the main cleanout — 4,000 PSI clears any blockage",
      label: "Process",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Camera confirms drain is fully clear after power flushing",
      caption: "Post-cleaning camera inspection — drain is completely clear, walls clean, full flow restored",
      label: "after",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Root intrusion removed from drain line",
      caption: "Root intrusion cut back and flushed out — roots are the leading cause of recurring drain blockages",
      label: "before",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Drain access point for power flushing service",
      caption: "Cleanout access point — we use existing access points so there is no need to open walls or floors",
    },
  ],

  // ── Excavation Services ───────────────────────────────────────────────────
  "excavation-services": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Precision excavation alongside existing driveway",
      caption: "Precision excavation alongside an existing driveway — minimal surface area disturbed",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Excavation equipment on residential job site",
      caption: "Our compact excavation equipment fits through standard gate openings — no need to remove fencing",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Deep excavation for foundation waterproofing access",
      caption: "Deep excavation to expose foundation footing — required for exterior waterproofing and weeping tile replacement",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Excavation combined with sewer pipe replacement",
      caption: "Excavation and sewer replacement completed as a single coordinated job — one crew, one visit",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Site fully restored after excavation — lawn and driveway repaired",
      caption: "Site fully restored after project completion — lawn, driveway, and landscaping returned to original condition",
      label: "after",
    },
  ],

  // ── Septic Service and Repairs ────────────────────────────────────────────
  "septic-repairs": [
    {
      src: "/manus-storage/septic-1_cf2e24bc.jpeg",
      alt: "Septic tank lid exposed and opened for inspection",
      caption: "Septic tank access lid exposed — tank had not been serviced in over 10 years",
      label: "before",
    },
    {
      src: "/manus-storage/septic-2_249f9f7f.jpeg",
      alt: "Septic tank being pumped and cleaned",
      caption: "Tank pumped and cleaned — regular pumping every 3 to 5 years prevents costly system failures",
      label: "Process",
    },
    {
      src: "/manus-storage/septic-3_ce83c299.jpeg",
      alt: "Septic system component repair in progress",
      caption: "Distribution box repaired — a failed distribution box causes uneven loading of the septic bed",
      label: "Process",
    },
    {
      src: "/manus-storage/septic-4_94266bfd.jpeg",
      alt: "Septic bed inspection — checking for signs of failure",
      caption: "Septic bed inspection — checking for surface breakout, odor, and saturation before recommending repair",
      label: "before",
    },
    {
      src: "/manus-storage/septic-5_eb2456cc.jpeg",
      alt: "New septic bed being installed",
      caption: "New septic bed installation — properly sized for household occupancy and soil conditions",
      label: "Process",
    },
    {
      src: "/manus-storage/septic-6_278d83e6.jpeg",
      alt: "Septic line repair — cracked pipe replaced",
      caption: "Cracked septic line replaced — tree roots had penetrated the pipe over several years",
      label: "Process",
    },
    {
      src: "/manus-storage/septic-7_e8b8ebc9.jpeg",
      alt: "New septic system fully installed and backfilled",
      caption: "New system fully installed and backfilled — site seeded and restored",
      label: "after",
    },
    {
      src: "/manus-storage/septic-8_b96c56bd.jpeg",
      alt: "Completed septic service — system restored to full function",
      caption: "Project complete — system tested, certified, and restored to full function",
      label: "after",
    },
  ],

  // ── Catch Basin Cleaning ──────────────────────────────────────────────────
  "catch-basin-cleaning": [
    {
      src: "/manus-storage/sewer-2_5b8d5c5f.jpeg",
      alt: "Catch basin filled with debris and sediment before cleaning",
      caption: "Catch basin filled with sediment, leaves, and debris — outlet pipe was 80% blocked",
      label: "before",
    },
    {
      src: "/manus-storage/sewer-6_204b19b7.jpeg",
      alt: "Vacuum truck removing debris from catch basin",
      caption: "Vacuum truck removes all debris in a single visit — no mess, no manual shoveling",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-3_9d5c42e3.jpeg",
      alt: "Storm drain outlet pipe flushed clear",
      caption: "Outlet pipe flushed with high-pressure water after vacuuming — full flow confirmed",
      label: "Process",
    },
    {
      src: "/manus-storage/uv-1_845451d0.jpeg",
      alt: "Camera inspection of catch basin outlet pipe",
      caption: "Camera inspection of the outlet pipe confirms no blockages or structural damage downstream",
      label: "after",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Catch basin concrete frame repaired and sealed",
      caption: "Concrete frame repaired and sealed — cracked basins allow soil infiltration that accelerates blockages",
      label: "after",
    },
  ],

  // ── Municipal Services ────────────────────────────────────────────────────
  "municipal-services": [
    {
      src: "/manus-storage/sewer-1_f3340f8d.jpeg",
      alt: "Municipal sewer main excavation and repair",
      caption: "Municipal sewer main repair — aging clay infrastructure replaced with modern PVC under a residential street",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-4_9156bc10.jpeg",
      alt: "Large-diameter municipal pipe installation",
      caption: "Large-diameter pipe installation for a municipal storm sewer upgrade project",
      label: "Process",
    },
    {
      src: "/manus-storage/uv-2_1c8e324e.jpg",
      alt: "CIPP lining installed in municipal sewer main",
      caption: "CIPP lining installed in a 300mm municipal sewer main — no road closure required",
      label: "after",
    },
    {
      src: "/manus-storage/sewer-5_2a774191.jpeg",
      alt: "Coordinated municipal infrastructure project",
      caption: "Coordinated multi-trade project — sewer, water main, and road restoration completed on schedule",
      label: "Process",
    },
    {
      src: "/manus-storage/sewer-7_6d761f46.jpeg",
      alt: "Manhole restoration — concrete liner applied",
      caption: "Manhole restoration using structural concrete liner — extends service life by 50+ years",
      label: "after",
    },
    {
      src: "/manus-storage/coating-1_240ed763.png",
      alt: "Structural pipe coating applied to municipal infrastructure",
      caption: "Structural pipe coating for municipal systems — applied from the inside, no excavation required",
      label: "after",
    },
  ],
};
