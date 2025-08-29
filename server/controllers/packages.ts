import { Package, PriceRule } from '../models/Package';
import { AuthRequest } from '../middleware/auth';

export const listPackages = async (_req: Request, res: Response) => {
  const packages = await Package.find({ isActive: true });
  res.json(packages);
};

export const createPackage = async (req: AuthRequest, res: Response) => {
  const pkg = new Package(req.body);
  await pkg.save();
  res.status(201).json(pkg);
};

export const updatePackage = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const pkg = await Package.findByIdAndUpdate(id, req.body, { new: true });
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
};

export const deletePackage = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await Package.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};

export const listPriceRules = async (_req: Request, res: Response) => {
  const rules = await PriceRule.find();
  res.json(rules);
};

export const createPriceRule = async (req: AuthRequest, res: Response) => {
  const rule = new PriceRule(req.body);
  await rule.save();
  res.status(201).json(rule);
};

export const updatePriceRule = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const rule = await PriceRule.findByIdAndUpdate(id, req.body, { new: true });
  if (!rule) return res.status(404).json({ message: 'Rule not found' });
  res.json(rule);
};

export const deletePriceRule = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await PriceRule.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
