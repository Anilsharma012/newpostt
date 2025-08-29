import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  price: { type: Number, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationCity' },
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationArea' },
  status: { type: String, enum: ['paid', 'pending'], default: 'paid' },
  createdAt: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

const analyticsSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);
export const Report = mongoose.model('Report', reportSchema);
export const Analytics = mongoose.model('Analytics', analyticsSchema);
