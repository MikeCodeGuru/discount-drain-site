import { and, desc, eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  services, InsertService,
  testimonials, InsertTestimonial,
  teamMembers, InsertTeamMember,
  blogPosts, InsertBlogPost,
  contactSubmissions, InsertContactSubmission,
  quoteSubmissions, InsertQuoteSubmission,
  adminSessions,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── USERS ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).orderBy(asc(services.sortOrder));
}

export async function getFeaturedServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).where(eq(services.featured, true)).orderBy(asc(services.sortOrder));
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result[0] ?? null;
}

export async function upsertService(data: InsertService & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(services).set(rest).where(eq(services.id, id));
    return id;
  }
  const result = await db.insert(services).values(data);
  return (result as any)[0]?.insertId as number;
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export async function getPublishedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.published, true)).orderBy(asc(testimonials.sortOrder));
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

export async function upsertTestimonial(data: InsertTestimonial & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(testimonials).set(rest).where(eq(testimonials.id, id));
    return id;
  }
  const result = await db.insert(testimonials).values(data);
  return (result as any)[0]?.insertId as number;
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ─── TEAM MEMBERS ─────────────────────────────────────────────────────────────

export async function getPublishedTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teamMembers).where(eq(teamMembers.published, true)).orderBy(asc(teamMembers.sortOrder));
}

export async function getAllTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
}

export async function upsertTeamMember(data: InsertTeamMember & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(teamMembers).set(rest).where(eq(teamMembers.id, id));
    return id;
  }
  const result = await db.insert(teamMembers).values(data);
  return (result as any)[0]?.insertId as number;
}

export async function deleteTeamMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
}

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);
  return result[0] ?? null;
}

export async function upsertBlogPost(data: InsertBlogPost & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(blogPosts).set(rest).where(eq(blogPosts.id, id));
    return id;
  }
  const result = await db.insert(blogPosts).values(data);
  return (result as any)[0]?.insertId as number;
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ─── CONTACT SUBMISSIONS ──────────────────────────────────────────────────────

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactSubmissions).values(data);
}

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function markContactRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactSubmissions).set({ read: true }).where(eq(contactSubmissions.id, id));
}

// ─── QUOTE SUBMISSIONS ────────────────────────────────────────────────────────

export async function createQuoteSubmission(data: InsertQuoteSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(quoteSubmissions).values(data);
}

export async function getAllQuoteSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quoteSubmissions).orderBy(desc(quoteSubmissions.createdAt));
}

export async function markQuoteRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(quoteSubmissions).set({ read: true }).where(eq(quoteSubmissions.id, id));
}

// ─── ADMIN SESSIONS ───────────────────────────────────────────────────────────

export async function createAdminSession(token: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(adminSessions).values({ token, expiresAt });
}

export async function getAdminSession(token: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminSessions).where(eq(adminSessions.token, token)).limit(1);
  return result[0];
}

export async function deleteAdminSession(token: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(adminSessions).where(eq(adminSessions.token, token));
}
