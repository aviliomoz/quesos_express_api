import { Request, Response } from "express";

export const getRestaurants = async (req: Request, res: Response) => {
  return res.send("Restaurants");
};
