import type { Request } from "express";
import { UserResponse } from "./models/users";
import { Restaurant } from "./models/restaurants";

type CustomRequest = Request & {
  user: UserResponse;
  restaurant: Restaurant;
  is_admin: boolean;
};

type Token = {
  user: UserResponse;
  iat: number;
  exp: number;
};

type TokenVerification = {
  error: null | string;
  token: null | Token;
};
