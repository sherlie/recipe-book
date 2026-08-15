export interface CreateIngredient {
    amount: number;
    unit?: string;
    name: string;
}

export interface CreateComponent {
    name: string;
    ingredients: CreateIngredient[];
}

export interface CreateFullRecipe {
    name: string;
    method: string;
    components: CreateComponent[];
}
