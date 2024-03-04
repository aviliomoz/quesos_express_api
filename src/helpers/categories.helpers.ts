import { z } from "zod";
import { prisma } from "../libs/prisma";
import { categorySchema } from "../schemas/category.schema";
import { CategoryType } from "../types";

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

export const createCategoryHelper = (data: z.infer<typeof categorySchema>) => {
  return prisma.category.create({ data });
};

export const updateCategoryHelper = (
  id: string,
  data: z.infer<typeof categorySchema>
) => {
  return prisma.category.update({ where: { id }, data });
};

export const toggleCategoryHelper = async (id: string) => {
  const category = await getCategoryByIdHelper(id);

  if (!category) throw new Error("Error fetching category");

  return prisma.category.update({
    where: { id },
    data: { ...category, status: !category.status },
  });
};
