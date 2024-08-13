import { Request, Response } from "express";
import {
  createMovementHelper,
  getMovementByIdHelper,
  updateMovementHelper,
} from "../helpers/movements.helper";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewMovement } from "../models/movements.model";

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
