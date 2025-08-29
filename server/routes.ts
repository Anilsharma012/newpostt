import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './utils/database';
import { seedDatabase } from './utils/seedData';

// Controllers
import { register, login, logout, getProfile, updateProfile } from './controllers/auth';
import { 
  getListings, 
  getListing, 
  createListing, 
  updateListing, 
  deleteListing,
  getFeaturedListings
} from './controllers/listings';
import { getCategories, getSubcategories, createCategory, updateCategory, deleteCategory, createSubcategory, updateSubcategory, deleteSubcategory } from './controllers/categories';
import { getDashboardStats, updateListingStatus } from './controllers/admin';
import { dbHealth } from './controllers/health';
import { listPackages, createPackage, updatePackage, deletePackage, listPriceRules, createPriceRule, updatePriceRule, deletePriceRule } from './controllers/packages';
import { getCities, getAreas } from './controllers/locations';
import { listPages, getPageBySlug, createPage, updatePage, deletePage } from './controllers/pages';
import { openChat, getMessages, listThreads, sendMessage } from './controllers/chats';
import { checkout, webhook } from './controllers/orders';
import { listUsers, updateUser } from './controllers/adminUsers';
import { listBanners, createBanner, updateBanner, deleteBanner } from './controllers/banners';
import { listNotifications, markRead, createNotification } from './controllers/notifications';

// Middleware
import { authenticate, requireAdmin } from './middleware/auth';

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to database
  await connectToDatabase();
  await seedDatabase();

  // Middleware
  app.use(cookieParser());

  // Health
  app.get('/health/db', dbHealth);

  // Auth routes
  app.post('/api/auth/register', register);
  app.post('/api/auth/login', login);
  app.post('/api/auth/logout', logout);
  app.get('/api/auth/profile', authenticate, getProfile);
  app.put('/api/auth/profile', authenticate, updateProfile);
  app.get('/api/auth/me', authenticate, getProfile);

  // Public routes
  app.get('/api/categories', getCategories);
  app.get('/api/categories/:categoryId/subcategories', getSubcategories);
  app.get('/api/subcategories', getSubcategories);
  app.get('/api/listings', getListings);
  app.get('/api/listings/featured', getFeaturedListings);
  app.get('/api/listings/:id', getListing);
  app.get('/api/packages', listPackages);
  app.get('/api/pricing/rules', listPriceRules);
  app.get('/api/locations/cities', getCities);
  app.get('/api/locations/areas', getAreas);
  app.get('/api/pages', listPages);
  app.get('/api/pages/:slug', getPageBySlug);

  // Protected routes
  app.post('/api/listings', authenticate, createListing);
  app.put('/api/listings/:id', authenticate, updateListing);
  app.delete('/api/listings/:id', authenticate, deleteListing);
  app.post('/api/chats/open', authenticate, openChat);
  app.get('/api/chats', authenticate, listThreads);
  app.get('/api/chats/:id/messages', authenticate, getMessages);
  app.post('/api/chats/:id/messages', authenticate, sendMessage);
  app.post('/api/orders/checkout', authenticate, checkout);
  app.post('/api/orders/webhook', webhook);
  // Notifications
  app.get('/api/notifications', authenticate, listNotifications);
  app.post('/api/notifications/:id/read', authenticate, markRead);
  app.post('/api/admin/notifications', authenticate, requireAdmin, createNotification);

  // Admin routes
  app.get('/api/admin/dashboard', authenticate, requireAdmin, getDashboardStats);
  app.get('/api/admin/users', authenticate, requireAdmin, listUsers);
  app.put('/api/admin/users/:id', authenticate, requireAdmin, updateUser);
  app.put('/api/admin/listings/:id', authenticate, requireAdmin, updateListingStatus);
  app.post('/api/admin/packages', authenticate, requireAdmin, createPackage);
  app.put('/api/admin/packages/:id', authenticate, requireAdmin, updatePackage);
  app.delete('/api/admin/packages/:id', authenticate, requireAdmin, deletePackage);
  app.post('/api/admin/pricing/rules', authenticate, requireAdmin, createPriceRule);
  app.put('/api/admin/pricing/rules/:id', authenticate, requireAdmin, updatePriceRule);
  app.delete('/api/admin/pricing/rules/:id', authenticate, requireAdmin, deletePriceRule);
  app.post('/api/admin/pages', authenticate, requireAdmin, createPage);
  app.put('/api/admin/pages/:id', authenticate, requireAdmin, updatePage);
  app.delete('/api/admin/pages/:id', authenticate, requireAdmin, deletePage);
  app.get('/api/admin/banners', authenticate, requireAdmin, listBanners);
  app.post('/api/admin/banners', authenticate, requireAdmin, createBanner);
  app.put('/api/admin/banners/:id', authenticate, requireAdmin, updateBanner);
  app.delete('/api/admin/banners/:id', authenticate, requireAdmin, deleteBanner);
  app.post('/api/admin/listings/moderate', authenticate, requireAdmin, updateListingStatus);
  // Admin categories
  app.post('/api/admin/categories', authenticate, requireAdmin, createCategory);
  app.put('/api/admin/categories/:id', authenticate, requireAdmin, updateCategory);
  app.delete('/api/admin/categories/:id', authenticate, requireAdmin, deleteCategory);
  app.post('/api/admin/subcategories', authenticate, requireAdmin, createSubcategory);
  app.put('/api/admin/subcategories/:id', authenticate, requireAdmin, updateSubcategory);
  app.delete('/api/admin/subcategories/:id', authenticate, requireAdmin, deleteSubcategory);

  const httpServer = createServer(app);
  return httpServer;
}
