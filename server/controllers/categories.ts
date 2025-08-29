import { Request, Response } from 'express';
import { Category, Subcategory } from '../models/Category';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, icon, description, isActive } = req.body as {
      name: string; icon: string; description?: string; isActive?: boolean;
    };
    if (!name || !icon) {
      return res.status(400).json({ message: 'name and icon are required' });
    }
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let i = 1;
    while (await Category.exists({ slug })) {
      slug = `${baseSlug}-${i++}`;
    }
    const category = await Category.create({ name, icon, description, isActive: isActive !== false, slug });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name, icon, description, isActive } = req.body as {
      name?: string; icon?: string; description?: string; isActive?: boolean;
    };
    const update: any = {};
    if (name) {
      update.name = name;
      update.slug = slugify(name);
      let baseSlug = update.slug;
      let slug = baseSlug;
      let i = 1;
      while (await Category.exists({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${i++}`;
      }
      update.slug = slug;
    }
    if (icon !== undefined) update.icon = icon;
    if (description !== undefined) update.description = description;
    if (isActive !== undefined) update.isActive = isActive;

    const updated = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    await Subcategory.deleteMany({ categoryId: id });
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const { categoryId, name, isActive } = req.body as { categoryId: string; name: string; isActive?: boolean };
    if (!categoryId || !name) return res.status(400).json({ message: 'categoryId and name are required' });
    const slug = slugify(name);
    const sub = await Subcategory.create({ categoryId, name, slug, isActive: isActive !== false });
    res.status(201).json(sub);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name, isActive } = req.body as { name?: string; isActive?: boolean };
    const update: any = {};
    if (name) update.name = name, update.slug = slugify(name);
    if (isActive !== undefined) update.isActive = isActive;
    const updated = await Subcategory.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deleted = await Subcategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Subcategory not found' });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
