import { SaleStatus, Status } from "../types";

export const validateStatus = (status: any): Status | undefined => {
  return ["active", "inactive"].includes(status) ? status : undefined;
};

export const validateSaleStatus = (status: any): SaleStatus | undefined => {
  return ["pending", "deleted", "completed"].includes(status)
    ? status
    : undefined;
};
