import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const posts = [
  {
    slug: "how-to-tell-if-your-sewer-line-is-broken",
    title: "How to Tell If Your Sewer Line Is Broken: Signs London Ontario Homeowners Should Know",
    excerpt: "Multiple slow drains, gurgling toilets, sewage smells, and soggy yard patches are all warning signs. Here is what to look for and what to do next.",
    metaTitle: "Signs of a Broken Sewer Line | London Ontario Homeowners Guide",
    metaDesc: "Learn the warning signs of a broken sewer line in your London Ontario home. Slow drains, gurgling sounds, sewage smells, and more. Free camera inspection available.",
    content: `If you live in an older London neighbourhood, your sewer line is probably made of clay tile. Clay tile pipes were standard until the 1980s, and they were built to last decades. The problem is that decades have passed, and many of these pipes are now cracked, root-invaded, or partially collapsed. The tricky part is that most of the damage happens underground, out of sight, until something goes wrong inside the house.

Here are the warning signs that London Ontario homeowners report most often before calling for a sewer inspection.

## Multiple slow drains at the same time

One slow drain is almost always a local clog, usually hair or grease buildup close to the drain opening. But when two or more drains in different rooms are slow at the same time, the problem is further down the line where everything connects. This is one of the most common early signs of a main sewer line issue.

## Gurgling sounds from the toilet or drains

If you flush the toilet and hear gurgling from a nearby sink or tub, or if running the washing machine causes the toilet to bubble, air is being pushed back through the system. This happens when water cannot move freely through the pipe and displaces air as it goes. In London's older neighbourhoods like Old North, Old South, and Byron, this is often caused by root intrusion narrowing the pipe.

## Sewage smell inside the house

Sewer gas has a very distinct smell. If you notice it inside your home and you have ruled out a dry P-trap (the curved pipe under sinks that holds water to block odours), there may be a crack somewhere in the line. Sewer gas contains hydrogen sulphide, which is not something to ignore.

## Sewage backing up into the basement floor drain

This is the one that sends people to Google at midnight. When the main sewer line is blocked or collapsed, wastewater has nowhere to go except back up through the lowest drain in the house, which is usually the basement floor drain. If this has happened to you, the line needs to be inspected immediately.

## Wet or soggy patches in the yard

A consistently soggy area in your yard that does not dry out, especially one with a faint sewage smell, is a strong sign of a leaking sewer line underground. In London, this tends to show up in spring when frost heave shifts the soil and puts stress on older clay pipes.

## Unusually green or lush grass in one spot

This one surprises people. If one section of your lawn is noticeably greener than the rest, it may be getting fertilized by a slow sewer leak below. It looks healthy, but it is not a good sign.

## The toilet gurgles when you run the sink

This is a specific symptom that points to a partial blockage in the main line. Water draining from the sink creates pressure in the pipe, and that pressure pushes air back up through the toilet. If you see the toilet water move or hear gurgling when you run a tap, have the main line checked.

## What to do next

If you are seeing more than one of these signs, a sewer camera inspection is the fastest way to find out what is actually happening. At Discount Drain, we include a free video camera inspection with every service call. You watch the footage with us on the spot, so you know exactly what you are dealing with before any work begins.

Most sewer problems in older London homes are fixable without digging up the yard. Trenchless repair methods can line or replace the pipe from the inside, which means your driveway and landscaping stay intact.

One thing worth knowing: if the blockage is past the property line and into the city's portion of the pipe, the City of London has a flat-rate Private Drain Connection renewal program. As of 2026, that fee is $7,250, and it can be spread across your property taxes over 10 years. Your plumber can help you determine which portion of the line is your responsibility and which belongs to the city.

Call us at 519-451-8342 if you are seeing any of these signs. We are available 24/7 for emergencies.`,
  },
  {
    slug: "trenchless-vs-traditional-sewer-repair-ontario",
    title: "Trenchless vs Traditional Sewer Repair in Ontario: What London Homeowners Need to Know",
    excerpt: "Most London homeowners do not know trenchless repair exists until they are already facing a $20,000 excavation quote. Here is what the options actually look like.",
    metaTitle: "Trenchless vs Traditional Sewer Repair Ontario | London Homeowners Guide",
    metaDesc: "Comparing trenchless pipe lining vs excavation for sewer repair in London Ontario. Costs, timelines, and which method is right for your situation.",
    content: `If you have gotten a quote for sewer line repair in London and the number started with a two and had four digits after it, you are not alone. The r/londonontario subreddit has multiple threads where homeowners share quotes ranging from $11,000 to $24,000 for sewer line work, and the variation is often because different companies are proposing completely different methods.

Understanding the difference between trenchless repair and traditional excavation can save you a significant amount of money and a lot of disruption to your property.

## What traditional excavation involves

The old method involves digging a trench along the length of the damaged pipe, removing the broken section, installing new pipe, and then backfilling and restoring whatever surface was disturbed. That might be grass, a garden, a concrete driveway, or a paved walkway.

The pipe repair itself is not usually the most expensive part. The cost comes from the excavation, the disposal of old material, and the restoration work afterward. Replacing a driveway alone can add several thousand dollars to a repair bill. In London's older neighbourhoods where sewer lines often run under driveways and mature trees, this adds up quickly.

Traditional excavation still makes sense in some situations, particularly when the pipe has completely collapsed or when the soil conditions make trenchless methods impractical.

## Trenchless pipe lining (CIPP)

Cured-in-place pipe lining, usually called CIPP or pipe lining, works by inserting a flexible liner coated in resin into the existing pipe. The liner is inflated against the inside of the old pipe and then cured with heat or UV light. When it hardens, it forms a new pipe inside the old one.

The access points are typically two small openings at either end of the damaged section. No trench. No driveway removal. Most jobs are done in a single day.

The resulting pipe is smooth, which actually improves flow compared to older clay or cast iron pipes that have corroded or accumulated buildup over the years. A properly installed CIPP liner can last 50 years or more.

This is the method London homeowners on Reddit are referring to when they mention getting a "liner" put in. Multiple people in those threads report having the liner in place for 10 or more years without any further issues.

## Trenchless pipe bursting

This method is used when the pipe is too damaged to line. A bursting head is pulled through the old pipe, fracturing it outward while simultaneously pulling a new pipe into place behind it. Again, only small access holes are needed.

## Cost comparison in the London Ontario market

Based on what London homeowners have shared publicly, here is a rough picture of what these methods cost in 2025 and 2026:

Pipe lining for a typical residential sewer line (25 to 30 feet) generally runs between $4,000 and $8,000 depending on the length, depth, and condition of the pipe. Full excavation and replacement for the same section can run from $10,000 to $20,000 or more once driveway restoration is included.

These numbers vary significantly based on access, depth, and the specific condition of the pipe. A camera inspection is the only way to get an accurate picture of what you are dealing with.

## The city's portion of the line

One thing many London homeowners do not know is that the sewer line has two sections: the private section from your house to the property line, which is your responsibility, and the Private Drain Connection (PDC) from the property line to the city main, which the city can repair through their flat-rate program.

As of 2026, the City of London charges $7,250 for PDC renewal, and this can be added to your property taxes and paid over 10 years. If your camera inspection shows the main problem is in the city's portion of the line, this is worth knowing before you agree to any private repair work.

## Getting a second opinion

If you have been quoted for full excavation and want to know whether trenchless is an option, a camera inspection is the first step. Once we can see the condition of the pipe, we can tell you whether lining is viable, whether bursting makes more sense, or whether excavation is actually necessary.

At Discount Drain, we include a free camera inspection with every service call. Call us at 519-451-8342 to schedule one.`,
  },
  {
    slug: "wet-basement-causes-ontario",
    title: "Why Is My Basement Wet? Common Causes for Ontario Homeowners",
    excerpt: "Water in your basement is not always a foundation crack. The source could be failed weeping tile, poor grading, or a blocked window well. Getting the diagnosis right matters.",
    metaTitle: "Why Is My Basement Wet? Causes and Fixes for Ontario Homeowners",
    metaDesc: "Water in your Ontario basement can come from failed weeping tile, foundation cracks, poor grading, or sewer backup. Learn the causes and what to do about them.",
    content: `Water in the basement is one of the most common calls we get from London and Southwestern Ontario homeowners, especially in spring. The first thing most people assume is that there is a crack in the foundation wall. Sometimes that is right. But the source could also be a drainage issue, a failed weeping tile system, a grading problem, or a sewer backup. Getting the diagnosis right matters because the fix is completely different depending on the cause.

Here are the most common reasons Ontario basements get wet.

## Failed or blocked weeping tile

Weeping tile is the drainage system installed around the perimeter of the foundation when the house was built. It is designed to collect groundwater and direct it away from the foundation. In older London homes, this is often clay tile or perforated pipe that has been in the ground for 40 to 60 years.

Over time, weeping tile can crack, collapse, or become clogged with silt and roots. When it fails, groundwater has nowhere to go except up against the foundation wall. This type of leak often appears at the base of the wall where the floor meets the foundation, and it tends to get worse in spring when the water table is high after snowmelt.

Weeping tile replacement in Ontario typically costs between $3,000 and $8,500 for interior installation, depending on the size of the basement and the extent of the work. Some Reddit users in Ontario have reported quotes around $9,500 to $12,000 for full interior weeping tile systems with a sump pump.

## Cracks in the foundation wall

Foundation walls develop cracks over time, especially in Ontario where freeze-thaw cycles put repeated stress on the concrete. Water from rain or snowmelt can work its way through these cracks, particularly if the soil around the foundation stays saturated.

You will usually see this as a damp patch or a trickle that appears during or right after heavy rain. The location of the wet spot often lines up with a crack on the exterior side of the wall.

## Poor grading around the house

The ground around your home should slope away from the foundation so that rainwater drains away rather than pooling against the wall. Over the years, soil settles and the grade can reverse, directing water toward the house instead of away from it.

This is one of the less expensive fixes if it is caught early. Regrading the soil around the foundation and adding downspout extensions can make a significant difference.

## Window well drainage

Basement windows sit below grade, which means they have a window well to keep soil away from the glass. If the drainage at the bottom of the window well gets blocked, water accumulates and eventually finds its way through the window frame.

## Sewer backup

This is different from groundwater seepage. A sewer backup happens when the main sewer line is blocked or overwhelmed, and wastewater flows back into the house through the lowest drain, usually the basement floor drain.

In London, sewer backups are more common during heavy rainfall events when the combined sewer system gets overloaded. Installing a backwater valve can prevent sewage from flowing back into your home during these events. The City of London has offered rebate programs for backwater valve installation in the past, so it is worth checking the current city website.

## Condensation

Not all basement moisture is coming from outside. In summer, warm humid air enters the basement and condenses on the cooler concrete walls and floor. This looks like sweating and is often mistaken for a leak.

A simple test: tape a piece of plastic sheeting to the wall and seal the edges. Leave it for 24 hours. If moisture appears on the room side of the plastic, it is condensation. If it appears on the wall side, water is coming through from outside.

## What to do

The right fix depends on the source. At Discount Drain, we start with a proper assessment before recommending anything. We have fixed wet basements in London and Southwestern Ontario for over 55 years, and our basement waterproofing work comes with a 20-year warranty.

Call us at 519-451-8342 if you are dealing with a wet basement. We will tell you honestly what is causing it and what it will take to fix it.`,
  },
  {
    slug: "how-often-clean-drains-ontario",
    title: "How Often Should You Clean Your Drains? A Guide for Ontario Homeowners",
    excerpt: "Most homeowners wait until a drain backs up to think about cleaning. Here is a practical maintenance schedule based on how Ontario homes actually get used.",
    metaTitle: "How Often Should You Clean Your Drains? Ontario Homeowner Guide",
    metaDesc: "Practical drain cleaning schedule for Ontario homeowners. Kitchen drains, bathroom drains, main sewer lines, and when to call a professional.",
    content: `Most homeowners wait until a drain backs up to think about drain cleaning. That is understandable, but it usually means paying for an emergency call when a routine maintenance visit would have prevented the problem. It also means dealing with the mess and stress of a backup, which nobody wants.

How often you should clean your drains depends on how the drains are used, what kind of pipes you have, and whether you have trees near your sewer line.

## Kitchen drains: once a year as a baseline

Kitchen drains take a lot of abuse. Grease, food particles, and soap residue build up on the inside of the pipe over time, narrowing the opening until water starts draining slowly. Once you notice slow drainage in the kitchen, there is already a significant buildup.

For most Ontario households, having the kitchen drain cleaned once a year is a reasonable baseline. If you cook frequently, have a large family, or use the kitchen commercially, twice a year makes more sense. Avoid pouring grease down the drain even if you run hot water afterward. The grease cools and solidifies further down the pipe.

## Bathroom drains: every one to two years

Hair is the main culprit in bathroom drains. It catches on the inside of the pipe and traps soap scum, creating a blockage that builds gradually. A drain strainer over the tub and shower drains helps, but it does not eliminate the problem entirely.

Bathroom drains generally need less frequent cleaning than kitchen drains. Every one to two years is typical for most households.

## Main sewer line: every two to three years for older homes

This is the one most people forget about entirely. The main sewer line carries everything from every drain in the house to the municipal sewer or septic system. In London and Southwestern Ontario, tree roots are the most common cause of main sewer line problems, particularly in older neighbourhoods with mature trees.

Roots enter through small cracks in the pipe and grow over time, eventually causing slow drainage throughout the house or a complete blockage. If you have an older clay tile sewer line and large trees in your yard or on the boulevard, having the main line inspected and cleaned every two to three years is a reasonable schedule.

Several London homeowners on community forums have mentioned that once roots are found, they tend to come back every six to twelve months if the pipe is not lined. If you are in that situation, lining the pipe is usually more cost-effective in the long run than paying for annual root clearing.

## Signs you should not wait for the scheduled cleaning

If you notice any of the following, call sooner rather than later:

Multiple drains in the house are slow at the same time. You hear gurgling from drains or toilets. There is a sewage smell coming from a drain. Water backs up into a tub or sink when you flush the toilet. The basement floor drain is backing up.

These signs suggest a problem in the main line, not just an individual drain.

## A note on chemical drain cleaners

Store-bought drain cleaners can clear a minor clog, but they are hard on pipes, particularly older metal pipes. They also do nothing for root intrusion or structural problems. If a drain is slow and the chemical cleaner does not fix it, the problem is probably not a simple grease buildup.

For routine maintenance, a professional cleaning with a power flusher or auger is more effective and safer for your pipes.

## Drain cleaning costs in London Ontario

Based on what London homeowners have shared publicly, a standard drain snaking for a single drain runs roughly $150 to $300. Main line cleaning with a power flusher is typically $300 to $500. Prices vary by company and by the complexity of the job, and emergency or after-hours calls cost more.

If you have been quoted significantly more than this for a straightforward drain cleaning, it is worth getting a second opinion.

Call us at 519-451-8342 to schedule a drain cleaning or to ask about a maintenance plan for your home.`,
  },
  {
    slug: "sewer-camera-inspection-what-to-expect",
    title: "What to Expect from a Sewer Camera Inspection in Ontario",
    excerpt: "If someone has told you that you need a sewer camera inspection, here is exactly what the process looks like, what it can find, and why it matters before buying a home.",
    metaTitle: "Sewer Camera Inspection Ontario: What to Expect | Discount Drain",
    metaDesc: "What happens during a sewer camera inspection in Ontario. What the camera can find, how long it takes, and why it matters for home buyers in London Ontario.",
    content: `If someone has told you that you need a sewer camera inspection, or if you are considering one as part of buying a home in London or Southwestern Ontario, here is what the process actually looks like.

## What a sewer camera inspection is

A sewer camera inspection involves running a small waterproof camera on a flexible cable through your drain or sewer line. The camera transmits live video to a monitor, so the technician can see the inside of the pipe in real time.

The inspection covers the full length of the accessible pipe, from the cleanout access point to where the line connects to the municipal sewer or septic system. For most residential properties in London, that is somewhere between 20 and 60 metres.

## What it can find

The camera can identify root intrusion, which is the most common finding in older London homes with clay tile sewer lines. It can also find cracks, fractures, or collapsed sections, buildup of grease or scale, offset joints where pipe sections have shifted, bellied pipe (sections that have sagged and collect standing water), and foreign objects.

## What happens during the inspection

The technician locates the cleanout access point, which is usually in the basement, the utility room, or outside near the foundation. The camera is fed into the pipe and the footage plays on a monitor.

At Discount Drain, we show you the footage as we go. If we find something, we point to it on screen and explain what it means and what the options are. You are not left waiting for a written report that arrives days later.

The inspection itself takes about 30 to 60 minutes depending on the length and condition of the line.

## Why the free inspection matters

Several London homeowners have shared on community forums that they paid $350 to another company for a camera inspection, only to be told they needed $20,000 in repairs. When they got a second opinion from a different company that included a free camera inspection, the assessment was completely different.

A camera inspection should give you information, not pressure. If a company charges you for the inspection and then immediately pushes you toward a large repair, it is worth getting a second look.

At Discount Drain, we include a free sewer camera inspection with every service call. You see what we see, and you make the decision from there.

## For home buyers in London Ontario

A sewer camera inspection before closing is one of the most useful things you can do when buying an older home in London or Southwestern Ontario. Sewer line repairs are expensive, and they are not covered by a standard home inspection.

Knowing the condition of the sewer line before you sign gives you negotiating room or at least no surprises after you move in. If the camera shows root intrusion or a cracked pipe, you can factor that into your offer or ask the seller to address it before closing.

## The city's portion of the line

One thing a camera inspection can clarify is where the problem is located. The sewer line has two sections: the private section from your house to the property line, which is your responsibility, and the Private Drain Connection from the property line to the city main.

If the camera shows the main issue is in the city's portion of the line, the City of London has a flat-rate PDC renewal program. As of 2026, that fee is $7,250 and can be paid over 10 years through your property taxes. Your technician can help you identify which section is affected.

Call us at 519-451-8342 to arrange a camera inspection. We are available 24/7 for emergencies.`,
  },
  {
    slug: "catch-basin-maintenance-ontario",
    title: "Catch Basin Maintenance in Ontario: What Property Owners Need to Know",
    excerpt: "Catch basins do not get much attention until they stop working. Here is what they do, why they fail, and how often Ontario property owners should have them cleaned.",
    metaTitle: "Catch Basin Maintenance Ontario | Commercial and Residential Guide",
    metaDesc: "How often to clean catch basins in Ontario, signs of a failing catch basin, and what the cleaning process involves. For commercial and residential properties.",
    content: `Catch basins do not get much attention until they stop working. Then they get a lot of attention very quickly, usually because water is pooling in a parking lot, a driveway, or a yard after every rain.

Here is what catch basins do, why they fail, and how to keep them working.

## What a catch basin is

A catch basin is an underground drainage structure, typically a concrete or plastic box with a grated opening at the surface. Water flows in through the grate, sediment and debris settle at the bottom, and the relatively clean water exits through a pipe connected to the storm sewer or a drainage field.

They are common in commercial parking lots, industrial properties, and residential driveways. Municipalities across Ontario use them extensively to manage stormwater runoff. If you have a paved driveway or parking area, there is a good chance you have at least one.

## Why they fail

The most common reason catch basins stop working is that the sump at the bottom fills up with sediment, leaves, sand, and debris. Once the sump is full, water can no longer settle before entering the outlet pipe, which means sediment gets carried into the pipe and eventually causes a blockage downstream.

Other causes include cracked or broken concrete walls or base, a damaged or missing grate (which allows larger debris to enter), root intrusion into the outlet pipe, and outlet pipe sections that have shifted, cracked, or collapsed.

## Signs your catch basin needs attention

Water pools on the surface after rain and drains slowly or not at all. You can see that the sump is full of debris when you look through the grate. There is a foul smell coming from the basin. The grate is damaged or missing.

In Ontario, the problem often gets worse in spring. Sand and road salt from winter maintenance accumulate in the sump over the winter months, and the first heavy spring rains push that material into the outlet pipe.

## How often to clean it

For commercial properties with heavy traffic, annual cleaning is a reasonable baseline. Properties with a lot of trees nearby may need cleaning more often because leaves and organic material accumulate faster.

For residential catch basins, every two to three years is typical unless you notice signs of a problem sooner.

Ontario municipalities have their own maintenance schedules for catch basins on public property, but the ones on your private property are your responsibility.

## What cleaning involves

A catch basin cleaning uses a vacuum truck to remove the accumulated sediment and debris from the sump. The outlet pipe is also inspected and flushed to make sure it is clear. If the camera shows damage to the pipe or the basin structure, that gets addressed separately.

The job is usually done in under an hour for a standard residential basin. Commercial properties with multiple basins take longer.

## For commercial and municipal properties

Catch basin maintenance is often part of a broader stormwater management obligation. Failing to maintain catch basins can result in flooding, property damage, and in some cases, issues related to stormwater discharge compliance.

If you manage a commercial property, industrial site, or multi-unit residential building in London or Southwestern Ontario, a regular catch basin maintenance schedule is worth having in place before a problem develops.

At Discount Drain, we handle catch basin cleaning and repair for commercial properties, municipalities, and residential clients across London and Southwestern Ontario. Call us at 519-451-8342 to schedule a cleaning or inspection.`,
  },
];

for (const post of posts) {
  await conn.execute(
    `UPDATE blog_posts SET content = ?, excerpt = ?, metaTitle = ?, metaDesc = ? WHERE slug = ?`,
    [post.content, post.excerpt, post.metaTitle, post.metaDesc, post.slug]
  );
  console.log(`Updated: ${post.slug}`);
}

await conn.end();
console.log("All blog posts updated with Ontario-researched content.");
