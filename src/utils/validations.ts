import { Status } from "../types";

export const validateStatus = (status: any): Status | undefined => {
  return ["active", "inactive"].includes(status) ? status : undefined;
};
