import type { Recipe } from "../types/recipes.ts";

export const PAGE_SIZE: number = 1;

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "lemon cookie",
    ingredients: [
      { amount: 100, unit: "g", name: "butter" },
      { amount: 150, unit: "g", name: "sugar" },
      { amount: 1, name: "lemon"},
    ],
    method: "",
  },
  {
    id: "2",
    name: "choco pie",
    ingredients: [
      { amount: 100, unit: "g", name: "butter" },
      { amount: 150, unit: "g", name: "sugar" },
      { amount: 30, unit: "g", name: "cocoa"},
      { amount: 2, name: "eggs"},
    ],
    method: "",
  }
];
export let lastId = 2;