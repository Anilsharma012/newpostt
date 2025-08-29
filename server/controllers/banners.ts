import { Banner } from '../models/Banner';
import { AuthRequest } from '../middleware/auth';

export const listBanners = async (_req: Request, res: Response) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
};

export const createBanner = async (req: AuthRequest, res: Response) => {
  const banner = new Banner(req.body);
  await banner.save();
  res.status(201).json(banner);
};

export const updateBanner = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const banner = await Banner.findByIdAndUpdate(id, req.body, { new: true });
  if (!banner) return res.status(404).json({ message: 'Banner not found' });
  res.json(banner);
};

export const deleteBanner = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await Banner.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
