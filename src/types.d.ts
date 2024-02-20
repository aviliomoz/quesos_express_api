import { Product, Subproduct, Supply } from "@prisma/client";
import type { Request } from "express";

interface SupplyWithAmountAndEquivalence extends Supply {
  amount: number;
  use_equivalence: boolean;
}

interface SubproductWithAmountAndRecipe extends Subproduct {
  amount: number;
  recipe: Recipe;
}

interface Recipe {
  supplies: SupplyWithAmountAndEquivalence[];
  subproducts: SubproductWithAmountAndRecipe[];
}

interface ProductWithRecipe extends Product {
  recipe: Recipe;
}

interface IRequest extends Request {
  user_id: string
}

