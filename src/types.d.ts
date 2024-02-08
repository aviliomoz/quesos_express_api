import { Subproduct, Supply } from "@prisma/client";

interface SupplyWithAmount extends Supply {
  amount: number;
}

interface SubproductWithAmount extends Subproduct {
  amount: number;
}

interface SubproductWithAmountAndRecipe extends SubproductWithAmount {
  recipe: FullRecipe;
}

interface Recipe {
  supplies: SupplyWithAmount[];
  subproducts: SubproductWithAmount[];
}

interface FullRecipe {
  supplies: SupplyWithAmount[];
  subproducts: SubproductWithAmountAndRecipe[];
}
