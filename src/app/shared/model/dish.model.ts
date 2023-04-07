import {Menu} from "./menu.model";
import {Flavor} from "./flavor.model";

export interface Dish{
  id?: number;
  menu: Menu;
  price: number;
  flavors: Flavor[];
}
