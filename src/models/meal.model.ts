import { MealCategory } from "./enums/meal-category.enum";


export interface Meal{
    id: number;
    name: string;
    description: string;
    price: number;
    category: MealCategory;
    imageUrl: string;
}