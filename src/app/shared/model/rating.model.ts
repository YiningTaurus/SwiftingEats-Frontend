import {Restaurant} from "./restaurant.model";
import {Rate} from "../enum/rate.enum";

export interface Rating{
  id: number;
  orderId: number;
  userId: number;
  rate: Rate;
  comment: string;
  restaurant: Restaurant;
}
