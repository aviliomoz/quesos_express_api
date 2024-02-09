import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { buildProductRecipe } from "../functions/recipes";

export const getProducts = async (req: Request, res: Response) => {
  const restaurant_id = "a3b40133-d377-43ec-9bc7-90209aff3418";
  const products = await prisma.product.findMany({
    where: {
      restaurant_id,
    },
  });

  return res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const product = await prisma.product.findFirst({
    where: { id: product_id },
  });

  res.json(product);
};

export const getProductRecipe = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const recipe = await buildProductRecipe(product_id);

  res.json(recipe);
};
