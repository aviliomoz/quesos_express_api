import { Request, Response } from "express";
import { validateStatus } from "../utils/validations";
import {
  createMovementHelper,
  getMovementByIdHelper,
  getMovementsCountHelper,
  getMovementsHelper,
  updateMovementHelper,
} from "../helpers/movement.helpers";
import { parseISO } from "date-fns";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewMovement } from "../models/movements";

export const getMovements = async (req: Request, res: Response) => {
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

  const count = await getMovementsCountHelper({
    status,
    initial_date,
    final_date,
  });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const movements = await getMovementsHelper({
      status,
      initial_date,
      final_date,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de movimientos", movements, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener los movimientos");
  }
};

export const getMovementById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movement = await getMovementByIdHelper(id);

    return sendSuccessResponse(res, 200, "Movimiento encontrado", movement);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener el movimiento");
  }
};

export const createMovement = async (req: Request, res: Response) => {
  const data = req.body as NewMovement;

  try {
    const movement = await createMovementHelper(data);

    return sendSuccessResponse(
      res,
      201,
      "Movimiento registrado exitosamente",
      movement
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al registrar el movimiento");
  }
};

export const updateMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewMovement;

  try {
    const movement = await updateMovementHelper(id, data);

    return sendSuccessResponse(
      res,
      200,
      "Movimiento modificado exitosamente",
      movement
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar el movimiento");
  }
};
