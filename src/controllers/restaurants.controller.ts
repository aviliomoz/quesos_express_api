import { Request, Response } from "express";
import { IRequest } from "../types";
import { Restaurant } from "@prisma/client";
import {
  createRestaurantHelper,
  getRestaurantByNameHelper,
  getRestaurantsByUserHelper,
  updateRestaurantHelper,
} from "../helpers/restaurants.helpers";
import { DuplicateError, handleErrorResponse } from "../utils/errors";
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
  const data: Restaurant = req.body;

  // Check if restaurant name is aready used
  try {
    const foundRestaurant = await getRestaurantByNameHelper(
      data.name,
      (req as IRequest).user_id
    );

    if (foundRestaurant)
      throw new DuplicateError("Provided restaurant name is already used");

    // Create restaurant
    const restaurant = await createRestaurantHelper(data);

    // Add user to de restaurant team
    await joinTeamHelper((req as IRequest).user_id, restaurant.id, {
      is_admin: true,
    });

    return res.status(201).json({
      message: "Restaurant created",
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const restaurant_id = req.params.restaurant_id;
  const data: Restaurant = req.body;

  try {
    await updateRestaurantHelper(restaurant_id, data);

    return res.status(200).json({
      message: "Restaurant updated",
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
