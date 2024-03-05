import { Restaurant } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getRestaurantByIdHelper = async (id: string) => {
  return prisma.restaurant.findFirst({ where: { id } });
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

export const getRestaurantByNameHelper = async (
  name: string,
  user_id: string
) => {
  const restaurants = await getRestaurantsByUserHelper(user_id);

  return restaurants.find((restaurant) => restaurant.name === name);
};

export const createRestaurantHelper = (data: Restaurant) => {
  return prisma.restaurant.create({
    data,
  });
};

export const updateRestaurantHelper = (id: string, data: Restaurant) => {
  return prisma.restaurant.update({
    where: {
      id,
    },
    data,
  });
};
