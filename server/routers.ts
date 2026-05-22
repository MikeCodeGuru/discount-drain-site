import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { notifyOwner } from "./_core/notification";
import {
  getAllServices, getFeaturedServices, getServiceBySlug, upsertService, deleteService,
  getPublishedTestimonials, getAllTestimonials, upsertTestimonial, deleteTestimonial,
  getPublishedTeamMembers, getAllTeamMembers, upsertTeamMember, deleteTeamMember,
  getPublishedBlogPosts, getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts, upsertBlogPost, deleteBlogPost,
  createContactSubmission, getAllContactSubmissions, markContactRead,
  createQuoteSubmission, getAllQuoteSubmissions, markQuoteRead,
  createAdminSession, getAdminSession, deleteAdminSession,
} from "./db";

// ─── ADMIN PASSWORD ───────────────────────────────────────────────────────────
// The admin password is stored as an env var: ADMIN_PASSWORD
// If not set, defaults to a placeholder that must be changed before production.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "DiscountDrain2024!";
const ADMIN_COOKIE = "dd_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper to check admin session from cookie
async function getAdminFromCookie(req: { headers: Record<string, string | string[] | undefined> }) {
  const cookieHeader = req.headers["cookie"] as string | undefined;
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/dd_admin_session=([^;]+)/);
  if (!match) return null;
  const token = match[1];
  const session = await getAdminSession(token);
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await deleteAdminSession(token);
    return null;
  }
  return session;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── PUBLIC: SERVICES ───────────────────────────────────────────────────────
  services: router({
    list: publicProcedure.query(() => getAllServices()),
    featured: publicProcedure.query(() => getFeaturedServices()),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getServiceBySlug(input.slug)),
  }),

  // ─── PUBLIC: TESTIMONIALS ───────────────────────────────────────────────────
  testimonials: router({
    list: publicProcedure.query(() => getPublishedTestimonials()),
  }),

  // ─── PUBLIC: TEAM ───────────────────────────────────────────────────────────
  team: router({
    list: publicProcedure.query(() => getPublishedTeamMembers()),
  }),

  // ─── PUBLIC: BLOG ───────────────────────────────────────────────────────────
  blog: router({
    list: publicProcedure.query(() => getPublishedBlogPosts()),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getBlogPostBySlug(input.slug)),
    related: publicProcedure
      .input(z.object({ slug: z.string(), category: z.string().optional() }))
      .query(({ input }) => getRelatedBlogPosts(input.slug, input.category)),
  }),

  // ─── PUBLIC: CONTACT FORM ───────────────────────────────────────────────────
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2).max(120),
        phone: z.string().max(30).optional(),
        email: z.string().email().max(320).optional(),
        serviceType: z.string().max(100).optional(),
        message: z.string().min(10).max(2000),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission(input);
        await notifyOwner({
          title: `New Contact Form: ${input.name}`,
          content: `Phone: ${input.phone || "not provided"}\nEmail: ${input.email || "not provided"}\nService: ${input.serviceType || "general"}\n\n${input.message}`,
        });
        return { success: true };
      }),
  }),

  // ─── PUBLIC: QUOTE FORM ─────────────────────────────────────────────────────
  quote: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2).max(120),
        phone: z.string().min(7).max(30),
        email: z.string().email().max(320).optional(),
        address: z.string().max(300).optional(),
        serviceType: z.string().max(100).optional(),
        description: z.string().max(2000).optional(),
        preferredTime: z.string().max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        await createQuoteSubmission(input);
        await notifyOwner({
          title: `New Quote Request: ${input.name}`,
          content: `Phone: ${input.phone}\nEmail: ${input.email || "not provided"}\nAddress: ${input.address || "not provided"}\nService: ${input.serviceType || "general"}\nPreferred time: ${input.preferredTime || "any"}\n\n${input.description || "No description provided"}`,
        });
        return { success: true };
      }),
  }),

  // ─── ADMIN AUTH ─────────────────────────────────────────────────────────────
  admin: router({
    login: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (input.password !== ADMIN_PASSWORD) {
          throw new Error("Invalid password");
        }
        const token = nanoid(64);
        const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
        await createAdminSession(token, expiresAt);
        const isSecure = ctx.req.protocol === "https" || ctx.req.headers["x-forwarded-proto"] === "https";
        ctx.res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}${isSecure ? "; Secure" : ""}`);
        return { success: true };
      }),

    logout: publicProcedure.mutation(async ({ ctx }) => {
      const cookieHeader = ctx.req.headers["cookie"] as string | undefined;
      if (cookieHeader) {
        const match = cookieHeader.match(/dd_admin_session=([^;]+)/);
        if (match) await deleteAdminSession(match[1]);
      }
      ctx.res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=; Path=/; HttpOnly; Max-Age=0`);
      return { success: true };
    }),

    me: publicProcedure.query(async ({ ctx }) => {
      const session = await getAdminFromCookie(ctx.req as any);
      return { isAdmin: !!session };
    }),

    // ─── ADMIN: SERVICES ──────────────────────────────────────────────────────
    services: router({
      list: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllServices();
      }),
      save: publicProcedure
        .input(z.object({
          id: z.number().optional(),
          slug: z.string().min(1).max(100),
          title: z.string().min(1).max(200),
          shortDesc: z.string().min(1),
          longDesc: z.string().optional(),
          metaTitle: z.string().max(200).optional(),
          metaDesc: z.string().optional(),
          iconName: z.string().max(60).optional(),
          imageUrl: z.string().optional(),
          featured: z.boolean().optional(),
          sortOrder: z.number().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          return upsertService(input as any);
        }),
      delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await deleteService(input.id);
          return { success: true };
        }),
    }),

    // ─── ADMIN: TESTIMONIALS ──────────────────────────────────────────────────
    testimonials: router({
      list: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllTestimonials();
      }),
      save: publicProcedure
        .input(z.object({
          id: z.number().optional(),
          name: z.string().min(1).max(120),
          location: z.string().max(120).optional(),
          rating: z.number().min(1).max(5).optional(),
          body: z.string().min(1),
          serviceType: z.string().max(100).optional(),
          published: z.boolean().optional(),
          sortOrder: z.number().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          return upsertTestimonial(input as any);
        }),
      delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await deleteTestimonial(input.id);
          return { success: true };
        }),
    }),

    // ─── ADMIN: TEAM ──────────────────────────────────────────────────────────
    team: router({
      list: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllTeamMembers();
      }),
      save: publicProcedure
        .input(z.object({
          id: z.number().optional(),
          name: z.string().min(1).max(120),
          jobTitle: z.string().min(1).max(120),
          bio: z.string().optional(),
          imageUrl: z.string().optional(),
          sortOrder: z.number().optional(),
          published: z.boolean().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          return upsertTeamMember(input as any);
        }),
      delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await deleteTeamMember(input.id);
          return { success: true };
        }),
    }),

    // ─── ADMIN: BLOG ──────────────────────────────────────────────────────────
    blog: router({
      list: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllBlogPosts();
      }),
      save: publicProcedure
        .input(z.object({
          id: z.number().optional(),
          slug: z.string().min(1).max(200),
          title: z.string().min(1).max(300),
          excerpt: z.string().optional(),
          content: z.string().min(1),
          metaTitle: z.string().max(300).optional(),
          metaDesc: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().max(100).optional(),
          published: z.boolean().optional(),
          publishedAt: z.date().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          const data = { ...input, publishedAt: input.published && !input.publishedAt ? new Date() : input.publishedAt };
          return upsertBlogPost(data as any);
        }),
      delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await deleteBlogPost(input.id);
          return { success: true };
        }),
    }),

    // ─── ADMIN: SUBMISSIONS ───────────────────────────────────────────────────
    submissions: router({
      contacts: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllContactSubmissions();
      }),
      quotes: publicProcedure.query(async ({ ctx }) => {
        const session = await getAdminFromCookie(ctx.req as any);
        if (!session) throw new Error("Unauthorized");
        return getAllQuoteSubmissions();
      }),
      markContactRead: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await markContactRead(input.id);
          return { success: true };
        }),
      markQuoteRead: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const session = await getAdminFromCookie(ctx.req as any);
          if (!session) throw new Error("Unauthorized");
          await markQuoteRead(input.id);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
