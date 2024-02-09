import { Subproduct, Supply } from "@prisma/client";

interface SupplyWithAmount extends Supply {
  amount: number;
}

interface SubproductWithAmountAndRecipe extends Subproduct {
  amount: number;
  recipe: Recipe;
}

interface Recipe {
  supplies: SupplyWithAmount[];
  subproducts: SubproductWithAmountAndRecipe[];
}
