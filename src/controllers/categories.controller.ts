import { Request, Response } from "express";
import { CategoryType, IRequest } from "../types";
import { DuplicateError, handleErrorResponse } from "../utils/errors";
import {
  createCategoryHelper,
  getCategoriesHelper,
  getCategoryByIdHelper,
  getCategoryByNameHelper,
  updateCategoryHelper,
} from "../helpers/categories.helpers";
import { Category } from "@prisma/client";

export const getCategories = async (req: Request, res: Response) => {
  const restaurant_id: string = (req as IRequest).restaurant_id;
  const type: CategoryType = req.body.type;

  try {
    const categories = await getCategoriesHelper(type, restaurant_id);

    return res.status(200).json(categories);
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const category = await getCategoryByIdHelper(id);

    return res.status(200).json(category);
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const restaurant_id: string = (req as IRequest).restaurant_id;
  const data: Category = req.body;

  try {
    const foundCategory = await getCategoryByNameHelper(
      data.name,
      data.type,
      restaurant_id
    );

    if (foundCategory)
      throw new DuplicateError("Category name provided is already used");

    await createCategoryHelper({ ...data, restaurant_id });

    return res.status(201).json({ message: "Category created" });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: Category = req.body;

  try {
    await updateCategoryHelper(id, data);

    return res.status(200).json({ message: "Category updated" });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
