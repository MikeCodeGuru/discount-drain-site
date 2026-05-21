import { useEffect, useRef } from "react";
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

export default function DDBlog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const ref1 = useScrollReveal();

  return (
    <DDLayout>
      <title>Drain and Sewer Tips | Blog | Discount Drain London Ontario</title>
      <meta name="description" content="Expert drain and sewer advice for Ontario homeowners. Learn about drain cleaning, sewer repair, wet basements, trenchless technology, and more from Discount Drain." />

      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container">
          <div className="eyebrow mb-4">Expert Advice</div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#111111", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Drain and Sewer Tips
          </h1>
          <p style={{ color: "#8c9baa", fontSize: "18px", maxWidth: "520px", lineHeight: "30px" }}>
            Practical answers to the most common drain and sewer questions from Ontario homeowners and businesses.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div ref={ref1} className="fade-in-up container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden animate-pulse" style={{ backgroundColor: "#f5f7fa", height: "380px" }} />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/site/blog/${post.slug}`}>
                  <article className="service-card-v2 h-full flex flex-col cursor-pointer group" style={{ padding: 0, overflow: "hidden" }}>
                    {post.coverImage && (
                      <div
                        className="w-full"
                        style={{
                          height: "200px",
                          backgroundImage: `url(${post.coverImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    )}
                    <div style={{ padding: "24px" }} className="flex flex-col flex-1">
                      {post.category && (
                        <div className="flex items-center gap-1 mb-3">
                          <Tag size={11} style={{ color: "#0080ff" }} />
                          <span style={{ color: "#0080ff", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {post.category}
                          </span>
                        </div>
                      )}
                      <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "10px", lineHeight: "1.4" }}>
                        {post.title}
                      </h2>
                      <p style={{ color: "#8c9baa", fontSize: "14px", lineHeight: "22px", flex: 1, marginBottom: "16px" }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        {post.readTime && (
                          <div className="flex items-center gap-1" style={{ color: "#8c9baa", fontSize: "12px" }}>
                            <Clock size={11} />
                            <span>{post.readTime} min read</span>
                          </div>
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
          ) : (
            <div className="text-center py-20">
              <p style={{ color: "#8c9baa" }}>No articles yet. Check back soon.</p>
            </div>
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
