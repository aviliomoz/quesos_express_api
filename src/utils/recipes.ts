import { prisma } from "../libs/prisma";
import { Recipe } from "../types";

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

  let full_recipe: Recipe = {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
      use_equivalence: supply.use_equivalence && supply.supply.has_equivalence,
    })),
    subproducts: [],
  };

  for await (const subproduct of subproducts) {
    const recipe: Recipe = await buildSubproductRecipe(
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

  let full_recipe: Recipe = {
    supplies: supplies.map((supply) => ({
      ...supply.supply,
      amount: supply.amount,
      use_equivalence: supply.use_equivalence && supply.supply.has_equivalence,
    })),
    subproducts: [],
  };

  for await (const subproduct of subproducts) {
    const recipe: Recipe = await buildSubproductRecipe(
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
