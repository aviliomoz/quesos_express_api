import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { IRequest } from "../types";
import { Restaurant } from "@prisma/client";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const results = await prisma.team.findMany({
      where: {
        user_id: (req as IRequest).user_id,
      },
      include: {
        restaurant: true,
      },
    });

    let restaurants: Restaurant[] = results.map((result) => result.restaurant);

    return res.status(200).json(restaurants);
  } catch (error) {
    error instanceof Error &&
      res.status(500).json({
        error: error.message,
      });
  }
};
