import {FlavorCategory} from "./flavorCategory.model";

export interface Flavor{
  id: number;
  info: string;
  price: number;
  flavorCategory: FlavorCategory;
  restaurantId: number;
}
