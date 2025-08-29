import { LocationCity, LocationArea } from '../models/Location';

export const getCities = async (_req: Request, res: Response) => {
  const cities = await LocationCity.find().select('name slug state');
  res.json(cities);
};

export const getAreas = async (req: Request, res: Response) => {
  const { cityId } = req.query as { cityId?: string };
  const filter = cityId ? { cityId } : {};
  const areas = await LocationArea.find(filter).select('name slug cityId pincode');
  res.json(areas);
};
