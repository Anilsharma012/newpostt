import { Request, Response } from 'express';
import { Category, Subcategory } from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId || (req.query.categoryId as string) || '';
    const filter: any = { isActive: true };
    if (categoryId) filter.categoryId = categoryId;
    const subcategories = await Subcategory.find(filter);
    res.json(subcategories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
