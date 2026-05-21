import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const posts = [
  {
    slug: "how-to-tell-if-your-sewer-line-is-broken",
    body: `A broken sewer line can cause serious damage before you ever see a puddle. The tricky part is that most of the pipe is underground, so by the time something obvious happens inside your house, the problem has usually been building for a while.

Here are the warning signs Ontario homeowners should watch for.

## Slow drains throughout the house

One slow drain is usually a clog. Multiple slow drains at the same time, especially in different rooms, often point to something further down the line. If your kitchen sink, bathroom sink, and tub are all draining slowly, the blockage is probably past the point where individual drains connect to the main sewer line.

## Gurgling sounds

If you hear gurgling from your toilet after running the washing machine, or from your sink after flushing, that is air being pushed back through the system. It means water is having trouble moving through the pipe and is displacing air as it goes.

## Sewage smell inside the house

Sewer gas has a very distinct smell. If you notice it inside your home and you have ruled out a dry P-trap (the curved pipe under sinks that holds water to block odors), there may be a crack or break in the line somewhere.

## Wet patches in the yard

A soggy area in your yard that does not dry out, especially if it has a faint sewage smell, is a strong sign of a leaking sewer line underground. In Ontario, this can happen faster in spring when frost heave shifts the soil and puts stress on older clay or cast iron pipes.

## Unusually green grass in one spot

This one surprises people. If one section of your lawn is noticeably greener and lusher than the rest, it may be getting fertilized by a slow sewer leak below. It looks healthy, but it is not a good sign.

## Rodents or insects

Rats and certain insects can enter a home through cracks in the sewer line. If you are dealing with a sudden pest problem and cannot find an obvious entry point, the sewer line is worth inspecting.

## What to do

If you are seeing more than one of these signs, a sewer camera inspection is the fastest way to find out what is actually going on. At Discount Drain, we include a free video camera inspection with every service call. You watch the footage with us, on the spot, so you know exactly what you are dealing with before any work begins.

Most sewer problems in older London homes are fixable without digging up the yard. Trenchless repair methods can line or replace the pipe from the inside, which means your driveway and landscaping stay intact.

Call us at 519-451-8342 if you are seeing any of these signs. We are available 24/7 for emergencies.`,
  },
  {
    slug: "trenchless-vs-traditional-sewer-repair-ontario",
    body: `Digging up your yard is no longer the only way to fix a broken sewer line. Trenchless repair has been around for a while, but a lot of Ontario homeowners still do not know it exists until they are already facing a repair quote that includes excavation.

Here is a straightforward comparison so you know what to ask for.

## Traditional excavation

The old method involves digging a trench along the length of the damaged pipe, removing the broken section, installing new pipe, and then backfilling and restoring whatever surface was disturbed. That might be grass, a garden, a concrete driveway, or a paved walkway.

The pipe repair itself is usually not the expensive part. The cost comes from the excavation, the disposal of the old material, and the restoration work afterward. Replacing a driveway alone can add thousands of dollars to a repair bill.

Traditional excavation still makes sense in some situations, particularly when the pipe has collapsed completely or when the soil conditions make trenchless methods impractical.

## Trenchless pipe lining (CIPP)

Cured-in-place pipe lining, usually called CIPP, works by inserting a flexible liner coated in resin into the existing pipe. The liner is inflated against the inside of the old pipe and then cured with heat or UV light. When it hardens, it forms a new pipe inside the old one.

The access points are typically two small holes at either end of the damaged section. No trench. No driveway removal. Most jobs are done in a single day.

The resulting pipe is smooth, which actually improves flow compared to older clay or cast iron pipes that have corroded or accumulated buildup over the years.

## Trenchless pipe bursting

This method is used when the pipe is too damaged to line. A bursting head is pulled through the old pipe, fracturing it outward while simultaneously pulling a new pipe into place behind it. Again, only small access holes are needed.

## Which method is right for your situation?

A camera inspection is the first step. Once we can see the condition of the pipe, we can tell you whether lining is an option, whether bursting makes more sense, or whether excavation is actually necessary.

In most cases in London and the surrounding area, trenchless methods are viable. Older homes with clay tile sewer lines are often good candidates because the pipe is still structurally present, just cracked or root-invaded.

If you have been quoted for excavation and want a second opinion, call us at 519-451-8342. We will do a camera inspection and walk you through your options.`,
  },
  {
    slug: "wet-basement-causes-ontario",
    body: `Water in your basement is not always a foundation problem. That is the first thing most homeowners get wrong. The source could be a crack in the foundation wall, but it could also be a drainage issue, a grading problem, or a failed weeping tile system. Getting the diagnosis right matters because the fix is completely different depending on the cause.

Here are the most common reasons Ontario basements get wet.

## Surface water coming in through cracks

Foundation walls develop cracks over time, especially in Ontario where freeze-thaw cycles put repeated stress on the concrete. Water from rain or snowmelt can work its way through these cracks, particularly if the soil around the foundation stays saturated.

You will usually see this as a damp patch or a trickle that appears during or right after heavy rain. The location of the wet spot often lines up with a crack on the exterior side of the wall.

## Failed or blocked weeping tile

Weeping tile is the drainage system installed around the perimeter of the foundation when the house was built. It is designed to collect groundwater and direct it away from the foundation. Over time, weeping tile can crack, collapse, or become clogged with silt and roots.

When weeping tile fails, groundwater has nowhere to go except up against the foundation wall. This type of leak often appears at the base of the wall where the floor meets the foundation, and it tends to get worse in spring when the water table is high.

## Poor grading around the house

The ground around your home should slope away from the foundation so that rainwater drains away rather than pooling against the wall. Over the years, soil settles and the grade can reverse, directing water toward the house instead of away from it.

This is one of the cheaper fixes if it is caught early. Regrading the soil around the foundation can make a significant difference.

## Window well drainage

Basement windows sit below grade, which means they have a window well to keep soil away from the glass. If the drainage at the bottom of the window well gets blocked, water accumulates and eventually finds its way through the window frame.

## Condensation

Not all basement moisture is coming from outside. In summer, warm humid air enters the basement and condenses on the cooler concrete walls and floor. This looks like sweating and is often mistaken for a leak.

A simple test: tape a piece of plastic sheeting to the wall and seal the edges. Leave it for 24 hours. If moisture appears on the room side of the plastic, it is condensation. If it appears on the wall side, water is coming through from outside.

## What to do

The right fix depends on the source. At Discount Drain, we start with a proper assessment before recommending anything. We have fixed wet basements in London and Southwestern Ontario for over 55 years, and our basement waterproofing work comes with a 20-year warranty.

Call us at 519-451-8342 if you are dealing with a wet basement. We will tell you honestly what is causing it and what it will take to fix it.`,
  },
  {
    slug: "how-often-clean-drains-ontario",
    body: `Most homeowners wait until a drain backs up to think about drain cleaning. That is understandable, but it usually means paying for an emergency call when a routine maintenance visit would have prevented the problem.

How often you should clean your drains depends on how the drains are used and what kind of pipes you have.

## Kitchen drains

Kitchen drains take a lot of abuse. Grease, food particles, and soap residue build up on the inside of the pipe over time, narrowing the opening until water starts draining slowly. Once you notice slow drainage in the kitchen, there is already a significant buildup.

For most households, having the kitchen drain cleaned once a year is a reasonable baseline. If you cook frequently, have a large family, or use the kitchen commercially, twice a year makes more sense.

## Bathroom drains

Hair is the main culprit in bathroom drains. It catches on the inside of the pipe and traps soap scum, creating a blockage that builds gradually. A drain strainer over the tub and shower drains helps, but it does not eliminate the problem entirely.

Bathroom drains generally need less frequent cleaning than kitchen drains. Every one to two years is typical for most households.

## Main sewer line

This is the one most people forget about entirely. The main sewer line carries everything from every drain in the house to the municipal sewer or septic system. Tree roots are the most common cause of main sewer line problems in Ontario, particularly in older neighborhoods with mature trees.

Roots enter through small cracks in the pipe and grow over time, eventually causing slow drainage throughout the house or a complete blockage. Having the main line inspected and cleaned every two to three years is a reasonable schedule for homes with older clay tile pipes or large trees nearby.

## Signs you should not wait for the scheduled cleaning

If you notice any of the following, call sooner rather than later:

- Multiple drains in the house are slow at the same time
- You hear gurgling from drains or toilets
- There is a sewage smell coming from a drain
- Water backs up into a tub or sink when you flush the toilet

These signs suggest a problem in the main line, not just an individual drain.

## A note on chemical drain cleaners

Store-bought drain cleaners can clear a minor clog, but they are hard on pipes, particularly older metal pipes. They also do nothing for root intrusion or structural problems. If a drain is slow and the chemical cleaner does not fix it, the problem is probably not a simple grease buildup.

For routine maintenance, a professional cleaning with a power flusher or auger is more effective and safer for your pipes.

Call us at 519-451-8342 to schedule a drain cleaning or to ask about a maintenance plan for your home.`,
  },
  {
    slug: "sewer-camera-inspection-what-to-expect",
    body: `If someone has told you that you need a sewer camera inspection, or if you are considering one as part of buying a home, here is what the process actually looks like.

## What a sewer camera inspection is

A sewer camera inspection involves running a small waterproof camera on a flexible cable through your drain or sewer line. The camera transmits live video to a monitor, so the technician can see the inside of the pipe in real time.

The inspection covers the full length of the accessible pipe, from the cleanout access point to where the line connects to the municipal sewer or septic system. For most residential properties, that is somewhere between 20 and 60 meters.

## What it can find

The camera can identify:

- Root intrusion (the most common finding in older Ontario homes)
- Cracks, fractures, or collapsed sections
- Buildup of grease, scale, or debris
- Offset joints where pipe sections have shifted
- Bellied pipe (sections that have sagged and collect standing water)
- Foreign objects

## What happens during the inspection

The technician locates the cleanout access point, which is usually in the basement, the utility room, or outside near the foundation. The camera is fed into the pipe and the footage plays on a monitor.

At Discount Drain, we show you the footage as we go. If we find something, we can point to it on screen and explain what it means and what the options are. You are not left waiting for a written report that arrives days later.

The inspection itself takes about 30 to 60 minutes depending on the length and condition of the line.

## What happens after

If the pipe is in good condition, you have peace of mind and a baseline record of what the pipe looks like. If there is a problem, you know exactly what it is and where it is before any work begins.

This matters because it prevents unnecessary digging. A lot of sewer repairs that used to require excavation can now be done with trenchless methods, but only if you know the exact location and nature of the problem first.

## For home buyers

A sewer camera inspection before closing is one of the more useful things you can do when buying an older home in London or Southwestern Ontario. Sewer line repairs are expensive, and they are not covered by a standard home inspection. Knowing the condition of the sewer line before you sign gives you negotiating room or at least no surprises after you move in.

At Discount Drain, we include a free sewer camera inspection with every service call. If you want a standalone inspection for a home purchase, call us at 519-451-8342 to arrange it.`,
  },
  {
    slug: "catch-basin-maintenance-ontario",
    body: `Catch basins do not get much attention until they stop working. Then they get a lot of attention very quickly, usually because water is pooling in a parking lot, a driveway, or a yard after every rain.

Here is what catch basins do, why they fail, and how to keep them working.

## What a catch basin is

A catch basin is an underground drainage structure, typically a concrete or plastic box with a grated opening at the surface. Water flows in through the grate, sediment and debris settle at the bottom, and the relatively clean water exits through a pipe connected to the storm sewer or a drainage field.

They are common in commercial parking lots, industrial properties, and residential driveways. Municipalities use them extensively to manage stormwater runoff.

## Why they fail

The most common reason catch basins stop working is that the sump at the bottom fills up with sediment, leaves, sand, and debris. Once the sump is full, water can no longer settle before entering the outlet pipe, which means sediment gets carried into the pipe and eventually causes a blockage downstream.

Other causes include:

- Cracked or broken concrete walls or base
- Damaged or missing grate (which allows larger debris to enter)
- Root intrusion into the outlet pipe
- Outlet pipe that has shifted, cracked, or collapsed

## Signs your catch basin needs attention

- Water pools on the surface after rain and drains slowly or not at all
- You can see that the sump is full of debris when you look through the grate
- There is a foul smell coming from the basin
- The grate is damaged or missing

## How often to clean it

For commercial properties with heavy traffic, annual cleaning is a reasonable baseline. Properties with a lot of trees nearby may need cleaning more often because leaves and organic material accumulate faster.

For residential catch basins, every two to three years is typical unless you notice signs of a problem sooner.

## What cleaning involves

A catch basin cleaning uses a vacuum truck to remove the accumulated sediment and debris from the sump. The outlet pipe is also inspected and flushed to make sure it is clear. If the camera shows damage to the pipe or the basin structure, that gets addressed separately.

The job is usually done in under an hour for a standard residential basin. Commercial properties with multiple basins take longer.

## For commercial and municipal properties

Catch basin maintenance is often part of a broader stormwater management obligation. Failing to maintain catch basins can result in flooding, property damage, and in some cases, regulatory issues related to stormwater discharge.

At Discount Drain, we handle catch basin cleaning and repair for commercial properties, municipalities, and residential clients across London and Southwestern Ontario. Call us at 519-451-8342 to schedule a cleaning or inspection.`,
  },
];

for (const post of posts) {
  await conn.execute(
    `UPDATE blog_posts SET content = ? WHERE slug = ?`,
    [post.body, post.slug]
  );
  console.log(`Updated: ${post.slug}`);
}

await conn.end();
console.log("All blog posts updated.");
