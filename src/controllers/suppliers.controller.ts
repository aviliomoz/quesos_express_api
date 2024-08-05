import { Request, Response } from "express";
import {
  createSupplierHelper,
  getSupplierByIdHelper,
  getSupplierByNameHelper,
  getSuppliersCountHelper,
  getSuppliersHelper,
  updateSupplierHelper,
} from "../helpers/suppliers.helper";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewSupplier } from "../models/suppliers.model";
import { DuplicateError, NotFoundError } from "../utils/errors";
import { validateStatus } from "../utils/validations";

export const getSuppliers = async (req: Request, res: Response) => {
  const status = validateStatus(req.query.status) || undefined;
  const search = (req.query.search as string) || undefined;

  const page = parseInt(req.query.page as string);

  const count = await getSuppliersCountHelper({ search });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const suppliers = await getSuppliersHelper({
      status,
      search,
      limit,
      offset,
    });

    return sendSuccessResponse(res, 200, "Listado de proveedores", suppliers, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener los proveedores");
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supplier = await getSupplierByIdHelper(id);

    return sendSuccessResponse(res, 200, "Proveedor encontrado", supplier);
  } catch (error) {
    sendErrorResponse(res, error, "Error al obtener el proveedor");
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  const data = req.body as NewSupplier;

  try {
    let supplier = await getSupplierByNameHelper(data.name);

    if (supplier)
      throw new DuplicateError(
        "Ya existe un proveedor con el nombre ingresado"
      );

    supplier = await createSupplierHelper(data);

    return sendSuccessResponse(
      res,
      201,
      "Se ha creado el proveedor exitosamente",
      supplier
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al crear el proveedor");
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewSupplier;

  try {
    let supplier = await getSupplierByIdHelper(id);

    if (!supplier) throw new NotFoundError("No se pudo encontrar el proveedor");

    supplier = await updateSupplierHelper(id, data);

    return sendSuccessResponse(
      res,
      200,
      "Proveedor modificado exitosamente",
      supplier
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar el proveedor");
  }
};
