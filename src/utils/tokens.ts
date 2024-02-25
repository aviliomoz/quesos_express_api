import jwt from "jsonwebtoken";

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

const access_token_expiration = 60 * 60 * 4;
const refresh_token_expiration = 60 * 60 * 24 * 7;

export class TokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

interface UID {
  uid: string;
}

export const createAccessToken = (payload: UID) => {
  if (!access_token_secret) throw new TokenError("Secret key not provided");

  return jwt.sign(payload, access_token_secret, {
    expiresIn: access_token_expiration,
  });
};

export const createRefreshToken = (payload: UID) => {
  if (!refresh_token_secret) throw new TokenError("Secret key not provided");

  return jwt.sign(payload, refresh_token_secret, {
    expiresIn: refresh_token_expiration,
  });
};

export const validateAccessToken = (token: string) => {
  if (!access_token_secret) throw new TokenError("Secret key not provided");

  return jwt.verify(token, access_token_secret, (error) => {
    if (error) throw new TokenError(error.message);
  });
};

export const validateRefreshToken = (token: string) => {
  if (!refresh_token_secret) throw new TokenError("Secret key not provided");

  return jwt.verify(token, refresh_token_secret, (error) => {
    if (error) throw new TokenError(error.message);
  });
};
