import { Request, Response } from "express";
import { NewProduct } from "../models/products";
import { DuplicateError, handleErrorResponse } from "../utils/errors";
import {
  createProductHelper,
  getProductByName,
} from "../helpers/product.helpers";
import { createStockEntryHelper } from "../helpers/stock.helpers";
import { CustomRequest } from "../types";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock }: NewProduct = req.body;

  try {
    let product = await getProductByName(name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper({ name, price, stock });

    const entry = await createStockEntryHelper({
      user_id: (req as CustomRequest).user.id,
      product_id: product.id,
      amount: product.stock,
      date: new Date().toISOString(),
      description: "Entrada por apertura de stock",
    });

    return res.status(201).json({ product, entry });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
