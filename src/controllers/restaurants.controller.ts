import { Request, Response } from "express";
import { IRequest } from "../types";
import { Restaurant } from "@prisma/client";
import {
  createRestaurantHelper,
  getRestaurantByIdHelper,
  getRestaurantsByUserHelper,
  updateRestaurantHelper,
} from "../helpers/restaurants.helpers";
import { handleErrorResponse } from "../utils/errors";
import { joinTeamHelper } from "../helpers/teams.helpers";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await getRestaurantsByUserHelper(
      (req as IRequest).user_id
    );

    return res.status(200).json(restaurants);
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, currency_code, purchase_tax, sales_tax }: Restaurant = req.body;

  // Check if restaurant name is aready used
  try {
    const restaurants = await getRestaurantsByUserHelper(
      (req as IRequest).user_id
    );

    if (restaurants.map((restaurant) => restaurant.name).includes(name)) {
      return res.status(400).json({
        error: "Provided restaurant name already exists in your list",
      });
    }

    // Create restaurant
    const restaurant = await createRestaurantHelper({
      name,
      currency_code,
      purchase_tax,
      sales_tax,
    });

    // Add user to de restaurant team
    await joinTeamHelper((req as IRequest).user_id, restaurant.id, {
      is_admin: true,
    });

    // TODO Initialize categories

    return res.status(201).json({
      message: "Restaurant created",
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data: Restaurant = req.body;

  try {
    await updateRestaurantHelper(id, data);

    return res.status(200).json({
      message: "Restaurant updated",
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const toggleRestaurantStatus = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const restaurant = await getRestaurantByIdHelper(id);

    const newRestaurant = await updateRestaurantHelper(id, {
      status: !restaurant?.status,
    });

    return res.status(200).json({
      message: `Restaurant has been ${
        newRestaurant.status ? "activated" : "unactivated"
      }`,
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
