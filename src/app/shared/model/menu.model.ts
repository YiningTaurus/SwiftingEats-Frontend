import {Restaurant} from "./restaurant.model";
import {Flavor} from "./flavor.model";

export interface Menu{
  id: number;
  restaurant: Restaurant;
  name: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
  menuCategory: string;
  flavors: Flavor[];

}
