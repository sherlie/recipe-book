import type { Tag } from "./types";

export interface CreateIngredient {
    id?: string;
    amount: number;
    unit?: string;
    name: string;
}

export interface CreateComponent {
    id?: string;
    name: string;
    ingredients: CreateIngredient[];
}

export interface CreateFullRecipe {
    name: string;
    method: string;
    components: CreateComponent[];
    tags?: Tag[];
}
