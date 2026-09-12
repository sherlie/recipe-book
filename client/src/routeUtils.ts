export const BASE_API_URL = 'http://localhost:3000';

export const AppRoute = {
    Default: "/",
    Recipe: "/recipe/:id",
    CreateRecipe: "/recipe/new",
    EditRecipe: "/recipe/edit/:id",
    RecipesByTag: "/recipes/tag/:id",
} as const;

export function routeBuilder(route: string, id: string) {
    return route.replace(":id", id);
}