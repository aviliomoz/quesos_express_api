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

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        currency_code,
        purchase_tax,
        sales_tax,
      },
    });

    // Add user to de restaurant team
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

export const updateRestaurant = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body as object;

  try {
    await prisma.restaurant.update({
      where: {
        id,
      },
      data: { ...body },
    });

    return res.status(200).json({
      message: "Restaurant updated",
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};

export const toggleRestaurantStatus = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const restaurant = await prisma.restaurant.findFirst({ where: { id } });

    const newRestaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data: { status: !restaurant?.status },
    });

    return res.status(200).json({
      message: `Restaurant has been ${
        newRestaurant.status ? "activated" : "unactivated"
      }`,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};
