import { NextFunction, Request, Response } from "express";
import { CategoryType } from "../types";
import { RequestError, handleErrorResponse } from "../utils/errors";

export const validateCategoryType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type: CategoryType = req.body.type;

  try {
    if (!type) throw new RequestError("Category type not provided");

    next();
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
