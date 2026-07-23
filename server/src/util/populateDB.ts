import { createRecipe } from "../model/recipesModel.ts";

export async function populateDB() {
    await createRecipe({
      name: "Spaghetti Bolognese",
      method: "Boil pasta, open jar of sauce",
  });
  await createRecipe({
      name: "Choco chip cookies",
      method: "Bake the cookies",
  });
}
