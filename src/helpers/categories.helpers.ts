import { prisma } from "../libs/prisma";
import { CategoryType } from "../types";
import { Category } from "@prisma/client";

export const getCategoriesHelper = (
  type: CategoryType,
  restaurant_id: string
) => {
  return prisma.category.findMany({
    where: {
      restaurant_id,
      type,
    },
  });
};

export const getCategoryByIdHelper = (id: string) => {
  return prisma.category.findFirst({
    where: {
      id,
    },
  });
};

export const getCategoryByNameHelper = (
  name: string,
  restaurant_id: string,
  type: string
) => {
  return prisma.category.findFirst({
    where: {
      name,
      restaurant_id,
      type,
    },
  });
};

export const createCategoryHelper = (data: Category) => {
  return prisma.category.create({ data });
};

export const updateCategoryHelper = (id: string, data: Category) => {
  return prisma.category.update({ where: { id }, data });
};
