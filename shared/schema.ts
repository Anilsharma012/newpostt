import { z } from "zod";

// User schemas
export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string(),
  role: z.enum(['user', 'admin']).default('user'),
  avatar: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    area: z.string().optional()
  }).optional(),
  isVerified: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

export const insertUserSchema = userSchema.omit({ 
  _id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
});

// Category schemas
export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  icon: z.string(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date())
});

export const subcategorySchema = z.object({
  _id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  slug: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date())
});

// Location schemas
export const locationSchema = z.object({
  city: z.string(),
  state: z.string(),
  area: z.string().optional(),
  pincode: z.string().optional()
});

// Listing schemas
export const listingSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.string(),
  subcategoryId: z.string().optional(),
  location: locationSchema,
  images: z.array(z.string()).default([]),
  status: z.enum(['draft', 'active', 'sold', 'rejected']).default('draft'),
  isFeatured: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  views: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

export const insertListingSchema = listingSchema.omit({ 
  _id: true, 
  slug: true,
  views: true,
  createdAt: true, 
  updatedAt: true 
});

// Package schemas
export const packageSchema = z.object({
  _id: z.string(),
  name: z.string(),
  features: z.object({
    featured: z.boolean().default(false),
    urgent: z.boolean().default(false),
    boostDays: z.number().default(0),
    maxListings: z.number().default(1)
  }),
  basePrice: z.number(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date())
});

export const priceRuleSchema = z.object({
  _id: z.string(),
  scope: z.enum(['category', 'city', 'area']),
  refId: z.string(),
  packageId: z.string(),
  price: z.number(),
});

// Locations
export const locationCitySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  state: z.string(),
});

export const locationAreaSchema = z.object({
  _id: z.string(),
  cityId: z.string(),
  name: z.string(),
  slug: z.string(),
  pincode: z.string().optional(),
});

// Pages
export const pageSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Orders
export const orderSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  packageId: z.string(),
  price: z.number(),
  cityId: z.string().optional(),
  areaId: z.string().optional(),
  status: z.enum(['paid','pending']).default('paid'),
  createdAt: z.date().default(() => new Date()),
});

// Chat schemas
export const chatThreadSchema = z.object({
  _id: z.string(),
  listingId: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  lastMessageAt: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date())
});

export const chatMessageSchema = z.object({
  _id: z.string(),
  threadId: z.string(),
  senderId: z.string(),
  message: z.string(),
  isRead: z.boolean().default(false),
  createdAt: z.date().default(() => new Date())
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;

export type Category = z.infer<typeof categorySchema>;
export type Subcategory = z.infer<typeof subcategorySchema>;
export type Location = z.infer<typeof locationSchema>;

export type Listing = z.infer<typeof listingSchema>;
export type InsertListing = z.infer<typeof insertListingSchema>;

export type Package = z.infer<typeof packageSchema>;
export type PriceRule = z.infer<typeof priceRuleSchema>;
export type LocationCity = z.infer<typeof locationCitySchema>;
export type LocationArea = z.infer<typeof locationAreaSchema>;
export type Page = z.infer<typeof pageSchema>;
export type Order = z.infer<typeof orderSchema>;
export type ChatThread = z.infer<typeof chatThreadSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
