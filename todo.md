# Discount Drain — Full Production Build TODO

## Phase 1: Project Setup
- [x] Create todo.md (this file)
- [x] Define database schema (services, testimonials, blog posts, team, form submissions)
- [x] Run pnpm db:push to sync schema
- [x] Restart dev server

## Phase 2: Global Layout & Design System (V2 — Flowmapp style)
- [x] Global Layout component with top bar, nav, footer
- [x] Navigation: logo, links (Services, Residential, Commercial, About, Blog, Contact), CTA button
- [x] Mobile hamburger menu
- [x] Footer: logo, service links, contact info, social icons, copyright
- [x] V2 design tokens in index.css (white canvas, blue #0080ff, Inter, pill buttons)
- [x] Shared UI components: SectionHeading, ServiceCard, TestimonialCard, CTABanner
- [x] Update App.tsx routes for all new pages

## Phase 3: Home Page (CRO-optimized)
- [x] Announcement bar (free camera inspection offer)
- [x] Hero section: split layout, video card right, headline + CTAs left
- [x] Trust badges strip (BBB, WSIB, Insured, 24/7)
- [x] Stats counter strip (55+ years, 20+ techs, 24/7, 20yr warranty)
- [x] Services overview grid (6 services with icons, short desc, link to service page)
- [x] Featured service spotlight (Trenchless)
- [x] About teaser section (family-owned since 1970, photo)
- [x] Testimonials carousel (3 reviews)
- [x] CTA banner (call now / free quote)
- [x] All copy humanized: no em dashes, no AI vocabulary

## Phase 4: Service Pages (6 dedicated pages, SEO + CRO)
- [x] /services — Services overview landing page
- [x] /services/sewer-camera-inspection — Sewer Camera Inspection
- [x] /services/trenchless-pipe-repair — Trenchless Pipe Repair
- [x] /services/wet-basement-repair — Wet Basement Waterproofing
- [x] /services/sewer-repair-installation — Sewer Repair and Installation
- [x] /services/drain-cleaning — Drain Cleaning and Power Flushing
- [x] /services/excavation-services — Excavation Services
- [x] Each page: H1, meta title/desc, FAQ section, CTA, related services
- [x] All copy humanized: no em dashes, no AI vocabulary

## Phase 5: Inner Pages
- [x] /about — About page (history, team, values, certifications)
- [x] /residential — Residential services overview
- [x] /commercial — Commercial services overview
- [x] /contact — Contact page with form, phone, email, Google Maps embed
- [x] All copy humanized: no em dashes, no AI vocabulary

## Phase 6: Blog / News Section
- [x] /blog — Blog listing page
- [x] /blog/[slug] — Individual blog post page
- [x] 6 seed articles targeting top Ontario drain search queries
- [x] Blog articles: no em dashes, humanized copy
- [x] Rewrite all 6 blog articles with real Ontario/London homeowner search intent
- [x] Add 12-14 Ontario-researched FAQs to each of the 6 dedicated service pages

## Phase 7: CMS Admin Panel
- [x] /site/admin — Protected admin login (password-based, accessible outside Manus)
- [x] Admin: manage services (CRUD)
- [x] Admin: manage testimonials (CRUD)
- [x] Admin: manage blog posts (CRUD)
- [x] Admin: manage team members (CRUD)
- [x] Admin: view form submissions (contact + quote requests)
- [x] Admin: dashboard overview (submission counts, recent activity)

## Phase 8: Forms & Backend
- [x] Contact form (name, phone, email, message)
- [x] Free Quote request form (name, phone, email, service, description)
- [x] Backend: save submissions to DB
- [x] Owner notification on new submission (notifyOwner)
- [x] Form validation (client + server)
- [x] Success/error states

## Phase 9: SEO
- [x] React Helmet / meta tags on every page (title, description, canonical)
- [x] Open Graph tags
- [x] /sitemap.xml (auto-generated)
- [x] /robots.txt
- [x] LocalBusiness JSON-LD schema on Home and Contact pages
- [x] Service page schema (Service schema) — FAQ JSON-LD on each service page
- [x] Blog post schema (Article schema)

## Phase 10: QA & Delivery
- [x] Mobile responsiveness check (all pages)
- [x] All links working
- [x] Forms submitting correctly
- [x] Admin panel accessible and functional
- [x] Vitest tests passing
- [x] Final checkpoint saved
- [x] Deliver to user

## Bug Fix: Scroll Animation Content Visibility
- [x] Diagnose fade-in-up opacity:0 bug causing service detail and blog post content to be invisible
- [x] Fix CSS: fade-in-up defaults to opacity:1 (progressive enhancement), hidden only when body.js-scroll-ready is present
- [x] Fix useScrollReveal in all 5 DD pages to add body.js-scroll-ready on mount
- [x] Fix DDServiceDetail isLoading bug (React Query v5 isLoading=true when disabled)
- [x] Verify service detail pages show full content (About, What You Get, FAQs, Reviews)
- [x] Verify blog post detail pages show full article content
- [x] Verify blog listing page shows all 11 posts with correct images

## V2 Improvements
- [x] Audit all 6 service pages for copy uniqueness and rewrite to 85%+ unique content per page
- [x] Add Google Reviews widget to homepage and all 6 service detail pages
- [x] Create interactive service area map with London and surrounding towns on homepage and a dedicated service area page
- [x] Save V2 checkpoint

## V2 Route Migration (/site/* -> root paths)
- [x] Audit all /site/* routes in App.tsx
- [x] Update App.tsx to serve V2 pages at root paths (/, /about, /services, etc.)
- [x] Remove old /site/* routes
- [x] Update all internal links in DDLayout, DDHome, and all DD pages
- [x] Verify all pages at root paths and save checkpoint

## Phase 11: Live Google Reviews + Town Landing Pages
- [x] Replace placeholder reviews with real 5-star Google reviews from Discount Drain's Google Business page
- [x] Write unique geo-targeted copy and 5 FAQs for all 12 town pages
- [x] Build DDTownLanding component with FAQ JSON-LD and LocalBusiness structured data
- [x] Register all 12 town routes in App.tsx (/service-area/:townSlug)
- [x] Add all 12 town pages + /service-area to sitemap.xml
- [x] Update service area page town cards to link to individual landing pages

## Phase 12: Scroll Services Section Improvements
- [x] Increase scroll travel per card from 300px to 400px
- [x] Remove old services grid section from DDHome
- [x] Add hover-expanding CTA on arrow button of each scroll service card

## Phase 13: Nav Smart-Scroll
- [x] Residential nav link: smooth scroll to #services-section + switch to residential tab on homepage; navigate to /residential on other pages
- [x] Commercial nav link: smooth scroll to #services-section + switch to commercial tab on homepage; navigate to /commercial on other pages
- [x] Both desktop nav and mobile menu updated
- [x] TypeScript passes cleanly (0 errors)

## Phase 14: Smooth Scroll Services Section (RAF lerp)
- [x] Replace scroll event + inline style approach with RAF lerp animation loop
- [x] Cards ease toward target position every frame (LERP=0.09) — no React re-renders during scroll
- [x] Progress dots still track active card via lerped position
- [x] Tab switch resets position instantly
- [x] ArrowCTA hover behaviour preserved exactly
- [x] TypeScript passes cleanly (0 errors)

## Phase 15: Lerp speed 0.15 + Image parallax
- [x] Bump LERP from 0.09 to 0.15 for snappier scroll response
- [x] Add per-card image parallax: inner image div shifts counter to card travel at 0.12x factor
- [x] Image panel uses overflow:hidden + -8% left/right bleed to absorb parallax travel without gaps
- [x] Flagship badge z-index raised above parallax layer
- [x] Single RAF loop drives both track translateX and all image parallax — zero extra re-renders
- [x] TypeScript passes cleanly (0 errors)

## Phase 16: Homepage Section Reorder (Hero → About Us → Our Services)
- [x] Move About Us section to immediately after the Stats Strip in DDHome.tsx
- [x] Our Services (ScrollServicesSection) follows directly after About Us
- [x] All other sections remain in their existing order below
- [x] Verify no broken imports or missing section IDs
- [x] Save checkpoint

## Phase 17: Parallax Factor 0.2
- [x] Bump PARALLAX_FACTOR from 0.12 to 0.2 in ScrollServicesSection.tsx
- [x] Save checkpoint

## Phase 18: Active Card Scale-Up
- [x] Add scale(1.02) on active card and scale(0.97) on inactive cards via RAF loop
- [x] Driven by lerped position — no extra React state
- [x] Save checkpoint

## Phase 19: Blog Image Audit and Replacement
- [x] Audit all blog post cover images in DB and code for third-party branding
- [x] Generate clean contextually accurate replacement images for each blog post
- [x] Replace all branded blog images with new ones in DB
- [x] Save checkpoint

## Phase 20: About Us Logo Overlay Badge
- [x] Add Discount Drain logo as overlay badge on one of the About Us photo collage images
- [x] Save checkpoint

## Phase 21: Clickable Service Cards with Dedicated Service Pages
- [x] Make each service card in ScrollServicesSection clickable (navigate to service detail page)
- [x] Ensure each service detail page has contextually accurate images for that specific service
- [x] Generate service-specific images for each of the 6 services
- [x] Save checkpoint

## Phase 22: Mobile Responsive ScrollServicesSection (Vertical Stacked List)
- [x] Detect mobile (≤767px) and disable sticky scroll trap + lerp RAF loop
- [x] Mobile layout: portrait cards stacked vertically, full-width image on top (300px tall), text below
- [x] Mobile: remove fixed height wrapper, let section flow naturally in document
- [x] Mobile: tab toggle remains functional
- [x] Mobile: ArrowCTA replaced with a simple text link (hover expand doesn't work on touch)
- [x] Desktop layout unchanged (lerp, parallax, scale all preserved)
- [x] Save checkpoint

## Phase 23: Mobile Sticky-Stacking Cards (SwiftForm pattern)
- [x] Replace plain vertical scroll with sticky-stacking: each card wrapper position:sticky; top:24px on mobile (≤767px)
- [x] Incrementing z-index per card (1, 2, 3…) so later cards paint on top
- [x] Solid background on each card so it covers the card beneath
- [x] Parent container tall enough (sum of card heights) for scroll room before each card sticks
- [x] Disable lerp RAF loop and sticky scroll trap on mobile (already done, preserve)
- [x] Desktop behaviour unchanged
- [x] Save checkpoint

## Phase 24: Stagger Animations + Desktop CTA Improvements
- [x] TestimonialCard staggered entrance animation (75ms stagger per card, fade-in-up via IntersectionObserver)
- [x] Desktop ScrollServicesSection: Add "Get a Free Quote" ghost/outline button next to "View All Services"
- [x] Desktop ScrollServicesSection: Move both CTA buttons closer to the bento cards (bottom:24px, reduced from 32px)
- [x] Save checkpoint

## Phase 25: Correct Residential vs Commercial Service Categorization
- [x] Add category field to services table in drizzle/schema.ts (enum: residential | commercial | both)
- [x] Run pnpm db:push to push schema change
- [x] Seed/update all services in DB with correct category values based on discountdrain.ca
- [x] Add commercial-only services to DB: Municipal Services, Catch Basin Cleaning
- [x] Update DDServices.tsx filter to use category field from DB
- [x] Verify Residential tab shows 6 residential services (5 both + 1 residential-only) and Commercial tab shows 7 commercial services (5 both + 2 commercial-only)
- [x] Save checkpoint

## Phase 27: Fix Duplicates on DDServices Page & Fix Desktop Scroll Travel

- [x] Read DDServices.tsx to understand current filter logic
- [x] Check DB for all services and their category values
- [x] Delete duplicate Septic Service commercial row; merge into single 'Septic Service and Repairs' (category=both)
- [x] Fix desktop scroll travel from 180px to 320px per card
- [x] Fix maxTranslate from 0.45 to 0.85 so all cards are reachable
- [x] TypeScript check passes (0 errors)
- [x] Save checkpoint

## Phase 28: Dedicated Septic Service and Repairs Page

- [x] Review existing service page DDServiceDetail.tsx for structure reference (dynamic slug-based page)
- [x] Populate septic-repairs DB row with full longDesc (1572 chars), 6 benefits, 10 FAQs, metaTitle, metaDesc
- [x] Add septic-hero.webp to HERO_IMGS map in DDServiceDetail.tsx
- [x] Route /services/:slug already registered in App.tsx — no new file needed
- [x] TypeScript check passes (0 errors)
- [x] Save checkpoint

## Phase 29: Municipal Services + Catch Basin Cleaning Pages + Septic Related Services

- [x] Read humanizer skill
- [x] Review existing service page copy (septic, sewer repair, trenchless) to establish uniqueness baseline
- [x] Write unique long-form copy for Municipal Services (5+ paragraphs, distinct angle, no overlap with other pages)
- [x] Write 6 unique benefits for Municipal Services
- [x] Write 10 unique FAQs for Municipal Services
- [x] Write unique long-form copy for Catch Basin Cleaning (5+ paragraphs, distinct angle)
- [x] Write 6 unique benefits for Catch Basin Cleaning
- [x] Write 10 unique FAQs for Catch Basin Cleaning
- [x] Generate hero image for Municipal Services (no third-party branding)
- [x] Generate hero image for Catch Basin Cleaning (no third-party branding)
- [x] Upload both hero images to CDN and update DB imageUrl
- [x] Fix FAQs to use q/a keys matching DDServiceDetail component
- [x] Add municipal-services and catch-basin-cleaning to HERO_IMGS map
- [x] Add RELATED_SERVICES map to DDServiceDetail.tsx
- [x] Add Related Services section to Septic page (Sewer Repair + Trenchless cards)
- [x] TypeScript check passes (0 errors)
- [x] Save checkpoint

## Phase 30: Bento Card Links + Related Services for Municipal and Catch Basin Pages

- [x] Update Catch Basin Cleaning bento card in ScrollServicesSection.tsx to link to /services/catch-basin-cleaning
- [x] Update Municipal Services bento card in ScrollServicesSection.tsx to link to /services/municipal-services
- [x] Add Related Services entries for municipal-services in RELATED_SERVICES map (Catch Basin Cleaning + Sewer Repair)
- [x] Add Related Services entries for catch-basin-cleaning in RELATED_SERVICES map (Municipal Services + Drain Cleaning)
- [x] Made Related Services subtitle dynamic per slug
- [x] HMR confirmed clean build
- [x] Save checkpoint

## Phase 31: Full Service Pages Build (All 9 Services)

- [x] Catalog Google Drive assets and map to services
- [x] Add breadcrumb nav + BreadcrumbList JSON-LD to DDServiceDetail.tsx
- [x] Write unique copy for Camera Inspection page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Write unique copy for Trenchless Pipe Repair page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Write unique copy for Wet Basements page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Write unique copy for Sewer Repair and Installation page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Write unique copy for Drain Cleaning and Power Flushing page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Write unique copy for Dump Trucks and Machine Excavating page (5+ paragraphs, 6 benefits, 10 FAQs)
- [x] Upload client Drive assets to CDN and map to correct service pages
- [x] Update all 9 service DB rows with full content, correct imageUrl, and inline images in longDesc
- [x] Add Related Services cross-links for all 9 service pages in RELATED_SERVICES map
- [x] Verify all pages render correctly with no missing content
- [x] TypeScript check passes (0 errors)
- [x] Save checkpoint

## Phase 32: Blog Section Build

- [x] Add blogPosts table to drizzle/schema.ts (slug, title, metaDesc, heroImg, category, readTime, publishedAt, body, tags)
- [x] Run pnpm db:push to migrate schema
- [x] Add blog tRPC procedures: blog.list, blog.getBySlug, blog.getRelated
- [x] Write 5 SEO-targeted blog posts (sewer repair cost, wet basement fix, trenchless vs excavation, drain cleaning frequency, pre-purchase sewer inspection)
- [x] Seed all 5 blog posts to database
- [x] Build DDBlog.tsx listing page with card grid, category filter, and hero featured post
- [x] Build DDPostDetail.tsx individual post page with breadcrumb, JSON-LD Article structured data, author block, and related posts
- [x] Wire /blog and /blog/:slug routes in App.tsx
- [x] Update Blog nav link to point to /blog
- [x] Verify all pages render correctly
- [x] TypeScript check passes (0 errors)
- [x] Save checkpoint

## Phase 33: Full Audit and Bug Fix

- [x] Audit App.tsx routes — confirm all routes are registered and match page file names
- [x] Audit DDBlog.tsx — confirm tRPC call, data shape, and rendering logic
- [x] Audit DDBlogPost.tsx — confirm tRPC call, slug param, and rendering logic
- [x] Audit DDServiceDetail.tsx — confirm tRPC call, slug param, HERO_IMGS, RELATED_SERVICES
- [x] Audit ScrollServicesSection.tsx — confirm bento card links point to correct slugs
- [x] Audit server/routers.ts — confirm all blog and service procedures return correct data
- [x] Audit server/db.ts — confirm all query helpers return correct fields
- [x] Check DB for missing or malformed service/blog records
- [x] Fix all identified issues (scroll animation opacity:0 bug, React Query v5 isLoading bug)
- [x] TypeScript check passes (0 errors)
- [x] Browser verify all fixed pages
- [x] Save checkpoint

## Phase 34: Convert to Static React Site
- [x] Remove trpc imports from all DD pages - use static data files
- [x] Remove trpc mutation from DDContact.tsx - use client-side state only
- [x] Remove trpc mutation from DDQuote.tsx - use client-side state only
- [x] Rewrite DDAdmin.tsx to use static data (no trpc queries/mutations)
- [x] Remove useAuth import from Home.tsx
- [x] Rewrite main.tsx to remove trpc/react-query providers
- [x] Update package.json scripts to use pure Vite build
- [x] Add vercel.json for SPA routing
- [x] TypeScript check passes (0 errors)
- [x] Vite build succeeds (1645 modules, no errors)

## Phase 35: SEO - Open Graph, Twitter Cards, JSON-LD, Service Detail Meta

- [x] Add Open Graph and Twitter Card meta tags to all core pages (Home, About, Residential, Commercial, Contact, Quote, Services, Service Area, Blog)
- [x] Add JSON-LD LocalBusiness structured data to the homepage
- [x] Add unique canonical and keyword meta tags to all service detail pages (DDServiceDetail.tsx)

## Phase 36: Article JSON-LD + Breadcrumb Navigation

- [x] Build reusable Breadcrumb component (client/src/components/dd/Breadcrumb.tsx)
- [x] Add Article JSON-LD structured data to DDBlogPost.tsx
- [x] Add breadcrumb nav + BreadcrumbList JSON-LD to DDBlogPost.tsx
- [x] Verify DDServiceDetail.tsx already has BreadcrumbList JSON-LD (add if missing)
- [x] Add visual breadcrumb nav to DDServices.tsx (Services hub page)
- [x] Add visual breadcrumb nav to DDBlog.tsx (Blog listing page)
- [x] TypeScript check passes (0 errors)
- [x] Vite build succeeds

## Phase 37: Town Breadcrumbs, Google Fonts Perf, Blog Date Updates

- [x] Add breadcrumb nav + BreadcrumbList JSON-LD to DDTownLanding.tsx (Home > Service Area > [Town])
- [x] Add Google Fonts preconnect tags to client/index.html
- [x] Add font-display=swap to Google Fonts URL in client/index.html
- [x] Update all 11 blog post publishedAt dates to 2026
- [x] TypeScript check passes (0 errors)
- [x] Vite build succeeds

## Phase 38: DNS Prefetch/Preconnect + FAQ Structured Data Audit

- [x] Audit all third-party runtime domains (CloudFront, Picsum, Google Maps, Google Fonts)
- [x] Add dns-prefetch + preconnect tags for CloudFront CDN (hero/service images)
- [x] Add dns-prefetch + preconnect tags for Picsum Photos (team avatars)
- [x] Add dns-prefetch + preconnect tags for Google Maps (Contact page map pin)
- [x] Confirmed all 9 service pages already have FAQPage JSON-LD with rich FAQ content
- [x] Vite build succeeds

## Phase 39: Code Splitting + Page Loader UI

- [x] Build reusable PageLoader component (skeleton + spinner, matches DD brand)
- [x] Convert all route-level pages in App.tsx to React.lazy imports
- [x] Wrap all routes in Suspense with PageLoader fallback
- [x] Verify JS bundle splits into multiple chunks (< 500 KB each)
- [x] Vite build succeeds
EOF
## Phase 41: Mega-Menu Expansion + Service Gallery Section

- [x] Add Catch Basin Cleaning, Septic Service, Municipal Services to navbar mega-menu left column
- [x] Download all Google Drive media assets (images + videos) from all 8 service subfolders
- [x] Upload all assets to CDN via manus-upload-file --webdev
- [x] Build reusable ServiceGallery component (lightbox grid: thumbnail grid + full-screen lightbox with prev/next nav)
- [x] Add gallery data (CDN URLs) to serviceGallery.ts for each of the 9 service pages
- [x] Wire ServiceGallery component into DDServiceDetail.tsx (renders between reviews and Related Services sections)
- [x] Verify all 9 service pages render gallery correctly
- [x] Build passes cleanly
- [x] Save checkpoint

## Phase 42: Videos, Captions, Gallery CTA, and Color Audit

- [x] Download UV liner videos from Google Drive (4 files: Lining Before, Lining After, IMG_1006.mov, IMG_1260.mov)
- [x] Convert all .mov files to .mp4 using ffmpeg
- [x] Upload converted .mp4 files to CDN
- [x] Update ServiceGallery component to support video tiles (poster frame + play button, inline video in lightbox)
- [x] Add UV liner videos to trenchless-pipe-repair gallery in serviceGallery.ts
- [x] Update all gallery captions with descriptive text and before/after labels across all 9 service pages
- [x] Add "Get a Free Quote" CTA button directly below gallery section on every service page
- [x] Audit entire codebase for gold (#FEDA86) and warm yellow color values
- [x] Replace all gold/yellow with V2 light blue palette (#0080ff / blue equivalents)
- [x] Verify no gold/yellow remains on service pages or homepage services section
- [x] Build passes cleanly
- [x] Save checkpoint

## Phase 43: CRO Homepage Sections (Replace Testimonials)

- [x] Replace testimonials section with Trust+Form split section (trust grid left, mini-form right)
- [x] Add How It Works 3-step section immediately below Trust+Form
- [x] Add staggered cascade-reveal animation for trust items (left-to-right)
- [x] Add slide-in-right animation for form card
- [x] Add step-sequence animation with self-drawing connector line for How It Works
- [x] Build passes cleanly
- [x] Save checkpoint

## Phase 43: CRO Sections — Trust+Form Split + How It Works
- [x] Add TrustFormSection component to DDHome.tsx (5 trust items with cascade animation, 3-field mini lead capture form with slide-in animation)
- [x] Add HowItWorksSection component to DDHome.tsx (3-step process with self-drawing connector line and staggered step reveal)
- [x] Add Send icon to lucide-react imports
- [x] Verify build compiles cleanly (4.39s, no errors)
- [x] Save checkpoint

## Phase 44: Infinite Review Marquee (Roofex-style ticker)
- [x] Create ReviewMarquee component with CSS @keyframes infinite horizontal ticker
- [x] Duplicate card set for seamless loop
- [x] Left/right fade edge gradients
- [x] Hover-to-pause animation
- [x] prefers-reduced-motion support
- [x] Replace GoogleReviewsWidget homepage variant with ReviewMarquee in DDHome.tsx
- [x] Build passes cleanly

## Phase 45: Process Card Polish
- [x] Fix arrow connector overlap — reduce right offset so arrows sit in the gap between cards, not over text
- [x] Add hover lift (translateY -5px) to each process card in DDHome HowItWorksSection
- [x] Apply Roofex card style (beige, step numbers, dashed line, arrow connectors, hover lift) to service detail page process sections
- [x] ScrollDepthBanner component: slides in from bottom after 70% scroll depth, offers free camera inspection, dismissable, session memory
- [x] Restyle ScrollDepthBanner to match site colour palette (white bg, blue accent, no em dashes)
- [x] Add trust badge strip below hero CTA buttons (BBB, WSIB, Google 5-star, Licensed)
- [x] Add pulse animation to Call Now button in ScrollDepthBanner
- [x] Mega-menu grouped Services dropdown in nav (Residential / Commercial columns with icons)
- [x] Breadcrumb navigation on service detail pages (visual trail + BreadcrumbList JSON-LD)
- [x] Alternating section background rhythm on homepage (white / light grey / white cadence)
- [x] Mobile process cards: add vertical spacing between cards on mobile
- [x] Scroll-depth banner: centre and equalise CTA buttons on mobile
- [x] Mega-menu: add short descriptions beneath each service item (no em dashes)
- [x] Homepage quote form: real-time validation and success modal
