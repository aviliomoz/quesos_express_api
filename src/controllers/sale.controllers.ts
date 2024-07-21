import { Request, Response } from "express";
import { validateStatus } from "../utils/validations";
import {
  createSaleHelper,
  getSaleByIdHelper,
  getSalesCountHelper,
  getSalesHelper,
} from "../helpers/sale.helpers";
import { parseISO } from "date-fns";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewSale } from "../models/sales";

export const getSales = async (req: Request, res: Response) => {
  const status = validateStatus(req.query.status) || undefined;
  
  const initial_date = req.query.initial_date
    ? parseISO(req.query.initial_date as string)
    : undefined;
  const final_date = req.query.final_date
    ? parseISO(req.query.final_date as string)
    : undefined;

  const page = req.query.page
    ? parseInt(req.query.page as string, 10)
    : undefined;

  const count = await getSalesCountHelper({ status, initial_date, final_date });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const sales = await getSalesHelper({
      status,
      initial_date,
      final_date,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de ventas", sales, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener las ventas");
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
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar la venta");
  }
};
