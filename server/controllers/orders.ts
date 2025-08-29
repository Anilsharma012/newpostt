import { Order } from '../models/Other';
import { AuthRequest } from '../middleware/auth';

export const checkout = async (req: AuthRequest, res: Response) => {
  const { packageId, price, cityId, areaId } = req.body;
  const order = new Order({ userId: req.user._id, packageId, price, cityId, areaId, status: 'paid' });
  await order.save();
  res.json({ status: 'paid', orderId: order._id });
};

export const webhook = async (_req: Request, res: Response) => {
  res.json({ ok: true });
};
