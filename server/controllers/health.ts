import { mongoose } from '../utils/database';

export const dbHealth = async (_req: Request, res: Response) => {
  try {
    const readyState = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
    const status = readyState === 1 ? 'ok' : (readyState === 2 ? 'connecting' : 'down');
    res.json({
      status,
      connected: readyState === 1,
      db: mongoose.connection.name || null,
      host: mongoose.connection.host || null,
      readyState,
    });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
};
