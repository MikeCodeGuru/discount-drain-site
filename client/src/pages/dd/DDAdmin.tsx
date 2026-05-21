import { useState } from "react";
import { Link } from "wouter";
import { LogOut, Settings, FileText, Users, MessageSquare, Star, Wrench, BarChart3, Eye, Trash2, Plus, Mail, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663530669561/Bh4z4tJQ2oLgzVrvga4zYT/discount-drain-logo-transparent_1747866218.png";

type AdminTab = "dashboard" | "submissions" | "quotes" | "testimonials" | "blog" | "services" | "team";

export default function DDAdmin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem("dd_admin_auth") === "true";
  });
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const verifyAdmin = trpc.admin.login.useMutation({
    onSuccess: (data: { success: boolean }) => {
      if (data.success) {
        sessionStorage.setItem("dd_admin_auth", "true");
        setAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError("Incorrect password. Please try again.");
      }
    },
    onError: () => {
      setAuthError("Incorrect password. Please try again.");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAdmin.mutate({ password });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dd_admin_auth");
    setAuthenticated(false);
    setPassword("");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Discount Drain" style={{ height: "64px", margin: "0 auto 16px" }} />
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#111111" }}>Admin Panel</h1>
            <p style={{ color: "#8c9baa", fontSize: "14px", marginTop: "4px" }}>Enter your password to continue</p>
          </div>
          <div className="service-card-v2" style={{ padding: "32px" }}>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#111111", display: "block", marginBottom: "6px" }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dd-input"
                  required
                  autoFocus
                />
              </div>
              {authError && (
                <p style={{ color: "#e53e3e", fontSize: "13px" }}>{authError}</p>
              )}
              <button
                type="submit"
                className="btn-primary justify-center"
                disabled={verifyAdmin.isPending}
                style={{ padding: "14px 24px" }}
              >
                {verifyAdmin.isPending ? "Verifying..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="text-center mt-6">
            <Link href="/" style={{ color: "#8c9baa", fontSize: "13px", textDecoration: "none" }}>
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f7fa" }}>
      {/* Admin Nav */}
      <nav style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8ecf0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Discount Drain" style={{ height: "40px" }} />
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#111111" }}>Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" style={{ color: "#8c9baa", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              <Eye size={14} />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm"
              style={{ color: "#e53e3e" }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="service-card-v2" style={{ padding: "8px" }}>
              {([
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "submissions", label: "Contact Forms", icon: MessageSquare },
                { id: "quotes", label: "Quote Requests", icon: Mail },
                { id: "testimonials", label: "Testimonials", icon: Star },
                { id: "blog", label: "Blog Posts", icon: FileText },
                { id: "services", label: "Services", icon: Wrench },
                { id: "team", label: "Team Members", icon: Users },
              ] as { id: AdminTab; label: string; icon: React.ComponentType<{ size?: number }> }[]).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-medium transition-all"
                  style={{
                    backgroundColor: activeTab === id ? "#e8f3ff" : "transparent",
                    color: activeTab === id ? "#0080ff" : "#555555",
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "submissions" && <AdminSubmissions />}
            {activeTab === "quotes" && <AdminQuotes />}
            {activeTab === "testimonials" && <AdminTestimonials />}
            {activeTab === "blog" && <AdminBlog />}
            {activeTab === "services" && <AdminServices />}
            {activeTab === "team" && <AdminTeam />}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { data: submissions } = trpc.admin.submissions.contacts.useQuery();
  const { data: quotes } = trpc.admin.submissions.quotes.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const { data: posts } = trpc.blog.list.useQuery();

  const stats = [
    { label: "Contact Forms", value: submissions?.length ?? 0, icon: MessageSquare, color: "#0080ff" },
    { label: "Quote Requests", value: quotes?.length ?? 0, icon: Mail, color: "#0060d0" },
    { label: "Testimonials", value: testimonials?.length ?? 0, icon: Star, color: "#f59e0b" },
    { label: "Blog Posts", value: posts?.length ?? 0, icon: FileText, color: "#10b981" },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "24px" }}>Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="service-card-v2 text-center">
            <Icon size={24} style={{ color, margin: "0 auto 8px" }} />
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111111", lineHeight: 1 }}>{value}</div>
            <div style={{ color: "#8c9baa", fontSize: "13px", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="service-card-v2">
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111111", marginBottom: "12px" }}>Quick Links</h3>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:5194518342" className="btn-primary text-sm justify-center" style={{ padding: "12px 16px" }}>
            <Phone size={13} />
            Call 519-451-8342
          </a>
          <a href="mailto:office@discountdrain.ca" className="btn-secondary text-sm justify-center" style={{ padding: "12px 16px" }}>
            <Mail size={13} />
            Email Office
          </a>
        </div>
      </div>
    </div>
  );
}

function AdminSubmissions() {
  const { data: submissions, isLoading } = trpc.admin.submissions.contacts.useQuery();

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "24px" }}>Contact Form Submissions</h2>
      {isLoading ? (
        <div className="animate-pulse service-card-v2" style={{ height: "200px" }} />
      ) : submissions && submissions.length > 0 ? (
        <div className="flex flex-col gap-4">
          {submissions.map((s) => (
            <div key={s.id} className="service-card-v2">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: "#111111" }}>{s.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "13px" }}>{new Date(s.createdAt).toLocaleDateString("en-CA")}</div>
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${s.email}`} className="btn-secondary text-xs" style={{ padding: "6px 12px" }}>
                    <Mail size={11} />
                    Reply
                  </a>
                  {s.phone && (
                    <a href={`tel:${s.phone}`} className="btn-primary text-xs" style={{ padding: "6px 12px" }}>
                      <Phone size={11} />
                      Call
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-4 text-sm mb-3">
                <span style={{ color: "#555555" }}>{s.email}</span>
                {s.phone && <span style={{ color: "#555555" }}>{s.phone}</span>}
              </div>
              <p style={{ color: "#555555", fontSize: "14px", lineHeight: "22px", backgroundColor: "#f5f7fa", padding: "12px 16px", borderRadius: "12px" }}>
                {s.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <MessageSquare size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No contact form submissions yet.</p>
        </div>
      )}
    </div>
  );
}

function AdminQuotes() {
  const { data: quotes, isLoading } = trpc.admin.submissions.quotes.useQuery();

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "24px" }}>Quote Requests</h2>
      {isLoading ? (
        <div className="animate-pulse service-card-v2" style={{ height: "200px" }} />
      ) : quotes && quotes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {quotes.map((q) => (
            <div key={q.id} className="service-card-v2">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: "#111111" }}>{q.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "13px" }}>{new Date(q.createdAt).toLocaleDateString("en-CA")}</div>
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${q.email}`} className="btn-secondary text-xs" style={{ padding: "6px 12px" }}>
                    <Mail size={11} />
                    Reply
                  </a>
                  <a href={`tel:${q.phone}`} className="btn-primary text-xs" style={{ padding: "6px 12px" }}>
                    <Phone size={11} />
                    Call
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm mb-3">
                <span style={{ backgroundColor: "#e8f3ff", color: "#0080ff", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
                  {q.serviceType}
                </span>
                <span style={{ backgroundColor: q.preferredTime ? "#f5f7fa" : "#f5f7fa", color: "#555555", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
                  {q.preferredTime ?? "Flexible"}
                </span>
              </div>
              {q.address && <div style={{ color: "#8c9baa", fontSize: "13px", marginBottom: "8px" }}>{q.address}</div>}
              {q.description && (
                <p style={{ color: "#555555", fontSize: "14px", lineHeight: "22px", backgroundColor: "#f5f7fa", padding: "12px 16px", borderRadius: "12px" }}>
                  {q.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <Mail size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No quote requests yet.</p>
        </div>
      )}
    </div>
  );
}

function AdminTestimonials() {
  const { data: testimonials, refetch } = trpc.testimonials.list.useQuery();
  const deleteTestimonial = trpc.admin.testimonials.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("Testimonial deleted."); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111" }}>Testimonials</h2>
      </div>
      {testimonials && testimonials.length > 0 ? (
        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="service-card-v2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div style={{ fontWeight: 700, fontSize: "15px", color: "#111111", marginBottom: "2px" }}>{t.name}</div>
                  <div style={{ color: "#8c9baa", fontSize: "13px", marginBottom: "8px" }}>{t.location} · {t.rating}/5 stars</div>
                  <p style={{ color: "#555555", fontSize: "14px", lineHeight: "22px", fontStyle: "italic" }}>"{t.body}"</p>
                </div>
                <button
                  onClick={() => deleteTestimonial.mutate({ id: t.id })}
                  style={{ color: "#e53e3e", flexShrink: 0 }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <Star size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No testimonials yet.</p>
        </div>
      )}
    </div>
  );
}

function AdminBlog() {
  const { data: posts, refetch } = trpc.blog.list.useQuery();
  const deletePost = trpc.admin.blog.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("Blog post deleted."); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111" }}>Blog Posts</h2>
        <Link href="/blog" className="btn-secondary text-sm" style={{ padding: "8px 16px" }}>
          <Eye size={13} />
          View Blog
        </Link>
      </div>
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {posts.map((p) => (
            <div key={p.id} className="service-card-v2 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{p.title}</div>
                <div style={{ color: "#8c9baa", fontSize: "12px" }}>
                  {p.category} · {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-CA") : "Draft"}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/blog/${p.slug}`} style={{ color: "#0080ff" }}>
                  <Eye size={14} />
                </Link>
                <button onClick={() => deletePost.mutate({ id: p.id })} style={{ color: "#e53e3e" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <FileText size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No blog posts yet.</p>
        </div>
      )}
    </div>
  );
}

function AdminServices() {
  const { data: services } = trpc.services.list.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111" }}>Services</h2>
        <Link href="/services" className="btn-secondary text-sm" style={{ padding: "8px 16px" }}>
          <Eye size={13} />
          View Services
        </Link>
      </div>
      {services && services.length > 0 ? (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <div key={s.id} className="service-card-v2 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{s.title}</div>
                <div style={{ color: "#8c9baa", fontSize: "12px" }}>/{s.slug}</div>
              </div>
              <Link href={`/services/${s.slug}`} style={{ color: "#0080ff" }}>
                <Eye size={14} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <Wrench size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No services found.</p>
        </div>
      )}
    </div>
  );
}

function AdminTeam() {
  const { data: team } = trpc.team.list.useQuery();

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111111", marginBottom: "24px" }}>Team Members</h2>
      {team && team.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.map((m) => (
            <div key={m.id} className="service-card-v2 flex items-center gap-4">
              {m.imageUrl ? (
                <img src={m.imageUrl} alt={m.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              ) : (
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#e8f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Users size={22} style={{ color: "#0080ff" }} />
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#111111" }}>{m.name}</div>
                <div style={{ color: "#0080ff", fontSize: "13px" }}>{m.jobTitle}</div>
                {m.bio && <div style={{ color: "#8c9baa", fontSize: "12px", marginTop: "2px" }}>{m.bio.slice(0, 80)}...</div>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-card-v2 text-center py-12">
          <Users size={32} style={{ color: "#d0d8e0", margin: "0 auto 12px" }} />
          <p style={{ color: "#8c9baa" }}>No team members found.</p>
        </div>
      )}
    </div>
  );
}
