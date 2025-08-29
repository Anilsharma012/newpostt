import { User } from '../models/User';

export const listUsers = async (req: Request, res: Response) => {
  const { search = '', role = '', verified = '', page = '1', limit = '20' } = req.query as Record<string,string>;
  const filter: any = {};
  if (role && role !== 'all') filter.role = role;
  if (verified && verified !== 'all') filter.isVerified = verified === 'true';
  if (search) filter.$or = [
    { name: new RegExp(search, 'i') },
    { email: new RegExp(search, 'i') }
  ];
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;
  const skip = (pageNum - 1) * limitNum;

  const users = await User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum);
  const total = await User.countDocuments(filter);
  res.json({ users, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total/limitNum) } });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const allowed: any = {};
  if ('role' in req.body) allowed.role = req.body.role;
  if ('isVerified' in req.body) allowed.isVerified = req.body.isVerified;
  const user = await User.findByIdAndUpdate(id, allowed, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};
