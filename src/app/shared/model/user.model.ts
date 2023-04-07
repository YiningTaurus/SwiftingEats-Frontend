import {Restaurant} from "./restaurant.model";
import {Role} from "../enum/role.enum";

export interface User {
  id?: number;
  username: string;
  password: string;
  restaurant?: Restaurant;
  role: Role;
}
