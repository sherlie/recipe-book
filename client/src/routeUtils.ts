export const BASE_API_URL = 'http://localhost:3000';

export const AppRoute = {
    Default: "/",
    Recipe: "recipe/:recipeId",
    CreateRecipe: "recipe/new",
    EditRecipe: "/recipe/edit/:recipeId",
} as const;

export function routeBuilder(route: string, recipeId: string) {
    return route.replace(":recipeId", recipeId);
}