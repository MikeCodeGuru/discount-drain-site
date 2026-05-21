/**
 * Town landing page content — unique copy for each of the 12 service area towns.
 * No duplicate headlines, intros, or FAQs across towns.
 */

export interface TownContent {
  slug: string;
  name: string;
  province: string;
  county: string;
  population: string;
  headline: string;
  subheadline: string;
  intro: string;
  whyUs: string;
  services: string[];
  faqs: { q: string; a: string }[];
  nearbyNote: string;
}

export const TOWNS: TownContent[] = [
  {
    slug: "strathroy",
    name: "Strathroy",
    province: "ON",
    county: "Middlesex County",
    population: "22,000",
    headline: "Drain and Sewer Repair in Strathroy, Ontario",
    subheadline: "Fast, local service for Strathroy homeowners — backed by 55 years of experience",
    intro:
      "Strathroy homeowners trust Discount Drain for reliable drain and sewer solutions. Our team covers the entire Strathroy area, from older homes near the downtown core to newer subdivisions along the Sydenham River corridor. Whether you are dealing with a slow kitchen drain, a backed-up basement floor drain, or a cracked sewer line beneath your driveway, we arrive quickly and diagnose the problem on the spot using our free sewer video camera inspection — a $400 value included with every service call.",
    whyUs:
      "We have been serving Strathroy and Middlesex County since 1970. Our technicians know the older clay tile sewer systems common in established Strathroy neighbourhoods, as well as the PVC systems in newer developments. We carry the equipment to handle any job without subcontracting, so there are no delays and no surprises on your invoice.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Pipe Repair and Relining",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Excavation and Dump Truck Services",
    ],
    faqs: [
      {
        q: "How quickly can Discount Drain reach Strathroy for an emergency?",
        a: "We dispatch from London and can typically reach Strathroy within 30 to 45 minutes for emergency calls. Our 24/7 emergency line is always staffed, so you will speak to a real person any time you call.",
      },
      {
        q: "My Strathroy home was built in the 1960s. Are older clay tile sewer lines repairable without digging?",
        a: "Yes. Our trenchless CIPP (cured-in-place pipe) lining system works very well in older clay tile sewers. We insert a resin-saturated liner into the existing pipe, cure it in place, and create a new pipe within the old one — no excavation of your driveway or yard required.",
      },
      {
        q: "Does Discount Drain handle both residential and commercial drain problems in Strathroy?",
        a: "Absolutely. We service homes, rental properties, restaurants, and commercial buildings throughout Strathroy. Commercial drain cleaning, catch basin maintenance, and sewer inspections are all part of our service offering.",
      },
      {
        q: "What causes basement flooding in Strathroy homes?",
        a: "The most common causes are root intrusion into older clay tile sewer lines, collapsed or offset pipe joints, and weeping tile systems that have failed over time. A free camera inspection will identify the exact cause so we can recommend the most cost-effective fix.",
      },
      {
        q: "Is the free sewer camera inspection really free in Strathroy?",
        a: "Yes, completely free. We bring our camera equipment on every service call and show you live footage of your sewer line at no charge. There is no obligation and no hidden fee attached to the inspection.",
      },
    ],
    nearbyNote: "Serving all of Strathroy including Caradoc, Mount Brydges, and surrounding Middlesex County communities.",
  },
  {
    slug: "st-thomas",
    name: "St. Thomas",
    province: "ON",
    county: "Elgin County",
    population: "41,000",
    headline: "Sewer and Drain Services in St. Thomas, Ontario",
    subheadline: "Trusted by St. Thomas homeowners for over 50 years — same-day service available",
    intro:
      "St. Thomas has a mix of Victorian-era homes with original clay tile sewers and modern subdivisions with PVC systems, and Discount Drain has the experience to work with both. We serve the entire City of St. Thomas, from the historic downtown neighbourhoods to newer areas near Elgin Mall and beyond. Our free sewer video camera inspection lets you see exactly what is happening inside your pipes before any work begins, so you always know what you are paying for.",
    whyUs:
      "St. Thomas homeowners have relied on Discount Drain since the 1970s. We understand the local soil conditions, the age of the housing stock, and the types of sewer problems that come up most often in Elgin County. Our 20-year basement waterproofing warranty is one of the strongest guarantees in the region.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Wet Basement Waterproofing with 20-Year Warranty",
      "Trenchless Pipe Relining",
      "Drain Cleaning and Power Flushing",
      "Sewer Repair and Full Replacement",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "My St. Thomas home has a wet basement every spring. What is causing it?",
        a: "Spring flooding in St. Thomas basements is usually caused by failed weeping tile systems or a sump pump that cannot keep up with groundwater. We can inspect your drainage system, identify the failure point, and install a permanent waterproofing solution backed by our 20-year warranty.",
      },
      {
        q: "How long does a trenchless sewer repair take in St. Thomas?",
        a: "Most trenchless relining jobs in St. Thomas are completed in a single day. We insert the liner, cure it, and restore water service before we leave. There is no need to dig up your driveway, lawn, or landscaping.",
      },
      {
        q: "Does Discount Drain service septic systems in the St. Thomas area?",
        a: "Yes. We service septic systems throughout Elgin County, including inspections, repairs, and replacements. If you are on a rural property near St. Thomas and experiencing septic issues, give us a call.",
      },
      {
        q: "What is the difference between drain cleaning and power flushing?",
        a: "Drain cleaning uses a mechanical snake or auger to break through a blockage. Power flushing uses high-pressure water to scour the inside walls of the pipe clean, removing grease, scale, and debris. We recommend power flushing for maintenance and for pipes with heavy buildup.",
      },
      {
        q: "Can Discount Drain help with a sewer backup during a holiday weekend in St. Thomas?",
        a: "Yes. We operate 24 hours a day, 7 days a week, including all holidays. Sewer emergencies do not wait for business hours, and neither do we.",
      },
    ],
    nearbyNote: "Serving all of St. Thomas and surrounding Elgin County communities including Port Stanley, Aylmer, and Belmont.",
  },
  {
    slug: "woodstock",
    name: "Woodstock",
    province: "ON",
    county: "Oxford County",
    population: "43,000",
    headline: "Drain and Sewer Specialists Serving Woodstock, Ontario",
    subheadline: "Professional drain repair for Woodstock homes and businesses — 24/7 emergency dispatch",
    intro:
      "Woodstock is one of the fastest-growing cities in Oxford County, and its mix of century-old homes and new construction means drain and sewer problems come in every variety. Discount Drain serves the entire Woodstock area, from established neighbourhoods near the downtown to new subdivisions on the east side. We offer a free sewer video camera inspection with every call so you get a clear picture of the problem before any work begins.",
    whyUs:
      "We have been serving Oxford County since 1970. Our team is familiar with the older combined sewer systems in Woodstock's historic core as well as the separated storm and sanitary systems in newer developments. We are fully insured, WSIB compliant, and BBB accredited.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Pipe Repair",
      "Wet Basement Waterproofing",
      "Catch Basin Cleaning",
      "Sewer Repair and Installation",
    ],
    faqs: [
      {
        q: "How do I know if my Woodstock home needs a sewer line replacement or just a cleaning?",
        a: "A free camera inspection will tell you definitively. We insert a camera into your sewer line and show you live footage. If the pipe has a simple blockage, cleaning is all that is needed. If we see cracks, root intrusion, or a collapsed section, we will show you exactly where and recommend the most cost-effective repair.",
      },
      {
        q: "Are there specific sewer problems common to older Woodstock neighbourhoods?",
        a: "Yes. Homes built before the 1970s in Woodstock often have clay tile sewer lines that are prone to root intrusion and joint separation over time. We see this frequently in the Dundas Street corridor and older residential streets near the downtown. Trenchless relining is often the best solution.",
      },
      {
        q: "Does Discount Drain clean catch basins for commercial properties in Woodstock?",
        a: "Yes. We clean and maintain catch basins for commercial and industrial properties throughout Woodstock and Oxford County. Regular catch basin maintenance prevents flooding and keeps you in compliance with municipal drainage requirements.",
      },
      {
        q: "What should I do if my basement drain is backing up right now?",
        a: "Stop using water in the house if possible to avoid making the backup worse. Call our 24/7 emergency line at 519-451-8342. We will dispatch a technician to Woodstock as quickly as possible.",
      },
      {
        q: "Does Discount Drain offer payment plans for large sewer repairs in Woodstock?",
        a: "We strive to keep our prices fair and competitive. For larger jobs, we are happy to discuss payment arrangements. Call us to get a free, no-obligation quote and we can talk through your options.",
      },
    ],
    nearbyNote: "Serving all of Woodstock and surrounding Oxford County communities including Ingersoll, Tillsonburg, and Norwich.",
  },
  {
    slug: "ingersoll",
    name: "Ingersoll",
    province: "ON",
    county: "Oxford County",
    population: "13,000",
    headline: "Drain and Sewer Repair in Ingersoll, Ontario",
    subheadline: "Local expertise for Ingersoll homes — honest pricing, same-day service",
    intro:
      "Ingersoll is a tight-knit community in the heart of Oxford County, and Discount Drain has been a trusted name here for decades. From older brick homes near the Thames River to newer builds on the north side of town, we handle every type of drain and sewer problem. Our free camera inspection is always the first step — we show you exactly what is wrong before recommending any repair.",
    whyUs:
      "Ingersoll homeowners appreciate straightforward service and honest pricing. We do not upsell repairs you do not need, and we back our work with industry-leading warranties. Our technicians are familiar with the older sewer infrastructure common in Ingersoll's established neighbourhoods.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning",
      "Trenchless Pipe Relining",
      "Wet Basement Waterproofing",
      "Sewer Repair and Replacement",
      "Excavation Services",
    ],
    faqs: [
      {
        q: "My Ingersoll home has tree roots in the sewer line. What are my options?",
        a: "Root intrusion is one of the most common sewer problems we see in Ingersoll. Depending on the severity, we can clear the roots with a mechanical cutter or power flush, and then reline the pipe to prevent regrowth. In severe cases where the pipe has collapsed, we will recommend repair or replacement.",
      },
      {
        q: "How much does a sewer camera inspection cost in Ingersoll?",
        a: "Nothing. Our sewer video camera inspection is completely free with every service call. We believe you should see the problem with your own eyes before deciding on a repair.",
      },
      {
        q: "Can Discount Drain fix a slow drain in my Ingersoll kitchen or bathroom?",
        a: "Yes. Slow drains are usually caused by grease buildup, soap scum, or a partial blockage. We can clear the drain quickly and, if needed, power flush the line to restore full flow.",
      },
      {
        q: "Is trenchless pipe repair available for Ingersoll properties?",
        a: "Yes. Our trenchless CIPP lining system is available throughout Ingersoll. It is ideal for repairing cracked or root-damaged pipes without excavating your driveway or yard.",
      },
      {
        q: "What areas near Ingersoll does Discount Drain also serve?",
        a: "We serve all of Oxford County including Woodstock, Tillsonburg, Norwich, and surrounding rural areas. Travel time to Ingersoll from our London base is typically 30 to 40 minutes.",
      },
    ],
    nearbyNote: "Serving Ingersoll and surrounding Oxford County communities including Woodstock, Beachville, and Innerkip.",
  },
  {
    slug: "tillsonburg",
    name: "Tillsonburg",
    province: "ON",
    county: "Oxford County",
    population: "18,000",
    headline: "Sewer and Drain Services in Tillsonburg, Ontario",
    subheadline: "Reliable drain repair for Tillsonburg homes — free camera inspection included",
    intro:
      "Tillsonburg homeowners dealing with drain problems can count on Discount Drain for fast, professional service. We cover the entire Tillsonburg area, from the historic Broadway corridor to newer residential developments on the outskirts of town. Our team brings the latest diagnostic and repair equipment to every job, starting with a free sewer video camera inspection so you can see the problem firsthand.",
    whyUs:
      "We have served Oxford County communities including Tillsonburg for over 50 years. Our technicians understand the local housing stock and the types of drainage issues that come up in this part of southwestern Ontario. We are fully insured and stand behind every job we do.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Sewer Relining",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Septic Service",
    ],
    faqs: [
      {
        q: "How far is Discount Drain from Tillsonburg and how quickly can you respond?",
        a: "We are based in London, approximately 60 km from Tillsonburg. For emergency calls, we dispatch immediately and typically arrive within an hour. For scheduled service, we can often book same-day or next-day appointments.",
      },
      {
        q: "My Tillsonburg home has a septic system. Does Discount Drain service septic tanks?",
        a: "Yes. We service septic systems throughout Oxford County, including inspections, repairs, and replacements of septic beds and associated drainage components.",
      },
      {
        q: "What is the most common drain problem in Tillsonburg homes?",
        a: "In older Tillsonburg homes, root intrusion into clay tile sewer lines is the most frequent issue we encounter. In newer homes, grease buildup and improper disposal of wipes and hygiene products are the leading causes of blockages.",
      },
      {
        q: "Can Discount Drain repair a broken sewer line without tearing up my Tillsonburg driveway?",
        a: "In most cases, yes. Our trenchless relining technology allows us to repair or replace the interior of a damaged pipe without any surface excavation. We will assess your specific situation during the free camera inspection and let you know if trenchless is an option.",
      },
      {
        q: "Does Discount Drain provide written quotes before starting work in Tillsonburg?",
        a: "Yes. We always provide a clear, written quote before any work begins. There are no surprise charges and no pressure to proceed. You decide what to do with the information from the camera inspection.",
      },
    ],
    nearbyNote: "Serving Tillsonburg and surrounding communities including Ingersoll, Aylmer, and Delhi.",
  },
  {
    slug: "aylmer",
    name: "Aylmer",
    province: "ON",
    county: "Elgin County",
    population: "7,500",
    headline: "Drain and Sewer Repair in Aylmer, Ontario",
    subheadline: "Serving Aylmer and Elgin County with honest, professional drain service",
    intro:
      "Aylmer is a small but growing community in Elgin County, and Discount Drain is proud to serve homeowners and businesses here. Whether you are in an older home near the downtown core or a newer property on the edge of town, our team brings the same professional approach and free camera inspection to every job. We diagnose the problem first and recommend only what is necessary.",
    whyUs:
      "Elgin County homeowners have trusted Discount Drain since 1970. We are a family-owned business that values long-term relationships over quick sales. Our 20-year basement waterproofing warranty reflects our confidence in the quality of our work.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning",
      "Wet Basement Waterproofing",
      "Trenchless Pipe Repair",
      "Sewer Repair and Replacement",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "Does Discount Drain service rural properties near Aylmer?",
        a: "Yes. We serve rural properties throughout Elgin County, including farms and country homes with septic systems. If you are outside the Aylmer town limits, we can still help.",
      },
      {
        q: "My Aylmer basement floods every time it rains heavily. What should I do?",
        a: "Heavy rain flooding in basements is usually a sign of failed weeping tile or a sump pump that is overwhelmed. We can inspect your drainage system and install a permanent waterproofing solution. Our 20-year warranty gives you lasting peace of mind.",
      },
      {
        q: "How do I prepare for a Discount Drain service visit in Aylmer?",
        a: "Just make sure we have clear access to your main cleanout or the area where the problem is occurring. We bring everything else. If you are not sure where your cleanout is, our technician will locate it on arrival.",
      },
      {
        q: "Are your prices higher for Aylmer because it is farther from London?",
        a: "No. We do not add travel surcharges for communities within our service area. Aylmer homeowners pay the same fair rates as London customers.",
      },
      {
        q: "Can you fix a blocked floor drain in my Aylmer basement?",
        a: "Yes. Blocked floor drains are one of the most common calls we receive. We can clear the blockage quickly and inspect the line with our camera to make sure there are no underlying issues.",
      },
    ],
    nearbyNote: "Serving Aylmer and surrounding Elgin County communities including St. Thomas, Tillsonburg, and Port Burwell.",
  },
  {
    slug: "exeter",
    name: "Exeter",
    province: "ON",
    county: "Huron County",
    population: "4,500",
    headline: "Sewer and Drain Services in Exeter, Ontario",
    subheadline: "Professional drain repair for Exeter and Huron County — 24/7 emergency service",
    intro:
      "Exeter sits at the northern edge of our service area, and Discount Drain makes the trip regularly for homeowners who want honest, professional drain and sewer service. From older homes near the Ausable River to newer properties on the growing north side of town, we bring our full range of services including the free sewer camera inspection that sets us apart from the competition.",
    whyUs:
      "Exeter homeowners often tell us they appreciate having a company that will come this far and still treat the job with the same care as a London call. We do not rush, we do not cut corners, and we always show you the camera footage so you can make an informed decision.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Pipe Relining",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "Is Exeter within Discount Drain's regular service area?",
        a: "Yes. Exeter is within our 80 km service radius from London. We make regular trips to Exeter and Huron County and do not charge extra travel fees for service calls in this area.",
      },
      {
        q: "What types of sewer problems are common in Exeter homes?",
        a: "Older Exeter homes frequently have clay tile sewer lines that are susceptible to root intrusion and joint separation. We also see issues with weeping tile systems that have reached the end of their useful life. A free camera inspection will tell you exactly what you are dealing with.",
      },
      {
        q: "Can Discount Drain handle a sewer emergency in Exeter on a weekend?",
        a: "Yes. We operate 24 hours a day, 7 days a week. Weekend and holiday emergency calls to Exeter are handled the same as any other emergency.",
      },
      {
        q: "My Exeter property has a septic system. Can you inspect or repair it?",
        a: "Yes. We service septic systems throughout our coverage area, including Huron County. We can inspect the system, repair components, or replace a failing septic bed.",
      },
      {
        q: "How long does it take Discount Drain to arrive in Exeter for a non-emergency call?",
        a: "For scheduled appointments, we typically arrive within the agreed window. We will confirm a time that works for you when you book. Drive time from London to Exeter is approximately 45 minutes.",
      },
    ],
    nearbyNote: "Serving Exeter and surrounding Huron County communities including Grand Bend, Zurich, and Crediton.",
  },
  {
    slug: "dorchester",
    name: "Dorchester",
    province: "ON",
    county: "Middlesex County",
    population: "5,000",
    headline: "Drain and Sewer Repair in Dorchester, Ontario",
    subheadline: "Fast local service for Dorchester homeowners — just east of London",
    intro:
      "Dorchester is one of the closest communities to London in our service area, and Discount Drain can typically reach you within 20 to 30 minutes of your call. Dorchester's mix of established homes and newer subdivisions means we see a wide variety of drain and sewer issues here. Our free camera inspection is always included so you know exactly what you are dealing with before any work begins.",
    whyUs:
      "Being close to London means faster response times for Dorchester homeowners. Our team knows the local area well and can often fit Dorchester calls into the same day. We are a family-owned business with over 55 years of experience in Middlesex County.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning",
      "Trenchless Pipe Repair",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Excavation Services",
    ],
    faqs: [
      {
        q: "How quickly can Discount Drain reach Dorchester for an emergency?",
        a: "Dorchester is approximately 20 km east of London, so we can typically arrive within 20 to 30 minutes for emergency calls. We are available 24/7.",
      },
      {
        q: "Are there specific drain issues common to Dorchester's newer subdivisions?",
        a: "Newer subdivisions in Dorchester sometimes experience issues with improperly installed downspout connections, sump pump discharge problems, and early blockages from construction debris left in the lines. A camera inspection quickly identifies any of these issues.",
      },
      {
        q: "Does Discount Drain handle both residential and commercial properties in Dorchester?",
        a: "Yes. We service homes, rental properties, and small commercial buildings throughout Dorchester and the surrounding area.",
      },
      {
        q: "My Dorchester home was built in the 1980s. Should I have the sewer line inspected?",
        a: "Homes from the 1980s are at the age where sewer lines can start showing wear, particularly if there are large trees nearby. A free camera inspection is a smart preventive measure and costs you nothing.",
      },
      {
        q: "Can Discount Drain fix a collapsed section of sewer pipe in Dorchester without major excavation?",
        a: "It depends on the location and extent of the collapse. In many cases, trenchless relining can bridge a partially collapsed section. If the collapse is severe, targeted excavation may be required. We will show you the camera footage and explain your options clearly.",
      },
    ],
    nearbyNote: "Serving Dorchester and surrounding communities including Belmont, Thorndale, and Mossley.",
  },
  {
    slug: "komoka",
    name: "Komoka",
    province: "ON",
    county: "Middlesex County",
    population: "4,500",
    headline: "Sewer and Drain Services in Komoka, Ontario",
    subheadline: "Trusted drain repair for Komoka and Middlesex Centre — right next door to London",
    intro:
      "Komoka is a growing community just west of London, and Discount Drain is well-acquainted with the drainage challenges that come with rapid residential development. From new builds with settling pipe connections to older properties along the Thames River, we handle every type of drain and sewer problem. Our free camera inspection is always the starting point.",
    whyUs:
      "Komoka's proximity to London means our team can reach you quickly. We are familiar with the newer sewer infrastructure in Middlesex Centre and the older systems in surrounding rural properties. Our 24/7 availability means you are never left waiting when a drain emergency strikes.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Pipe Repair",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Excavation Services",
    ],
    faqs: [
      {
        q: "Is Komoka within Discount Drain's service area?",
        a: "Yes. Komoka is just west of London and is one of our closest service communities. We can typically reach Komoka within 20 minutes.",
      },
      {
        q: "My Komoka home is on a newer street. Are drain problems still possible in new construction?",
        a: "Yes. New construction drain issues are more common than people expect. Settling soil can cause pipe joints to shift, and construction debris sometimes ends up inside drain lines. A camera inspection will confirm whether your system is in good shape.",
      },
      {
        q: "Does Discount Drain service rural properties near Komoka?",
        a: "Yes. We serve rural properties throughout Middlesex Centre, including homes with septic systems and properties with longer sewer runs to the municipal connection.",
      },
      {
        q: "What is the best way to prevent drain problems in a Komoka home?",
        a: "Avoid putting grease, wipes, or fibrous materials down your drains. Have your sewer line inspected every few years, especially if you have large trees near the property. Regular drain cleaning is also a good preventive measure.",
      },
      {
        q: "Can Discount Drain help with a flooded window well in Komoka?",
        a: "Yes. Flooded window wells are usually caused by a blocked or disconnected window well drain. We can clear the drain and inspect the line to prevent future flooding.",
      },
    ],
    nearbyNote: "Serving Komoka and surrounding Middlesex Centre communities including Kilworth, Ilderton, and Arva.",
  },
  {
    slug: "belmont",
    name: "Belmont",
    province: "ON",
    county: "Elgin County",
    population: "2,500",
    headline: "Drain and Sewer Repair in Belmont, Ontario",
    subheadline: "Serving Belmont and Elgin County with professional, no-nonsense drain service",
    intro:
      "Belmont is a small community in Elgin County with a mix of older farmhouses and newer residential properties. Discount Drain serves Belmont and the surrounding area with the same professional approach we bring to every job, including our free sewer video camera inspection. Whether you have a blocked drain, a wet basement, or a sewer line that needs attention, we will give you an honest assessment and a fair price.",
    whyUs:
      "Small communities like Belmont sometimes get overlooked by larger drain companies. We have been serving rural and small-town Elgin County since 1970 and treat every job with the same level of care, regardless of the size of the community.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning",
      "Wet Basement Waterproofing",
      "Trenchless Pipe Repair",
      "Sewer Repair and Replacement",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "Does Discount Drain service Belmont even though it is a small community?",
        a: "Absolutely. Belmont is within our service area and we make regular trips here. Every customer in our coverage area receives the same level of service, regardless of the size of their community.",
      },
      {
        q: "My Belmont property has a septic system. Can Discount Drain inspect it?",
        a: "Yes. We service septic systems throughout Elgin County, including inspections, repairs, and bed replacements. If you are unsure of the condition of your septic system, a camera inspection of the outlet line is a good starting point.",
      },
      {
        q: "What causes basement water problems in Belmont homes?",
        a: "In Belmont, we most often see basement water issues caused by failed weeping tile systems, high water tables in spring, and cracked foundation walls. We can diagnose the source and recommend the right solution.",
      },
      {
        q: "How do I book a service call in Belmont?",
        a: "Call our main line at 519-451-8342 or use the contact form on our website. We will schedule a convenient time and confirm your appointment. For emergencies, we are available 24/7.",
      },
      {
        q: "Are there any drain problems specific to older farmhouses in the Belmont area?",
        a: "Yes. Older farmhouses often have very old clay tile or even brick sewer lines, and the connections to septic systems or municipal sewers can deteriorate significantly over time. Root intrusion is also very common on rural properties with mature trees. A camera inspection is the best way to assess the condition of these older systems.",
      },
    ],
    nearbyNote: "Serving Belmont and surrounding Elgin County communities including St. Thomas, Aylmer, and Dorchester.",
  },
  {
    slug: "parkhill",
    name: "Parkhill",
    province: "ON",
    county: "Middlesex County",
    population: "2,000",
    headline: "Sewer and Drain Services in Parkhill, Ontario",
    subheadline: "Reliable drain repair for Parkhill and North Middlesex — honest service, fair prices",
    intro:
      "Parkhill is a quiet community in North Middlesex County, and Discount Drain is one of the few full-service drain and sewer companies that regularly covers this area. We bring our full range of services to Parkhill homeowners, including the free sewer camera inspection that helps us diagnose problems accurately before recommending any repairs. If you have a drain or sewer issue in Parkhill, we are the team to call.",
    whyUs:
      "We know that homeowners in smaller communities like Parkhill sometimes have fewer options when it comes to specialized drain and sewer work. Discount Drain has the equipment and expertise to handle any job, from a simple drain cleaning to a full sewer replacement, and we make the trip to North Middlesex regularly.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning",
      "Trenchless Pipe Repair",
      "Wet Basement Waterproofing",
      "Sewer Repair and Installation",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "Does Discount Drain travel to Parkhill for service calls?",
        a: "Yes. Parkhill is within our service area and we make regular trips to North Middlesex County. We do not charge extra travel fees for Parkhill service calls.",
      },
      {
        q: "What are the most common drain problems in Parkhill homes?",
        a: "Older Parkhill homes frequently have clay tile sewer lines with root intrusion. We also see weeping tile failures and septic system issues on rural properties. A camera inspection is the best way to identify the specific problem.",
      },
      {
        q: "Can Discount Drain repair a sewer line at a rural property near Parkhill?",
        a: "Yes. We service rural properties throughout North Middlesex, including homes with long sewer runs, septic systems, and older infrastructure.",
      },
      {
        q: "How do I know if my Parkhill home needs a new sewer line or just a repair?",
        a: "The camera inspection will show us the condition of the pipe. If the damage is localized, a spot repair or relining is usually sufficient. If the pipe is deteriorated throughout its length, replacement may be the better long-term investment. We will explain the options clearly and let you decide.",
      },
      {
        q: "Is Discount Drain available for emergencies in Parkhill on weekends?",
        a: "Yes. We are available 24/7, including weekends and holidays. Call 519-451-8342 at any time for emergency service.",
      },
    ],
    nearbyNote: "Serving Parkhill and surrounding North Middlesex communities including Ailsa Craig, Lucan, and Grand Bend.",
  },
  {
    slug: "london",
    name: "London",
    province: "ON",
    county: "Middlesex County",
    population: "430,000",
    headline: "London Ontario's Trusted Drain and Sewer Specialists",
    subheadline: "Family-owned since 1970 — serving every London neighbourhood with free camera inspections",
    intro:
      "London, Ontario is our home base and the community we have served for over 55 years. From the century homes of Old South and Wortley Village to the newer subdivisions of Lambeth, Byron, and Hyde Park, Discount Drain knows London's sewer and drain infrastructure better than anyone. We service every postal code in the city, and our 24/7 emergency dispatch means help is always close by.",
    whyUs:
      "Discount Drain was founded in London in 1970 by Herman Marche. Today, under the ownership of his son Barry, we remain a family business with deep roots in this community. Our team of over 20 technicians, three service vehicles, two dump trucks, three excavators, and a combination vac and power flushing truck means we can handle any job in London without delay.",
    services: [
      "Free Sewer Video Camera Inspection",
      "Drain Cleaning and Power Flushing",
      "Trenchless Pipe Repair and Relining",
      "Wet Basement Waterproofing with 20-Year Warranty",
      "Sewer Repair and Installation",
      "Excavation and Dump Truck Services",
      "Catch Basin Cleaning",
      "Municipal Sewer Services",
      "Septic System Service",
    ],
    faqs: [
      {
        q: "What neighbourhoods in London does Discount Drain service?",
        a: "We service every neighbourhood in London, Ontario, including Old South, Wortley Village, Byron, Lambeth, Hyde Park, Masonville, Argyle, East London, White Oaks, and all areas in between. If you are in London, we can help.",
      },
      {
        q: "How long has Discount Drain been operating in London?",
        a: "We have been serving London since 1970, making us one of the longest-established drain and sewer companies in the city. Our family has been in this business for over 55 years.",
      },
      {
        q: "What makes Discount Drain different from other London drain companies?",
        a: "We include a free sewer video camera inspection with every service call, a value of $400 that most competitors charge for separately. We are honest about what repairs are actually needed, we back our basement waterproofing with a 20-year warranty, and we are available 24 hours a day, 7 days a week.",
      },
      {
        q: "Does Discount Drain handle municipal and commercial sewer work in London?",
        a: "Yes. In addition to residential service, we handle commercial drain cleaning, catch basin maintenance, sewer lining, manhole restoration, and water main repair for businesses and municipalities throughout London and Middlesex County.",
      },
      {
        q: "What is the best way to reach Discount Drain in London for an emergency?",
        a: "Call 519-451-8342 at any time, day or night. Our emergency dispatch is staffed 24 hours a day, 7 days a week, including all holidays. You will always speak to a real person.",
      },
    ],
    nearbyNote: "Serving all of London, Ontario including Old South, Byron, Lambeth, Hyde Park, Masonville, Argyle, East London, and White Oaks.",
  },
];

export function getTownBySlug(slug: string): TownContent | undefined {
  return TOWNS.find((t) => t.slug === slug);
}
