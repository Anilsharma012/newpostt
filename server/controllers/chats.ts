import { ChatThread, ChatMessage } from '../models/Chat';
import { AuthRequest } from '../middleware/auth';

export const openChat = async (req: AuthRequest, res: Response) => {
  const { listingId, sellerId } = req.body;
  const buyerId = req.user._id;
  let thread = await ChatThread.findOne({ listingId, buyerId, sellerId });
  if (!thread) {
    thread = new ChatThread({ listingId, buyerId, sellerId });
    await thread.save();
  }
  res.status(201).json(thread);
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const messages = await ChatMessage.find({ threadId: id }).sort({ createdAt: 1 });
  res.json(messages);
};
