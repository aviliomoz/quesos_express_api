import { Request, Response } from "express";
import {
  createCustomerHelper,
  getCustomerByIdHelper,
  getCustomerByNameHelper,
  getCustomersCountHelper,
  getCustomersHelper,
  updateCustomerHelper,
} from "../helpers/customer.helpers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";
import { NewCustomer } from "../models/customers";
import { DuplicateError, NotFoundError } from "../utils/errors";

export const getCustomers = async (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  const page = parseInt(req.query.page as string);

  const count = await getCustomersCountHelper({ search });

  const limit = page ? 10 : parseInt(req.query.limit as string) || count;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const customers = await getCustomersHelper(search, limit, offset);

    return sendSuccessResponse(res, 200, "Listado de clientes", customers, {
      count,
      pages: Math.ceil(count / limit) || 0,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al obtener los clientes");
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  const data = req.body as NewCustomer;

  try {
    let customer = await getCustomerByNameHelper(data.name);

    if (customer)
      throw new DuplicateError("Ya existe un cliente con el nombre ingresado");

    customer = await createCustomerHelper(data);

    return sendSuccessResponse(
      res,
      201,
      "Se ha creado el cliente exitosamente",
      customer
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al crear el cliente");
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as NewCustomer;

  try {
    let customer = await getCustomerByIdHelper(id);

    if (!customer) throw new NotFoundError("No se pudo encontrar el cliente");

    customer = await updateCustomerHelper(id, data);

    return sendSuccessResponse(
      res,
      200,
      "Cliente modificado exitosamente",
      customer
    );
  } catch (error) {
    return sendErrorResponse(res, error, "Error al modificar el cliente");
  }
};
