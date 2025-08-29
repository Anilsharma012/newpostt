import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, default: '' },
  position: { type: String, enum: ['home_top','home_middle','home_bottom','sidebar','slider'], default: 'home_top' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Banner = mongoose.model('Banner', bannerSchema);
