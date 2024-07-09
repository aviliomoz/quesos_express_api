import { Request, Response } from "express";
import { NewProduct, Product } from "../models/products";
import {
  DuplicateError,
  NotFoundError,
  getErrorResponse,
} from "../utils/errors";
import {
  createProductHelper,
  getProductByName,
  getProductById,
  getProductsHelper,
  updateProductHelper,
  toggleProductHelper,
} from "../helpers/product.helpers";

export const getProducts = async (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const { products, count } = await getProductsHelper(search, limit, offset);

    return res.status(200).json({
      ok: true,
      message: "Listado de productos",
      error: null,
      data: {
        products,
      },
      meta: {
        count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al cargar productos",
      error: { code, details },
      data: null,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, initial_stock, cost }: NewProduct = req.body;

  try {
    let product = await getProductByName(name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper({ name, price, initial_stock, cost });

    return res.status(201).json({
      ok: true,
      message: "Producto creado exitosamente",
      error: null,
      data: { product },
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al crear producto",
      error: { code, details },
      data: null,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, initial_stock, cost }: Product = req.body;

  try {
    let product = await getProductById(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await updateProductHelper(id, {
      name,
      price,
      initial_stock,
      cost,
    });

    return res.status(200).json({
      ok: true,
      message: "Producto modificado exitosamente",
      error: null,
      data: { product },
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al modificar producto",
      error: { code, details },
      data: null,
    });
  }
};

export const toggleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    let product = await getProductById(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await toggleProductHelper(id);

    return res.status(200).json({
      ok: true,
      message: "Producto modificado exitosamente",
      error: null,
      data: { product },
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al modificar producto",
      error: { code, details },
      data: null,
    });
  }
};
