import { createRecipe } from "../model/recipesModel.ts";

export async function populateDB() {
  await createRecipe({
      name: "Spaghetti Bolognese",
      method: "Boil pasta, open jar of sauce",
      components: [
        {
            name: "Pasta",
            ingredients: [
                {
                    name: "Spaghetti",
                    amount: 400,
                    unit: "g",
                },
                {
                    name: "Salt",
                    amount: 1,
                    unit: "tbsp",
                },
            ],
        },
        {
            name: "Bolognese Sauce",
            ingredients: [
                {
                    name: "Ground beef",
                    amount: 500,
                    unit: "g",
                },
                {
                    name: "Onion",
                    amount: 1,
                },
                {
                    name: "Garlic cloves",
                    amount: 2,
                },
                {
                    name: "Crushed tomatoes",
                    amount: 400,
                    unit: "g",
                },
                {
                    name: "Olive oil",
                    amount: 2,
                    unit: "tbsp",
                },
            ],
        },
    ],
  });
  await createRecipe({
      name: "Cheesecake",
      method: "Bake the cheesecake",
      components: [
            {
                name: "Crust",
                ingredients: [
                    {
                        name: "Digestive biscuits",
                        amount: 200,
                        unit: "g",
                    },
                    {
                        name: "Butter",
                        amount: 100,
                        unit: "g",
                    },
                ],
            },
            {
                name: "Filling",
                ingredients: [
                    {
                        name: "Cream cheese",
                        amount: 600,
                        unit: "g",
                    },
                    {
                        name: "Sugar",
                        amount: 150,
                        unit: "g",
                    },
                    {
                        name: "Eggs",
                        amount: 3,
                    },
                    {
                        name: "Vanilla extract",
                        amount: 1,
                        unit: "tsp",
                    },
                    {
                        name: "Sour cream",
                        amount: 150,
                        unit: "g",
                    },
                ],
            },
        ],
  });
}