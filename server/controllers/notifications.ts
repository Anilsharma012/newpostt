import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Notification } from '../models/Other';

export const listNotifications = async (req: AuthRequest, res: Response) => {
  const items = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(items);
};

export const markRead = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const updated = await Notification.findOneAndUpdate({ _id: id, userId: req.user._id }, { isRead: true }, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

export const createNotification = async (req: AuthRequest, res: Response) => {
  const { userId, title, message } = req.body as { userId: string; title: string; message: string };
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  const created = await Notification.create({ userId, title, message });
  res.status(201).json(created);
};
