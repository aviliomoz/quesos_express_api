import jwt from "jsonwebtoken";
import { TokenError } from "../utils/errors";
import { Token, TokenVerification } from "../types";
import { User, UserResponse } from "../models/users";

const token_expiration = 60 * 60 * 24 * 4;

export const createToken = (user: User | UserResponse) => {
  const token_secret = process.env.TOKEN_SECRET;

  if (!token_secret) throw new TokenError("Secret key not provided");

  return jwt.sign(
    { user: { id: user.id, name: user.name, email: user.email } },
    token_secret,
    {
      expiresIn: token_expiration,
    }
  );
};

export const verifyToken = (token: string): TokenVerification => {
  const token_secret = process.env.TOKEN_SECRET;

  if (!token_secret)
    return {
      error: "Secret key not provided",
      token: undefined,
    };

  const decoded_token = jwt.verify(token, token_secret);

  if (!decoded_token)
    return {
      error: "Invalid or expired token",
      token: undefined,
    };

  return {
    error: undefined,
    token: decoded_token as Token,
  };
};
