import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './utils/database';
import { seedDatabase } from './utils/seedData';

// Controllers
import { register, login, logout, getProfile } from './controllers/auth';
import { 
  getListings, 
  getListing, 
  createListing, 
  updateListing, 
  deleteListing,
  getFeaturedListings
} from './controllers/listings';
import { getCategories, getSubcategories } from './controllers/categories';
import { getDashboardStats, updateListingStatus } from './controllers/admin';

// Middleware
import { authenticate, requireAdmin } from './middleware/auth';

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to database
  await connectToDatabase();
  await seedDatabase();

  // Middleware
  app.use(cookieParser());

  // Auth routes
  app.post('/api/auth/register', register);
  app.post('/api/auth/login', login);
  app.post('/api/auth/logout', logout);
  app.get('/api/auth/profile', authenticate, getProfile);

  // Public routes
  app.get('/api/categories', getCategories);
  app.get('/api/categories/:categoryId/subcategories', getSubcategories);
  app.get('/api/listings', getListings);
  app.get('/api/listings/featured', getFeaturedListings);
  app.get('/api/listings/:id', getListing);

  // Protected routes
  app.post('/api/listings', authenticate, createListing);
  app.put('/api/listings/:id', authenticate, updateListing);
  app.delete('/api/listings/:id', authenticate, deleteListing);

  // Admin routes
  app.get('/api/admin/dashboard', authenticate, requireAdmin, getDashboardStats);
  app.put('/api/admin/listings/:id', authenticate, requireAdmin, updateListingStatus);

  const httpServer = createServer(app);
  return httpServer;
}
