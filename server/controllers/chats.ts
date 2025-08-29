import { Response } from 'express';
import { ChatThread, ChatMessage } from '../models/Chat';
import { AuthRequest } from '../middleware/auth';

export const openChat = async (req: AuthRequest, res: Response) => {
  const { listingId, sellerId } = req.body as { listingId: string; sellerId: string };
  const buyerId = req.user._id;
  let thread = await ChatThread.findOne({ listingId, buyerId, sellerId });
  if (!thread) {
    thread = new ChatThread({ listingId, buyerId, sellerId });
    await thread.save();
  }
  res.status(201).json(thread);
};

export const listThreads = async (req: AuthRequest, res: Response) => {
  const userId = req.user._id;
  const threads = await ChatThread.find({ $or: [{ buyerId: userId }, { sellerId: userId }] })
    .sort({ lastMessageAt: -1 });
  res.json(threads);
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const messages = await ChatMessage.find({ threadId: id }).sort({ createdAt: 1 });
  res.json(messages);
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const { message } = req.body as { message: string };
  if (!message) return res.status(400).json({ message: 'message is required' });
  const msg = await ChatMessage.create({ threadId: id, senderId: req.user._id, message });
  await ChatThread.findByIdAndUpdate(id, { lastMessageAt: new Date() });
  res.status(201).json(msg);
};
