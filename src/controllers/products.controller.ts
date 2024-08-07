import { Request, Response } from "express";
import { NewProduct } from "../models/products.model";
import { DuplicateError, NotFoundError } from "../utils/errors";
import {
  createProductHelper,
  getProductByNameHelper,
  getProductByIdHelper,
  getProductsHelper,
  updateProductHelper,
  getProductsCountHelper,
  getStockHelper,
} from "../helpers/products.helper";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { validateStatus } from "../utils/validations";
import { Kardex } from "../types";
import { getMovementDetailsByProductIdHelper } from "../helpers/movements.helper";

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

export const getStock = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const stock = await getStockHelper(id);

    return sendSuccessResponse(res, 200, "Stock", { stock });
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al obtener el stock del producto"
    );
  }
};

export const getKardex = async (req: Request, res: Response) => {
  const { id } = req.params;
  let kardex: Kardex = [];

  try {
    const product = await getProductByIdHelper(id);
    const movements = await getMovementDetailsByProductIdHelper(id);

    movements.forEach((movement) => {
      kardex.push({
        id: movement.id,
        date: new Date(movement.date),
        type: movement.type,
        product: movement.product,
        description: movement.description || "",
        status: movement.status,
        entry: movement.type === "entry" ? movement.amount : 0,
        output: movement.type === "output" ? movement.amount : 0,
        balance: 0,
      });
    });

    kardex = kardex.sort((a, b) => a.date.getTime() - b.date.getTime());

    let balance = product.initialStock;

    kardex = kardex
      .filter((record) => record.status === "active")
      .map((record) => {
        if (record.status === "active") {
          if (record.type === "entry") {
            balance += record.entry;
          } else if (record.type === "output") {
            balance -= record.output;
          }
        }

        return { ...record, balance };
      });

    return sendSuccessResponse(res, 200, "Kardex", kardex);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar el kardex");
  }
};
