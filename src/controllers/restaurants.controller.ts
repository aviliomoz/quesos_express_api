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
    if (error instanceof Error)
      return res.status(500).json({
        error: error.message,
      });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, currency_code, purchase_tax, sales_tax }: Restaurant = req.body;

  // Check if restaurant name is aready used
  try {
    const restaurants = await prisma.team.findMany({
      where: {
        user_id: (req as IRequest).user_id,
      },
      include: {
        restaurant: true,
      },
    });

    if (
      restaurants.map((restaurant) => restaurant.restaurant.name).includes(name)
    ) {
      return res.status(406).json({
        error: "Provided restaurant name already exists in your list",
      });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        currency_code,
        purchase_tax,
        sales_tax,
      },
    });

    await prisma.team.create({
      data: {
        user_id: (req as IRequest).user_id,
        restaurant_id: restaurant.id,
      },
    });

    return res.status(201).json({
      message: "Restaurant created",
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};
