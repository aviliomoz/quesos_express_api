import { Request, Response } from "express";
import { CategoryType } from "../types";
import { DuplicateError, handleErrorResponse } from "../utils/errors";
import {
  createCategoryHelper,
  getCategoriesHelper,
  getCategoryByIdHelper,
  getCategoryByNameHelper,
} from "../helpers/categories.helpers";
import { Category } from "@prisma/client";

export const getCategories = (type: CategoryType) => {
  return async (req: Request, res: Response) => {
    const restaurant_id: string = req.params.restaurant_id;

    try {
      const categories = await getCategoriesHelper(type, restaurant_id);

      return res.status(200).json(categories);
    } catch (error) {
      return handleErrorResponse(error, res);
    }
  };
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
  const restaurant_id: string = req.params.restaurant_id;
  const { name, type }: Category = req.body;

  try {
    const foundCategory = await getCategoryByNameHelper(
      name,
      restaurant_id,
      type
    );

    if (foundCategory)
      throw new DuplicateError("Category name provided is aready used");

    await createCategoryHelper({
      name,
      type,
      restaurant_id,
    });

    return res.status(201).json({ message: "Category created" });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
