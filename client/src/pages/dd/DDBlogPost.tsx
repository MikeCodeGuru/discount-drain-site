import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { Link, useParams } from "wouter";
import { Phone, ArrowRight, Clock, Tag, CheckCircle2 } from "lucide-react";
import DDLayout from "./DDLayout";
import { trpc } from "@/lib/trpc";

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

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const CATEGORY_LABELS: Record<string, string> = {
  "sewer-repair": "Sewer Repair",
  "wet-basement": "Wet Basements",
  "drain-cleaning": "Drain Cleaning",
  "sewer-camera": "Camera Inspection",
  "trenchless": "Trenchless",
};

export default function DDBlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [slugValue] = useMemo(() => [slug ?? ""], [slug]);

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: slugValue });
  const { data: relatedPosts } = trpc.blog.related.useQuery(
    { slug: slugValue, category: post?.category ?? undefined },
    { enabled: !!post }
  );

  const ref1 = useScrollReveal();

  if (isLoading) {
    return (
      <DDLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </DDLayout>
    );
  }

  if (!post) {
    return (
      <DDLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center py-20">
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111111", marginBottom: "16px" }}>Article Not Found</h1>
          <p style={{ color: "#8c9baa", marginBottom: "24px" }}>The article you are looking for does not exist.</p>
          <Link href="/blog" className="btn-primary">View All Articles</Link>
        </div>
      </DDLayout>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <DDLayout>
      <title>{post.metaTitle ?? post.title} | Discount Drain Blog</title>
      {post.metaDesc && <meta name="description" content={post.metaDesc} />}

      {/* Structured Data: Article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": { "@type": "Organization", "name": "Discount Drain" },
        "publisher": {
          "@type": "Organization",
          "name": "Discount Drain",
          "url": "https://discountdrain.ca",
          "logo": { "@type": "ImageObject", "url": "https://discountdrain.ca/logo.png" },
        },
        "datePublished": post.publishedAt,
        "image": post.imageUrl,
        "url": `https://discountdrain.ca/blog/${post.slug}`,
      })}} />

      {/* Structured Data: BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://discountdrain.ca/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://discountdrain.ca/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://discountdrain.ca/blog/${post.slug}` },
        ],
      })}} />

      {/* Hero */}
      <section
        className="relative py-20 flex items-end"
        style={{
          minHeight: "360px",
          backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: post.imageUrl ? undefined : "#0080ff",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="relative container pb-8" style={{ zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" style={{ color: "#60b3ff", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: "#60b3ff", textDecoration: "none" }}>Blog</Link>
            <span>/</span>
            <span className="text-white truncate" style={{ maxWidth: "300px" }}>{post.title}</span>
          </nav>
          {post.category && (
            <div className="flex items-center gap-1 mb-3">
              <Tag size={12} style={{ color: "#60b3ff" }} />
              <span style={{ color: "#60b3ff", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>
          )}
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, lineHeight: 1.15, maxWidth: "800px", letterSpacing: "-0.02em" }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={13} />
              <span>{readTime} min read</span>
            </div>
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Body */}
            <div className="lg:col-span-2">
              <div ref={ref1} className="fade-in-up">
                {/* Author block */}
                <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: "1px solid #e8ecf0" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: "#0080ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 700 }}>DD</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>Discount Drain</div>
                    <div style={{ fontSize: "12px", color: "#8c9baa" }}>London's Drain & Sewer Specialists Since 1970</div>
                  </div>
                  {post.publishedAt && (
                    <div style={{ marginLeft: "auto", fontSize: "12px", color: "#aab4be" }}>
                      {new Date(post.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  )}
                </div>

                {post.excerpt && (
                  <p style={{ fontSize: "18px", color: "#555555", lineHeight: "30px", marginBottom: "32px", fontWeight: 500, borderLeft: "4px solid #0080ff", paddingLeft: "20px" }}>
                    {post.excerpt}
                  </p>
                )}
                <div
                  className="blog-content prose-blog"
                  style={{ color: "#333333", lineHeight: "30px", fontSize: "16px" }}
                  dangerouslySetInnerHTML={{ __html: marked.parse(post.content ?? "", { async: false }) as string }}
                />
              </div>

              {/* CTA in article */}
              <div className="mt-12 rounded-3xl p-8" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "10px" }}>
                  Need Help With Your Drains?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: "24px", marginBottom: "20px" }}>
                  Call Discount Drain today. Free sewer camera inspection included. Available 24/7 for emergencies.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:5194518342" className="btn-white text-sm" style={{ padding: "12px 24px" }}>
                    <Phone size={14} />
                    Call 519-451-8342
                  </a>
                  <Link href="/quote" className="btn-outline text-sm" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "12px 24px" }}>
                    Get a Free Quote
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Quick CTA */}
              <div className="service-card-v2">
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "14px" }}>Get Expert Help</h4>
                <p style={{ color: "#8c9baa", fontSize: "13px", lineHeight: "22px", marginBottom: "16px" }}>
                  Have a drain or sewer problem? We offer free camera inspections and honest assessments.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="tel:5194518342" className="btn-primary justify-center text-sm" style={{ padding: "12px 20px" }}>
                    <Phone size={13} />
                    519-451-8342
                  </a>
                  <Link href="/quote" className="btn-secondary justify-center text-sm" style={{ padding: "12px 20px" }}>
                    Free Quote
                  </Link>
                </div>
              </div>

              {/* Why Us */}
              <div className="service-card-v2">
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "14px" }}>Why Discount Drain</h4>
                {[
                  "Family-owned since 1970",
                  "Free sewer camera inspection",
                  "WSIB compliant and fully insured",
                  "24/7 emergency service",
                  "BBB Accredited Business",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={13} style={{ color: "#0080ff", flexShrink: 0 }} />
                    <span style={{ color: "#555555", fontSize: "13px" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Back to Blog */}
              <Link href="/blog">
                <div className="service-card-v2 cursor-pointer flex items-center gap-2" style={{ color: "#0080ff", fontWeight: 600, fontSize: "14px" }}>
                  <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
                  Back to All Articles
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="container">
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#111111", marginBottom: "28px" }}>
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <article className="service-card-v2 cursor-pointer h-full flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                    {p.imageUrl && (
                      <div
                        style={{
                          height: "160px",
                          backgroundImage: `url(${p.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                    <div style={{ padding: "20px" }} className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {p.category && (
                          <span style={{ color: "#0080ff", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {CATEGORY_LABELS[p.category] ?? p.category}
                          </span>
                        )}
                        <div className="flex items-center gap-1" style={{ color: "#aab4be" }}>
                          <Clock size={10} />
                          <span style={{ fontSize: "10px" }}>{estimateReadTime(p.content)} min</span>
                        </div>
                      </div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", marginBottom: "8px", lineHeight: "1.4" }}>
                        {p.title}
                      </h3>
                      <p style={{ color: "#8c9baa", fontSize: "13px", lineHeight: "21px", flex: 1 }}>
                        {p.excerpt}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: "#0080ff" }}>
                        Read More <ArrowRight size={12} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </DDLayout>
  );
}
