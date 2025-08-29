import { Category } from '../models/Category';
import { User } from '../models/User';
import { Package } from '../models/Package';

export async function seedDatabase() {
  try {
    // Seed categories
    const categoriesData = [
      { name: 'Cars', slug: 'cars', icon: 'fas fa-car' },
      { name: 'Properties', slug: 'properties', icon: 'fas fa-building' },
      { name: 'Mobiles', slug: 'mobiles', icon: 'fas fa-mobile-alt' },
      { name: 'Jobs', slug: 'jobs', icon: 'fas fa-briefcase' },
      { name: 'Fashion', slug: 'fashion', icon: 'fas fa-tshirt' },
      { name: 'Books, Sports & Hobbies', slug: 'books-sports', icon: 'fas fa-book' },
      { name: 'Bikes', slug: 'bikes', icon: 'fas fa-motorcycle' },
      { name: 'Electronics & Appliances', slug: 'electronics', icon: 'fas fa-tv' },
      { name: 'Commercial Vehicles & Spares', slug: 'commercial', icon: 'fas fa-truck' }
    ];

    for (const categoryData of categoriesData) {
      await Category.findOneAndUpdate(
        { slug: categoryData.slug },
        categoryData,
        { upsert: true }
      );
    }

    // Seed admin user
    const adminExists = await User.findOne({ email: 'admin@posttrr.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@posttrr.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@posttrr.com / admin123');
    }

    // Seed packages
    const packagesData = [
      {
        name: 'Free',
        features: {
          featured: false,
          urgent: false,
          boostDays: 0,
          maxListings: 1
        },
        basePrice: 0
      },
      {
        name: 'Premium',
        features: {
          featured: true,
          urgent: false,
          boostDays: 3,
          maxListings: 5
        },
        basePrice: 99
      },
      {
        name: 'Featured',
        features: {
          featured: true,
          urgent: true,
          boostDays: 7,
          maxListings: 10
        },
        basePrice: 199
      }
    ];

    for (const packageData of packagesData) {
      await Package.findOneAndUpdate(
        { name: packageData.name },
        packageData,
        { upsert: true }
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed error:', error);
  }
}
