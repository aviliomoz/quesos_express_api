import { Request, Response } from "express";
import {
  addSaleDetailsToSaleHelper,
  createSaleHelper,
  getSaleByIdHelper,
  getSaleDetailsBySaleIdHelper,
  getSalesCountHelper,
  getSalesHelper,
  updateSaleDetailsBySaleIdHelper,
  updateSaleHelper,
} from "../helpers/sales.helper";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewSale, NewSaleDetail } from "../models/sales.model";
import { validateSaleStatus } from "../utils/validations";

export const getSales = async (req: Request, res: Response) => {
  const status = validateSaleStatus(req.query.status) || undefined;
  const search = (req.query.search as string) || undefined;

  const page = parseInt(req.query.page as string);

  const count = await getSalesCountHelper({ search, status });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const sales = await getSalesHelper({
      status,
      search,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de ventas", sales, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cargar ventas");
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sale = await getSaleByIdHelper(id);

    return sendSuccessResponse(res, 200, "Venta encontrada", sale);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener la venta");
  }
};

export const createSale = async (req: Request, res: Response) => {
  const data = req.body as NewSale;

  try {
    const sale = await createSaleHelper(data);

    return sendSuccessResponse(res, 201, "Venta registrada exitosamente", sale);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al registrar la venta");
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewSale;

  try {
    const sale = await updateSaleHelper(id, data);

    return sendSuccessResponse(res, 200, "Venta modificada exitosamente", sale);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar la venta");
  }
};

export const getSaleDetailsBySaleId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const details = await getSaleDetailsBySaleIdHelper(id);

    return sendSuccessResponse(res, 200, "Detalles de la venta", details);
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al obtener detalles de la venta"
    );
  }
};

export const addSaleDetailsToSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewSaleDetail[];

  try {
    const details = await addSaleDetailsToSaleHelper(id, data);

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
      "Error al agregar los detalles a la venta"
    );
  }
};

export const updateSaleDetailsBySaleId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body as NewSaleDetail[];

  try {
    const details = await updateSaleDetailsBySaleIdHelper(id, data);

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
      "Error al actualizar los detalles de la venta"
    );
  }
};

export const getSaleTotal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const details = await getSaleDetailsBySaleIdHelper(id);

    const total = details.reduce(
      (total, current) =>
        total + (current.amount * current.price - current.discount),
      0
    );

    return sendSuccessResponse(res, 200, "Total de la venta", { total });
  } catch (error) {
    return sendErrorResponse(
      res,
      error,
      "Error al calcular el total de la venta"
    );
  }
};
