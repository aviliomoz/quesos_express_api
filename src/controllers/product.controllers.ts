import { Request, Response } from "express";
import { NewProduct } from "../models/products";
import { DuplicateError, handleErrorResponse } from "../utils/errors";
import {
  createProductHelper,
  getProductByName,
  getProductsHelper,
} from "../helpers/product.helpers";
import { createMovementHelper } from "../helpers/stock.helpers";
import { CustomRequest } from "../types";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsHelper();

    return res.status(200).json(products);
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, image }: NewProduct = req.body;

  try {
    let product = await getProductByName(name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper({ name, price, stock, image });

    const entry = await createMovementHelper({
      type: "entry",
      user_id: (req as CustomRequest).user.id,
      product_id: product.id,
      amount: product.stock,
      date: new Date(),
      description: "Entrada por apertura de stock",
      stock: product.stock,
    });

    return res.status(201).json({ product, entry });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
