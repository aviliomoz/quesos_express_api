import { prisma } from "../libs/prisma";
import { FullRecipe, Recipe } from "../types";

export const buildProductRecipe = async (
  product_id: string
): Promise<Recipe> => {
  const supplies = await prisma.supplyOnProduct.findMany({
    where: {
      product_id,
    },
    include: {
      supply: true,
    },
  });

  const subproducts = await prisma.subproductOnProduct.findMany({
    where: {
      product_id,
    },
    include: {
      subproduct: true,
    },
  });

  return {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
    })),
    subproducts: subproducts.map((subproduct) => ({
      ...subproduct.subproduct,
      amount: subproduct.amount,
    })),
  };
};

export const buildSubproductRecipe = async (
  subproduct_id: string
): Promise<Recipe> => {
  const supplies = await prisma.supplyOnSubproduct.findMany({
    where: {
      subproduct_id,
    },
    include: {
      supply: true,
    },
  });

  const subproducts = await prisma.subproductOnSubproduct.findMany({
    where: {
      base_subproduct_id: subproduct_id,
    },
    include: {
      ingredient_subproduct: true,
    },
  });

  return {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
    })),
    subproducts: subproducts.map((subproduct) => ({
      ...subproduct.ingredient_subproduct,
      amount: subproduct.amount,
    })),
  };
};

export const buildFullSubproductRecipe = async (
  subproduct_id: string
): Promise<FullRecipe> => {
  const supplies = await prisma.supplyOnSubproduct.findMany({
    where: {
      subproduct_id,
    },
    include: {
      supply: true,
    },
  });

  const subproducts = await prisma.subproductOnSubproduct.findMany({
    where: {
      base_subproduct_id: subproduct_id,
    },
    include: {
      ingredient_subproduct: true,
    },
  });

  let full_recipe: FullRecipe = {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
    })),
    subproducts: [],
  };

  for await (const subproduct of subproducts) {
    const recipe: FullRecipe = await buildFullSubproductRecipe(
      subproduct.base_subproduct_id
    );
    const clean_subproduct = {
      ...subproduct.ingredient_subproduct,
      amount: subproduct.amount,
      recipe,
    };
    full_recipe.subproducts.push(clean_subproduct);
  }

  return full_recipe;
};

export const buildFullProductRecipe = async (
  product_id: string
): Promise<FullRecipe> => {
  const supplies = await prisma.supplyOnProduct.findMany({
    where: {
      product_id,
    },
    include: {
      supply: true,
    },
  });

  const subproducts = await prisma.subproductOnProduct.findMany({
    where: {
      product_id,
    },
    include: {
      subproduct: true,
    },
  });

  let full_recipe: FullRecipe = {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
    })),
    subproducts: [],
  };

  for await (const subproduct of subproducts) {
    const recipe: FullRecipe = await buildFullSubproductRecipe(
      subproduct.subproduct_id
    );
    const clean_subproduct = {
      ...subproduct.subproduct,
      amount: subproduct.amount,
      recipe,
    };
    full_recipe.subproducts.push(clean_subproduct);
  }

  return full_recipe;
};
