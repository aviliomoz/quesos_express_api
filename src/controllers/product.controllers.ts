import { Request, Response } from "express";
import { NewProduct } from "../models/products";
import { DuplicateError, NotFoundError } from "../utils/errors";
import {
  createProductHelper,
  getProductByNameHelper,
  getProductByIdHelper,
  getProductsHelper,
  updateProductHelper,
  getProductsCountHelper,
} from "../helpers/product.helpers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { validateStatus } from "../utils/validations";

export const getProducts = async (req: Request, res: Response) => {
  const status = validateStatus(req.query.status) || undefined;
  const search = (req.query.search as string) || undefined;

  const page = parseInt(req.query.page as string);

  const count = await getProductsCountHelper({ search, status });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const products = await getProductsHelper({
      status,
      search,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de productos", products, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar productos");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdHelper(id);

    return sendSuccessResponse(res, 200, "Producto encontrado", product);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar el producto");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const data = req.body as NewProduct;

  try {
    let product = await getProductByNameHelper(data.name);

    if (product)
      throw new DuplicateError("Ya existe un producto con el nombre ingresado");

    product = await createProductHelper(data);

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
  const data = req.body as NewProduct;

  try {
    let product = await getProductByIdHelper(id);

    if (!product) throw new NotFoundError("Producto no encontrado");

    product = await updateProductHelper(id, data);

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
