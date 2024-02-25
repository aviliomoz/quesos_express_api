import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { buildProductRecipe } from "../utils/recipes";
import { ProductWithRecipe } from "../types";

export const getProducts = async (req: Request, res: Response) => {
  const restaurant_id = "a3b40133-d377-43ec-9bc7-90209aff3418";
  const results = await prisma.product.findMany({
    where: {
      restaurant_id,
    },
  });

  let products: ProductWithRecipe[] = [];

  for await (const product of results) {
    const recipe = await buildProductRecipe(product.id);
    const full_product = { ...product, recipe };

    products.push(full_product);
  }

  return res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const product = await prisma.product.findFirst({
    where: { id: product_id },
  });

  if (product) {
    const recipe = await buildProductRecipe(product.id);
    res.json({ ...product, recipe });
  }
};
