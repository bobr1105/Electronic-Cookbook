export interface Recipe {
    id: string,
    title: string,
    description: string,
    meal_category: MealCategory,
    ingredients: string[],
    preparation_steps: string[]
}

export enum MealCategory {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Dinner = "Dinner",
}