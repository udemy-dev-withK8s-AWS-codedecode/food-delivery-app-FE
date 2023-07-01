import { FoodItem } from "./FoodItem";
import { Restaurant } from "./Restaurant";

export interface FoodCataloguePage{
    foodItemsList:FoodItem[];
    restaurant:Restaurant;
}