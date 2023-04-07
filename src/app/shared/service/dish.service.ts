import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Flavor} from "../model/flavor.model";
import {Observable} from "rxjs";
import {Dish} from "../model/dish.model";

@Injectable()
export class DishService{

  constructor(private httpClient: HttpClient) {}

  createDishFromMenuAndFlavors(menuId: number, flavors: Flavor[]): Observable<Dish> {
    const url = `${environment.api_url}/dish/create?menuId=${menuId}`;
    return this.httpClient.post<Dish>(url, flavors);
  }

  saveDish(dish: Dish): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/dish`, dish);
  }

  deleteDishById(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/dish/${id}`);
  }

  getDishById(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>(`${environment.api_url}/dish/${id}`);
  }

  addFlavorToDish(dishId: number, flavor: Flavor): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/dish/${dishId}/flavor`, flavor);
  }

  deleteFlavorFromDish(dishId: number, flavorId: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/dish/${dishId}/flavor/${flavorId}`);
  }

  updateFlavorInDish(dishId: number, updatedFlavor: Flavor): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/dish/${dishId}/flavor`, updatedFlavor);
  }

  getAllFlavorsByDishId(dishId: number): Observable<Flavor[]> {
    return this.httpClient.get<Flavor[]>(`${environment.api_url}/dish/${dishId}/flavor`);
  }
}
