import {User} from "./user.model";

export interface UserDetail {
  id?: number;
  user: User;
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
}
