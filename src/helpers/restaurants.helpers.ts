import { Restaurant } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { z } from "zod";
import { restaurantSchema } from "../schemas/restaurant.schema";

export const getRestaurantByIdHelper = async (id: string) => {
  return prisma.restaurant.findFirst({ where: { id } });
};

export const getRestaurantByNameHelper = async (
  name: string,
  user_id: string
) => {
  const restaurants = await getRestaurantsByUserHelper(user_id);

  return restaurants.find((restaurant) => restaurant.name === name);
};

export const getRestaurantsByUserHelper = async (user_id: string) => {
  const results = await prisma.team.findMany({
    where: {
      user_id,
    },
    include: {
      restaurant: true,
    },
  });

  let restaurants: Restaurant[] = results.map((result) => result.restaurant);

  return restaurants;
};

export const createRestaurantHelper = (
  data: z.infer<typeof restaurantSchema>
) => {
  return prisma.restaurant.create({
    data,
  });
};

export const updateRestaurantHelper = (
  id: string,
  data: z.infer<typeof restaurantSchema>
) => {
  return prisma.restaurant.update({
    where: {
      id,
    },
    data,
  });
};

export const toggleRestaurantHelper = async (id: string) => {
  const restaurant = await getRestaurantByIdHelper(id);

  if (!restaurant) throw new Error("Error fetching restaurant");

  return prisma.restaurant.update({
    where: { id },
    data: { ...restaurant, status: !restaurant.status },
  });
};

export const validateMemberHelper = (
  user_id: string,
  restaurant_id: string
) => {
  return prisma.team.findFirst({
    where: { user_id, restaurant_id },
  });
};
