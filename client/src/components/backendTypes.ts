export interface Recipe {
    id: string,
    title:string,
    meal_category: MealCategory,
    ingredients: string[],
    preparation_steps: string[]
}

export enum MealCategory {
    Breakfast,
    Lunch,
    Dinner
}