import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Import tables via dynamic import since they're in TypeScript
// We'll use raw mysql2 connection directly
const conn = connection;

async function insertIgnore(table, columns, values) {
  const cols = columns.join(", ");
  const placeholders = columns.map(() => "?").join(", ");
  const sql = `INSERT IGNORE INTO ${table} (${cols}) VALUES (${placeholders})`;
  await conn.execute(sql, values);
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const servicesData = [
  {
    slug: "sewer-camera-inspection",
    title: "Free Sewer Video Camera Inspection",
    shortDesc: "See your sewer line live, on the spot. A $400 value included with every service call at no charge.",
    longDesc: `A sewer camera inspection is the only way to know exactly what is happening inside your pipes. We send a high-definition camera through your drain line and show you the footage in real time, right on site. No guessing. No unnecessary digging.\n\nWe include this inspection free with every service call because we believe you deserve to see the problem before we fix it. Our technicians walk you through what they find and explain your options clearly.\n\nCommon issues we detect: root intrusion, pipe cracks, bellied sections, grease buildup, offset joints, and collapsed pipe. Catching these early saves you from a much larger repair bill down the road.`,
    metaTitle: "Free Sewer Camera Inspection London ON | Discount Drain",
    metaDesc: "Get a free sewer video camera inspection with every Discount Drain service call in London and Southwestern Ontario. See your drain problem before we fix it.",
    iconName: "Camera",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp",
    featured: 1,
    sortOrder: 1,
  },
  {
    slug: "trenchless-pipe-repair",
    title: "No-Dig Trenchless Pipe Repair",
    shortDesc: "Replace underground pipe without disturbing driveways or landscaping. Most jobs done in a single day.",
    longDesc: `Stop before you let anyone dig up your driveway or landscaping. Our trenchless technology replaces underground pipe from the inside out, with no excavation required.\n\nWe use CIPP (Cured-In-Place Pipe) lining to create a brand-new pipe within your existing one. The result is a seamless, jointless liner that is stronger than the original pipe and resistant to root intrusion.\n\nThis method works on residential and commercial pipes, including sewer mains, storm drains, and water service lines. Most jobs are completed in a single day, with no mess and no restoration costs.`,
    metaTitle: "Trenchless Pipe Repair London ON | No-Dig Sewer Repair | Discount Drain",
    metaDesc: "Trenchless sewer pipe repair in London Ontario. No digging, no driveway damage. CIPP lining replaces your pipe in one day. Call Discount Drain: 519-451-8342.",
    iconName: "Wrench",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/trenchless-tech-aq27wqzhBVwtJcMqn5vyp6.webp",
    featured: 1,
    sortOrder: 2,
  },
  {
    slug: "wet-basement-repair",
    title: "Wet Basement Waterproofing",
    shortDesc: "Permanent wet basement fixes backed by a 20-year warranty. 24-hour emergency dispatch available.",
    longDesc: `A wet basement is not just an inconvenience. It is a structural risk, a health hazard, and a source of ongoing damage to your home. We fix wet and leaky basements permanently, and we back every job with a 20-year warranty.\n\nOur approach starts with a thorough inspection to find the true source of the water. We do not just treat the symptoms. We trace the water path and fix the underlying drainage or waterproofing failure.\n\nServices include: interior and exterior waterproofing, weeping tile installation and replacement, sump pump installation, window well drainage, and crack injection.`,
    metaTitle: "Wet Basement Repair London ON | 20-Year Warranty | Discount Drain",
    metaDesc: "Permanent wet basement waterproofing in London Ontario with a 20-year warranty. Emergency service available 24/7. Call Discount Drain: 519-451-8342.",
    iconName: "Droplets",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/wet-basement-KCdDkXrFxEYTLvyifn5MV5.webp",
    featured: 1,
    sortOrder: 3,
  },
  {
    slug: "sewer-repair-installation",
    title: "Sewer Repair and Installation",
    shortDesc: "Certified technicians solving sewer and drain problems quickly and professionally for homes and businesses.",
    longDesc: `When your sewer line fails, you need a team that can diagnose the problem fast and fix it right the first time. Our certified technicians have the training, equipment, and experience to handle any sewer repair or installation job.\n\nWe work on residential sewer laterals, commercial main lines, municipal connections, and everything in between. Our fleet includes excavators, combination vac trucks, and power flushing equipment.\n\nAll work is performed to Ontario Building Code standards. We pull the required permits and coordinate with the City of London and surrounding municipalities on your behalf.`,
    metaTitle: "Sewer Repair and Installation London ON | Discount Drain",
    metaDesc: "Professional sewer repair and installation in London and Southwestern Ontario. Certified technicians, full fleet, all permits handled. Call 519-451-8342.",
    iconName: "Wrench",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/excavation-truck-hn3hyopRK6GMkwRppqE9JE.webp",
    featured: 1,
    sortOrder: 4,
  },
  {
    slug: "drain-cleaning",
    title: "Drain Cleaning and Power Flushing",
    shortDesc: "Latest technology keeps your drains flowing. Preventative maintenance stops clogs before they become emergencies.",
    longDesc: `Slow drains and recurring clogs are a sign that your pipes need attention. We use high-pressure water jetting and mechanical augering to clear blockages completely, not just punch a hole through them.\n\nOur power flushing service removes grease, scale, sediment, and root intrusion from drain lines of all sizes. We follow every cleaning with a camera inspection so you can see the results.\n\nServices include: kitchen drain cleaning, floor drain cleaning, storm drain flushing, catch basin cleaning, and hydro-jetting for commercial lines.`,
    metaTitle: "Drain Cleaning London ON | Power Flushing | Discount Drain",
    metaDesc: "Professional drain cleaning and power flushing in London Ontario. High-pressure water jetting clears any blockage. Call Discount Drain: 519-451-8342.",
    iconName: "Droplets",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp",
    featured: 0,
    sortOrder: 5,
  },
  {
    slug: "excavation-services",
    title: "Excavation and Machine Services",
    shortDesc: "Full fleet for deep excavations, parking lot preparation, pool installations, and large-scale drainage projects.",
    longDesc: `Some jobs require heavy equipment. Our fleet includes dump trucks, mini excavators, and full-size excavators capable of handling any scale of project.\n\nWe provide excavation services for residential and commercial clients throughout London and Southwestern Ontario. Whether you need a trench dug for a new water service, a parking lot graded, or a pool excavated, our operators have the experience to do it safely and efficiently.\n\nAll excavation work is coordinated with utility locates (Ontario One Call) to ensure safe digging. We carry full liability insurance and WSIB coverage on all operators and equipment.`,
    metaTitle: "Excavation Services London ON | Dump Trucks | Discount Drain",
    metaDesc: "Professional excavation and machine services in London Ontario. Full fleet including dump trucks and excavators for any project. Call 519-451-8342.",
    iconName: "Truck",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/excavation-truck-hn3hyopRK6GMkwRppqE9JE.webp",
    featured: 0,
    sortOrder: 6,
  },
];

const testimonialsData = [
  { name: "Sarah M.", location: "London, ON", rating: 5, body: "Discount Drain came out within hours of my call. The free camera inspection showed exactly what was wrong. Professional, honest, and the price was fair. Would absolutely recommend to anyone in London.", serviceType: "Sewer Camera Inspection", published: 1, sortOrder: 1 },
  { name: "James T.", location: "Strathroy, ON", rating: 5, body: "Used their trenchless technology to fix our sewer line without tearing up the driveway. Saved us thousands of dollars. The team was incredibly professional and the job was done in one day.", serviceType: "Trenchless Pipe Repair", published: 1, sortOrder: 2 },
  { name: "Linda K.", location: "St. Thomas, ON", rating: 5, body: "Had a wet basement for years. Discount Drain fixed it permanently with a 20-year warranty. Family-owned business that truly cares about their customers. Highly recommend.", serviceType: "Wet Basement Repair", published: 1, sortOrder: 3 },
  { name: "Robert P.", location: "London, ON", rating: 5, body: "Called at 11pm on a Sunday with a backed-up main sewer. They had a technician at my door within two hours. Problem solved by midnight. Cannot say enough good things about this company.", serviceType: "Emergency Service", published: 1, sortOrder: 4 },
  { name: "Maria C.", location: "Woodstock, ON", rating: 5, body: "They came out to inspect a slow drain and found a cracked pipe we had no idea about. Fixed it the same day with their trenchless method. No mess, no fuss. Very impressed.", serviceType: "Drain Cleaning", published: 1, sortOrder: 5 },
  { name: "Dave H.", location: "London, ON", rating: 5, body: "Used Discount Drain for our commercial property. They handled the entire project from permits to final inspection. On time, on budget, and the crew was respectful of our tenants. Will use again.", serviceType: "Sewer Repair", published: 1, sortOrder: 6 },
];

const teamData = [
  { name: "Barry Marche", jobTitle: "Owner and President", bio: "Barry took over Discount Drain from his father Herman in 1991 and has grown it into London's most trusted drain and sewer company. With over 30 years of hands-on experience, Barry leads every major project personally.", imageUrl: "https://picsum.photos/seed/barry-marche/400/400", sortOrder: 1, published: 1 },
  { name: "Kevin Marche", jobTitle: "Operations Manager", bio: "Kevin oversees day-to-day operations and scheduling, making sure every job is staffed with the right crew and equipment. He has been with the company for over 15 years.", imageUrl: "https://picsum.photos/seed/kevin-marche/400/400", sortOrder: 2, published: 1 },
  { name: "Tom Riedel", jobTitle: "Senior Drain Technician", bio: "Tom has been diagnosing and repairing drain and sewer systems for over 20 years. He specializes in trenchless pipe lining and sewer camera inspections.", imageUrl: "https://picsum.photos/seed/tom-riedel/400/400", sortOrder: 3, published: 1 },
  { name: "Mike Vandenberg", jobTitle: "Excavation Specialist", bio: "Mike operates our excavation fleet and has completed hundreds of deep-dig sewer and water line projects across London and Southwestern Ontario.", imageUrl: "https://picsum.photos/seed/mike-vandenberg/400/400", sortOrder: 4, published: 1 },
];

const blogData = [
  { slug: "how-to-tell-if-your-sewer-line-is-broken", title: "How to Tell If Your Sewer Line Is Broken (Ontario Homeowner Guide)", excerpt: "A broken sewer line can cause serious damage before you ever see a puddle. Here are the warning signs every Ontario homeowner should know.", content: "Full content here", metaTitle: "How to Tell If Your Sewer Line Is Broken | Discount Drain London ON", metaDesc: "Warning signs of a broken sewer line in Ontario: multiple backups, gurgling drains, sewage smell, wet yard patches. Free camera inspection with every call.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp", category: "Sewer Repair", published: 1, publishedAt: "2024-11-15 00:00:00" },
  { slug: "trenchless-vs-traditional-sewer-repair-ontario", title: "Trenchless vs. Traditional Sewer Repair: What Ontario Homeowners Need to Know", excerpt: "Digging up your yard is no longer the only option for sewer repair. Here is how trenchless technology compares to traditional excavation in Ontario.", content: "Full content here", metaTitle: "Trenchless vs Traditional Sewer Repair Ontario | Discount Drain", metaDesc: "Compare trenchless CIPP lining vs traditional excavation for sewer repair in Ontario. Cost, timeline, and when each method is the right choice.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/trenchless-tech-aq27wqzhBVwtJcMqn5vyp6.webp", category: "Trenchless", published: 1, publishedAt: "2024-10-22 00:00:00" },
  { slug: "wet-basement-causes-ontario", title: "Why Is My Basement Wet? The Most Common Causes in Ontario Homes", excerpt: "Water in your basement is not always a foundation problem. Here are the real causes of wet basements in Ontario and what you can do about each one.", content: "Full content here", metaTitle: "Why Is My Basement Wet? Causes and Fixes for Ontario Homes | Discount Drain", metaDesc: "Common causes of wet basements in Ontario: failed weeping tile, window well drainage, foundation cracks, grading issues. Free assessment. 20-year warranty.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/wet-basement-KCdDkXrFxEYTLvyifn5MV5.webp", category: "Wet Basement", published: 1, publishedAt: "2024-09-10 00:00:00" },
  { slug: "drain-cleaning-how-often-ontario", title: "How Often Should You Clean Your Drains? A Guide for Ontario Homeowners", excerpt: "Most homeowners wait until a drain backs up to think about cleaning it. Here is why that approach costs more in the long run and what a better maintenance schedule looks like.", content: "Full content here", metaTitle: "How Often to Clean Drains Ontario | Drain Maintenance Guide | Discount Drain", metaDesc: "Drain cleaning schedule for Ontario homeowners: kitchen, bathroom, floor drains, and main sewer line. Professional hydro-jetting and camera inspection.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/sewer-camera-5kNXRacuUCNEdJZmaMCJfN.webp", category: "Drain Cleaning", published: 1, publishedAt: "2024-08-05 00:00:00" },
  { slug: "sewer-backup-what-to-do-ontario", title: "Sewer Backup: What to Do Right Now (Ontario Emergency Guide)", excerpt: "A sewer backup is a health emergency. Here is exactly what to do in the first hour and how to prevent it from happening again.", content: "Full content here", metaTitle: "Sewer Backup Emergency Guide Ontario | What to Do | Discount Drain", metaDesc: "What to do during a sewer backup in Ontario: stop using water, stay out of sewage, call for emergency service. 24/7 dispatch. Call 519-451-8342.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/excavation-truck-hn3hyopRK6GMkwRppqE9JE.webp", category: "Emergency", published: 1, publishedAt: "2024-07-18 00:00:00" },
  { slug: "weeping-tile-replacement-ontario", title: "Weeping Tile Replacement in Ontario: What It Costs and What to Expect", excerpt: "Weeping tile failure is the leading cause of wet basements in Ontario homes built before 1990. Here is everything you need to know about replacement.", content: "Full content here", metaTitle: "Weeping Tile Replacement Ontario | Cost and Process | Discount Drain", metaDesc: "Weeping tile replacement cost and process in Ontario. Exterior vs interior options, 20-year warranty. Free assessment for London and Southwestern Ontario homes.", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/wet-basement-KCdDkXrFxEYTLvyifn5MV5.webp", category: "Wet Basement", published: 1, publishedAt: "2024-06-12 00:00:00" },
];

console.log("Seeding services...");
for (const s of servicesData) {
  await conn.execute(
    `INSERT IGNORE INTO services (slug, title, shortDesc, longDesc, metaTitle, metaDesc, iconName, imageUrl, featured, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [s.slug, s.title, s.shortDesc, s.longDesc, s.metaTitle, s.metaDesc, s.iconName, s.imageUrl, s.featured, s.sortOrder]
  );
}

console.log("Seeding testimonials...");
for (const t of testimonialsData) {
  await conn.execute(
    `INSERT IGNORE INTO testimonials (name, location, rating, body, serviceType, published, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [t.name, t.location, t.rating, t.body, t.serviceType, t.published, t.sortOrder]
  );
}

console.log("Seeding team members...");
for (const m of teamData) {
  await conn.execute(
    `INSERT IGNORE INTO team_members (name, jobTitle, bio, imageUrl, sortOrder, published) VALUES (?, ?, ?, ?, ?, ?)`,
    [m.name, m.jobTitle, m.bio, m.imageUrl, m.sortOrder, m.published]
  );
}

console.log("Seeding blog posts...");
for (const b of blogData) {
  await conn.execute(
    `INSERT IGNORE INTO blog_posts (slug, title, excerpt, content, metaTitle, metaDesc, imageUrl, category, published, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [b.slug, b.title, b.excerpt, b.content, b.metaTitle, b.metaDesc, b.imageUrl, b.category, b.published, b.publishedAt]
  );
}

console.log("Seed complete!");
await connection.end();
