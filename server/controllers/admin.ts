import { Request, Response } from 'express';
import { Listing } from '../models/Listing';
import { User } from '../models/User';
import { Category } from '../models/Category';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAds = await Listing.countDocuments();
    const activeAds = await Listing.countDocuments({ status: 'active' });
    const pendingAds = await Listing.countDocuments({ status: 'draft' });

    const recentAds = await Listing.find()
      .populate('userId', 'name email')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalAds,
        activeAds,
        pendingAds
      },
      recentAds
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateListingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, isFeatured, isUrgent } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { status, isFeatured, isUrgent },
      { new: true }
    ).populate('userId', 'name email');

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
