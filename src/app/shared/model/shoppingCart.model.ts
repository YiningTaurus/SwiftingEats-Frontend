import {Dish} from "./dish.model";

export interface ShoppingCart{
  id: number;
  userId: number;
  totalAmount: number;
  dishes: Dish[];
}
