export interface Ingredient {
    id: string;
    amount: number;
    unit?: string;
    name: string;
}

export interface Component {
    id: string;
    name: string;
    ingredients: Ingredient[];
}

export interface FullRecipe {
    id: string;
    name: string;
    method: string;
    components: Component[];
}

export interface LightRecipe {
    id: string;
    name: string;
}

export interface Page<T> {
    items: T;
    nextCursor?: string;
}

export interface Reply<T> {
    data: T;
    success: boolean;
}