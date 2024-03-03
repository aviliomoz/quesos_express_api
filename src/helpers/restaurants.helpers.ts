import { Restaurant } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { z } from "zod";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../schemas/restaurant.schema";

export const getRestaurantByIdHelper = async (id: string) => {
    return prisma.restaurant.findFirst({ where: { id } });
}

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

export const validateMemberHelper = (
  user_id: string,
  restaurant_id: string
) => {
  return prisma.team.findFirst({
    where: { user_id, restaurant_id },
  });
};

export const createRestaurantHelper = (
  data: z.infer<typeof createRestaurantSchema>
) => {
  return prisma.restaurant.create({
    data,
  });
};

export const updateRestaurantHelper = (
  id: string,
  data: z.infer<typeof updateRestaurantSchema>
) => {
  return prisma.restaurant.update({
    where: {
      id,
    },
    data,
  });
};
