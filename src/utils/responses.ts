import { Response } from "express";
import { getErrorInfo } from "./errors";

export const sendErrorResponse = (
  res: Response,
  error: unknown,
  message: string
) => {
  const { code, status, details } = getErrorInfo(error);

  return res.status(status).json({
    ok: false,
    message,
    error: { code, details },
    data: null,
  });
};

export const sendSuccessResponse = (
  res: Response,
  status: number,
  message: string,
  data: Record<string, any> | null,
  meta?: { count?: number; pages?: number }
) => {
  return res.status(status).json({
    ok: true,
    message,
    error: null,
    data,
    meta,
  });
};
