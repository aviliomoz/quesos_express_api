import { ErrorResponse } from "../types";

export class AuthError extends Error {}
export class TokenError extends Error {}
export class DuplicateError extends Error {}
export class RequestError extends Error {}
export class NotFoundError extends Error {}

export const getErrorResponse = (error: unknown): ErrorResponse => {
  let response: ErrorResponse = {
    status: 500,
    code: "UNIDENTIFIED_ERROR",
    details: "Ha ocurrido un error inesperado",
  };

  if (error instanceof TokenError) {
    response = {
      status: 498,
      code: "TOKEN_ERROR",
      details: error.message,
    };
  }

  if (error instanceof AuthError) {
    response = {
      status: 401,
      code: "AUTH_ERROR",
      details: error.message,
    };
  }

  if (error instanceof DuplicateError) {
    response = {
      status: 409,
      code: "DUPLICATE_ERROR",
      details: error.message,
    };
  }

  if (error instanceof RequestError) {
    response = {
      status: 400,
      code: "BAD_REQUEST_ERROR",
      details: error.message,
    };
  }

  if (error instanceof NotFoundError) {
    response = {
      status: 404,
      code: "NOT_FOUND_ERROR",
      details: error.message,
    };
  }

  if (error instanceof Error) {
    response = {
      status: 500,
      code: "SERVER_ERROR",
      details: error.message,
    };
  }

  return response;
};
