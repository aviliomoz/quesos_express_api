import { Request, Response } from "express";
import { NewProduct, Product } from "../models/products";
import { DuplicateError, NotFoundError } from "../utils/errors";
import {
  createProductHelper,
  getProductByNameHelper,
  getProductByIdHelper,
  getProductsHelper,
  updateProductHelper,
  toggleProductHelper,
  getProductsCountHelper,
} from "../helpers/product.helpers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";

export const getProducts = async (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  const page = parseInt(req.query.page as string);

  const count = await getProductsCountHelper({ search });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const products = await getProductsHelper({
      search,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de productos", products, {
      count,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar productos");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, initial_stock, cost }: NewProduct = req.body;

  try {
    let product = await getProductByNameHelper(name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper({ name, price, initial_stock, cost });

    return sendSuccessResponse(
      res,
      201,
      "Producto creado exitosamente",
      product
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al crear producto");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, initial_stock, cost }: NewProduct = req.body;

  try {
    let product = await getProductByIdHelper(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await updateProductHelper(id, {
      name,
      price,
      initial_stock,
      cost,
    });

    return sendSuccessResponse(
      res,
      200,
      "Producto modificado exitosamente",
      product
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar producto");
  }
};

export const toggleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    let product = await getProductByIdHelper(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await toggleProductHelper(id);

    return sendSuccessResponse(
      res,
      200,
      "Producto modificado exitosamente",
      product
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar producto");
  }
};
