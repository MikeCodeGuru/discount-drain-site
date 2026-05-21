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
