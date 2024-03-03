import { Response } from "express";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class TokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const handleErrorResponse = (error: unknown, res: Response) => {
  if (error instanceof TokenError)
    return res
      .status(498)
      .json({ message: "Token error", error: error.message });

  if (error instanceof AuthError)
    return res
      .status(401)
      .json({ message: "Auth error", error: error.message });

  if (error instanceof Error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });

  return res.status(500).json({ message: "Unidentified server error", error });
};
