import { Request, Response } from "express";
import {
  addPurchaseDetailsToPurchaseHelper,
  createPurchaseHelper,
  getPurchaseByIdHelper,
  getPurchaseDetailsByPurchaseIdHelper,
  getPurchasesCountHelper,
  getPurchasesHelper,
  updatePurchaseDetailsByPurchaseIdHelper,
  updatePurchaseHelper,
} from "../helpers/purchases.helper";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewPurchase, NewPurchaseDetail } from "../models/purchases.model";
import { validateStatus } from "../utils/validations";

export const getPurchases = async (req: Request, res: Response) => {
  const status = validateStatus(req.query.status) || undefined;
  const search = (req.query.search as string) || undefined;

  const page = parseInt(req.query.page as string);

  const count = await getPurchasesCountHelper({ search, status });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const products = await getPurchasesHelper({
      status,
      search,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de compras", products, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar compras");
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const purchase = await getPurchaseByIdHelper(id);

    return sendSuccessResponse(res, 200, "Compra encontrada", purchase);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener la compra");
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  const data = req.body as NewPurchase;

  try {
    const purchase = await createPurchaseHelper(data);

    return sendSuccessResponse(
      res,
      201,
      "Compra registrada exitosamente",
      purchase
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al registrar la compra");
  }
};

export const updatePurchase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewPurchase;

  try {
    const purchase = await updatePurchaseHelper(id, data);

    return sendSuccessResponse(
      res,
      200,
      "Compra modificada exitosamente",
      purchase
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar la compra");
  }
};

export const getPurchaseDetailsByPurchaseId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const details = await getPurchaseDetailsByPurchaseIdHelper(id);

    return sendSuccessResponse(res, 200, "Detalles de la compra", details);
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al obtener detalles de la compra"
    );
  }
};

export const addPurchaseDetailsToPurchase = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params; // id de la compra
  const data = req.body as NewPurchaseDetail[];

  try {
    const details = await addPurchaseDetailsToPurchaseHelper(id, data);

    return sendSuccessResponse(
      res,
      201,
      "Detalles agregados correctamente",
      details
    );
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al agregar los detalles a la compra"
    );
  }
};

export const updatePurchaseDetailsByPurchaseId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params; // id de la compra
  const data = req.body as NewPurchaseDetail[];

  try {
    const details = await updatePurchaseDetailsByPurchaseIdHelper(id, data);

    return sendSuccessResponse(
      res,
      200,
      "Detalles actualizados correctamente",
      details
    );
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al actualizar la lista de detalles"
    );
  }
};

export const getPurchaseTotal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const details = await getPurchaseDetailsByPurchaseIdHelper(id);

    const total = details.reduce(
      (total, current) =>
        total + (current.amount * current.price - current.discount),
      0
    );

    return sendSuccessResponse(res, 200, "Total de la compra", { total });
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al calcular el total de la compra"
    );
  }
};
