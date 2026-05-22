import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import DDLayout from "./DDLayout";
import { trpc } from "@/lib/trpc";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Estimate read time from content word count
function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Human-readable category labels
const CATEGORY_LABELS: Record<string, string> = {
  "sewer-repair": "Sewer Repair",
  "wet-basement": "Wet Basements",
  "drain-cleaning": "Drain Cleaning",
  "sewer-camera": "Camera Inspection",
  "trenchless": "Trenchless",
};

export default function DDBlog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  // Derive unique categories from posts
  const categories = posts
    ? ["all", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))]
    : ["all"];

  const filteredPosts = posts
    ? activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory)
    : [];

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <DDLayout>
      <title>Drain and Sewer Tips | Blog | Discount Drain London Ontario</title>
      <meta name="description" content="Expert drain and sewer advice for Ontario homeowners. Learn about drain cleaning, sewer repair, wet basements, trenchless technology, and more from Discount Drain." />

      {/* JSON-LD Blog structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Discount Drain Blog",
        "description": "Expert drain and sewer advice for London Ontario homeowners",
        "url": "https://discountdrain.ca/blog",
        "publisher": {
          "@type": "Organization",
          "name": "Discount Drain",
          "url": "https://discountdrain.ca",
        },
      })}} />

      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: "#8c9baa" }}>
            <Link href="/" style={{ color: "#0080ff", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#111111" }}>Blog</span>
          </nav>
          <div className="eyebrow mb-4">Expert Advice</div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#111111", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Drain and Sewer Tips
          </h1>
          <p style={{ color: "#8c9baa", fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Practical answers to the most common drain and sewer questions from Ontario homeowners and businesses.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {!isLoading && categories.length > 1 && (
        <section className="py-6 bg-white" style={{ borderBottom: "1px solid #f0f2f5" }}>
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: activeCategory === cat ? "#0080ff" : "#f5f7fa",
                    color: activeCategory === cat ? "#ffffff" : "#555555",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {cat === "all" ? "All Articles" : (CATEGORY_LABELS[cat] ?? cat)}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden animate-pulse" style={{ backgroundColor: "#f5f7fa", height: "380px" }} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "#8c9baa" }}>No articles in this category yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div ref={ref1} className="fade-in-up mb-12">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <article
                      className="group cursor-pointer rounded-3xl overflow-hidden"
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "380px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                    >
                      {/* Image side */}
                      {featuredPost.imageUrl && (
                        <div
                          style={{
                            backgroundImage: `url(${featuredPost.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "transform 0.4s ease",
                          }}
                          className="group-hover:scale-105"
                        />
                      )}
                      {/* Content side */}
                      <div className="flex flex-col justify-center" style={{ padding: "48px", backgroundColor: "#ffffff" }}>
                        <div className="flex items-center gap-3 mb-4">
                          {featuredPost.category && (
                            <div className="flex items-center gap-1">
                              <Tag size={11} style={{ color: "#0080ff" }} />
                              <span style={{ color: "#0080ff", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                {CATEGORY_LABELS[featuredPost.category] ?? featuredPost.category}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1" style={{ color: "#8c9baa" }}>
                            <Clock size={11} />
                            <span style={{ fontSize: "11px" }}>{estimateReadTime(featuredPost.content)} min read</span>
                          </div>
                        </div>
                        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, color: "#111111", marginBottom: "14px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                          {featuredPost.title}
                        </h2>
                        <p style={{ color: "#8c9baa", fontSize: "15px", lineHeight: "25px", marginBottom: "24px" }}>
                          {featuredPost.excerpt}
                        </p>
                        {featuredPost.publishedAt && (
                          <p style={{ color: "#aab4be", fontSize: "12px", marginBottom: "16px" }}>
                            {new Date(featuredPost.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        )}
                        <div className="flex items-center gap-1 font-semibold" style={{ color: "#0080ff" }}>
                          Read Article <ArrowRight size={14} />
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Remaining Posts Grid */}
              {remainingPosts.length > 0 && (
                <div ref={ref2} className="fade-in-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <article className="service-card-v2 h-full flex flex-col cursor-pointer group" style={{ padding: 0, overflow: "hidden" }}>
                        {post.imageUrl && (
                          <div
                            className="w-full"
                            style={{
                              height: "200px",
                              backgroundImage: `url(${post.imageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        )}
                        <div style={{ padding: "24px" }} className="flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {post.category && (
                              <div className="flex items-center gap-1">
                                <Tag size={11} style={{ color: "#0080ff" }} />
                                <span style={{ color: "#0080ff", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                  {CATEGORY_LABELS[post.category] ?? post.category}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-1" style={{ color: "#8c9baa" }}>
                              <Clock size={11} />
                              <span style={{ fontSize: "11px" }}>{estimateReadTime(post.content)} min read</span>
                            </div>
                          </div>
                          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "10px", lineHeight: "1.4" }}>
                            {post.title}
                          </h2>
                          <p style={{ color: "#8c9baa", fontSize: "14px", lineHeight: "22px", flex: 1, marginBottom: "16px" }}>
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            {post.publishedAt && (
                              <span style={{ color: "#aab4be", fontSize: "12px" }}>
                                {new Date(post.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                              </span>
                            )}
                            <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#0080ff" }}>
                              Read More <ArrowRight size={13} />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0060d0 0%, #0080ff 100%)" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#ffffff", marginBottom: "12px" }}>
            Have a Drain Problem Right Now?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "17px", maxWidth: "420px", margin: "0 auto 24px", lineHeight: "28px" }}>
            Call us. We answer 24/7 and include a free sewer camera inspection with every service call.
          </p>
          <a href="tel:5194518342" className="btn-white" style={{ fontSize: "16px", padding: "16px 32px" }}>
            Call 519-451-8342
          </a>
        </div>
      </section>
    </DDLayout>
  );
}
