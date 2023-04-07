import {Restaurant} from "./restaurant.model";
import {Status} from "../enum/status.enum";
import {Dish} from "./dish.model";

export interface Order{
  id?: number;
  totalAmount: number;
  userId: number;
  restaurant: Restaurant;
  address: string;
  phone: string;
  orderTime: Date;
  status: Status;
  remark: string;
  dishes: Dish[];
}
