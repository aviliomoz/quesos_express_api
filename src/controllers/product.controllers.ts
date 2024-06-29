import { Request, Response } from "express";
import { NewProduct, Product } from "../models/products";
import {
  DuplicateError,
  NotFoundError,
  handleErrorResponse,
} from "../utils/errors";
import {
  createProductHelper,
  getProductByName,
  getProductById,
  getProductsHelper,
  updateProductHelper,
  toggleProductHelper,
} from "../helpers/product.helpers";
import { createMovementHelper } from "../helpers/movement.helpers";
import { CustomRequest } from "../types";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsHelper();

    return res.status(200).json({ products });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, cost }: NewProduct = req.body;

  try {
    let product = await getProductByName(name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper({ name, price, stock, cost });

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

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stock, cost }: Product = req.body;

  try {
    let product = await getProductById(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await updateProductHelper(id, {
      name,
      price,
      stock,
      cost,
    });

    return res.status(200).json({ product });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const toggleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    let product = await getProductById(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await toggleProductHelper(id);

    return res.status(200).json({ product });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
