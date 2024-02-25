import jwt, { TokenExpiredError } from "jsonwebtoken";

const token_secret = process.env.TOKEN_SECRET;
const token_expiration = 60 * 60 * 4;

export class TokenError extends Error {
  expired: boolean;

  constructor(message: string, options: { expired?: boolean } = {}) {
    super(message);
    this.expired = options.expired ?? false;
  }
}

interface UID {
  uid: string;
}

interface Token {
  uid: string;
  iat: number;
  exp: number;
}

interface TokenVerification {
  error: null | TokenError;
  token: null | Token;
}

export const createToken = (payload: UID) => {
  if (!token_secret) throw new TokenError("Secret key not provided");

  return jwt.sign(payload, token_secret, {
    expiresIn: token_expiration,
  });
};

export const verifyToken = (token: string): Promise<TokenVerification> => {
  return new Promise((resolve, reject) => {
    if (!token_secret) {
      return {
        error: new TokenError("Secret key not provided"),
        token: null,
      };
    }

    jwt.verify(token, token_secret, (error, decoded) => {
      if (error) {
        if (error instanceof TokenExpiredError) {
          resolve({
            error: new TokenError("Expired token", { expired: true }),
            token: decoded as Token,
          });
        } else {
          resolve({ error: new TokenError(error.message), token: null });
        }
      } else {
        if (!decoded) {
          resolve({ error: null, token: null });
        } else {
          resolve({ error: null, token: decoded as Token });
        }
      }
    });
  });
};
