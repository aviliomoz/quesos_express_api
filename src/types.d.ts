import type { Request } from "express";
import type { UserResponse } from "./models/users.model";

type CustomRequest = Request & {
  user: UserResponse;
};

type Token = {
  user: UserResponse;
  iat: number;
  exp: number;
};

type TokenVerification = {
  error: string | null;
  token: Token | null;
};

type ErrorInfo = {
  status: number;
  code: string;
  details: string;
};

type Status = "active" | "inactive";

type Kardex = {
  id: string;
  date: Date;
  product: {
    id: string;
    name: string;
    status: string;
  };
  type: string;
  description: string;
  status: string;
  entry: number;
  output: number;
  balance: number;
}[];
