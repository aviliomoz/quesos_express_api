import type { Request } from "express";

type CustomRequest = Request & {
  user_id: string;
  is_admin: boolean;
  restaurant_id: string;
};

type UID = {
  uid: string;
}

type Token = {
  uid: string;
  iat: number;
  exp: number;
}

type TokenVerification = {
  error: null | string;
  token: null | Token;
}