import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Admin content model for editable website content
export const adminContent = pgTable("admin_content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(), // e.g., 'hero', 'howToBuy', 'community', etc.
  content: jsonb("content").notNull(), // Stores editable content as JSON
  lastUpdated: text("last_updated").notNull(), // timestamp as ISO string
});

export const insertAdminContentSchema = createInsertSchema(adminContent).pick({
  section: true,
  content: true,
  lastUpdated: true,
});

export type InsertAdminContent = z.infer<typeof insertAdminContentSchema>;
export type AdminContent = typeof adminContent.$inferSelect;

// Admin settings for the password
export const adminSettings = pgTable("admin_settings", {
  id: serial("id").primaryKey(),
  adminPassword: text("admin_password").notNull(),
});

export const insertAdminSettingsSchema = createInsertSchema(adminSettings).pick({
  adminPassword: true,
});

export type InsertAdminSettings = z.infer<typeof insertAdminSettingsSchema>;
export type AdminSettings = typeof adminSettings.$inferSelect;
