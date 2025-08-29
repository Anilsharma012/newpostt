import { Page } from '../models/Page';
import { AuthRequest } from '../middleware/auth';

export const listPages = async (_req: Request, res: Response) => {
  const pages = await Page.find({ isActive: true }).select('title slug');
  res.json(pages);
};

export const getPageBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const page = await Page.findOne({ slug, isActive: true });
  if (!page) return res.status(404).json({ message: 'Page not found' });
  res.json(page);
};

export const createPage = async (req: AuthRequest, res: Response) => {
  const page = new Page(req.body);
  await page.save();
  res.status(201).json(page);
};

export const updatePage = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const page = await Page.findByIdAndUpdate(id, req.body, { new: true });
  if (!page) return res.status(404).json({ message: 'Page not found' });
  res.json(page);
};

export const deletePage = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await Page.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
