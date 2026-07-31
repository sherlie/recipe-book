import { createComponent } from "../model/componentsModel.ts";
import { createIngredient } from "../model/ingredientsModel.ts";
import { createRecipe } from "../model/recipesModel.ts";

export async function populateDB() {
  const { id: spaghettiId } = await createRecipe({
      name: "Spaghetti Bolognese",
      method: "Boil pasta, open jar of sauce",
  });
  const { id: cheesecakeId } = await createRecipe({
      name: "Cheesecake",
      method: "Bake the cheesecake",
  });

  const { id: pastaComponentId } = await createComponent({
    recipeId: spaghettiId,
    name: "Pasta",
  });

  await createIngredient({
    componentId: pastaComponentId,
    name: "Spaghetti",
    amount: 400,
    unit: "g",
  });

  await createIngredient({
    componentId: pastaComponentId,
    name: "Salt",
    amount: 1,
    unit: "tbsp",
  });

  const { id: sauceComponentId } = await createComponent({
    recipeId: spaghettiId,
    name: "Bolognese Sauce",
  });

    await createIngredient({
        componentId: sauceComponentId,
        name: "Ground beef",
        amount: 500,
        unit: "g",
    });

    await createIngredient({
        componentId: sauceComponentId,
        name: "Onion",
        amount: 1,
        unit: "pcs",
    });

    await createIngredient({
        componentId: sauceComponentId,
        name: "Garlic cloves",
        amount: 2,
        unit: "pcs",
    });

    await createIngredient({
        componentId: sauceComponentId,
        name: "Crushed tomatoes",
        amount: 400,
        unit: "g",
    });

    await createIngredient({
        componentId: sauceComponentId,
        name: "Olive oil",
        amount: 2,
        unit: "tbsp",
    });

    // ----------------------------
    // Cheesecake
    // ----------------------------

    const { id: crustComponentId } = await createComponent({
        recipeId: cheesecakeId,
        name: "Crust",
    });

    await createIngredient({
        componentId: crustComponentId,
        name: "Digestive biscuits",
        amount: 200,
        unit: "g",
    });

    await createIngredient({
        componentId: crustComponentId,
        name: "Butter",
        amount: 100,
        unit: "g",
    });

    const { id: fillingComponentId } = await createComponent({
        recipeId: cheesecakeId,
        name: "Filling",
    });

    await createIngredient({
        componentId: fillingComponentId,
        name: "Cream cheese",
        amount: 600,
        unit: "g",
    });

    await createIngredient({
        componentId: fillingComponentId,
        name: "Sugar",
        amount: 150,
        unit: "g",
    });

    await createIngredient({
        componentId: fillingComponentId,
        name: "Eggs",
        amount: 3,
        unit: "pcs",
    });

    await createIngredient({
        componentId: fillingComponentId,
        name: "Vanilla extract",
        amount: 1,
        unit: "tsp",
    });

    await createIngredient({
        componentId: fillingComponentId,
        name: "Sour cream",
        amount: 150,
        unit: "g",
    });
}
