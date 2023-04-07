import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Restaurant} from "../model/restaurant.model";
import {environment} from "../../../environments/environment.development";

@Injectable()
export class RestaurantService{

  constructor(private httpClient: HttpClient) {}

  saveRestaurant(restaurant: Restaurant): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/restaurant`, restaurant);
  }

  deleteRestaurantById(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/restaurant/${id}`);
  }

  updateRestaurantById(id: number, restaurant: Restaurant): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/restaurant/${id}`, restaurant);
  }

  getRestaurantById(id: number): Observable<Restaurant | undefined> {
    return this.httpClient.get<Restaurant>(`${environment.api_url}/restaurant/${id}`);
  }

  getRestaurantByName(name: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.api_url}/restaurant/name/${name}`);
  }

  getRestaurantsByRestaurantCategory(restaurantCategory: string): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.api_url}/restaurant/restaurantCategory/${restaurantCategory}`);
  }

  getAllRestaurants(): Observable<Restaurant[] | undefined>{
    return this.httpClient.get<Restaurant[]>(`${environment.api_url}/restaurant/`);
  }

}
