import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../model/menu.model";
import {environment} from "../../../environments/environment.development";
import {Restaurant} from "../model/restaurant.model";
import {Flavor} from "../model/flavor.model";

@Injectable()
export class MenuService{

  constructor(private httpClient: HttpClient) {}

  saveMenu(menu: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(`${environment.api_url}/menu`, menu);
  }

  deleteMenuById(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/menu/${id}`);
  }

  updateMenuById(menu: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(`${environment.api_url}/menu/${menu.id}`, menu);
  }

  getMenuById(id: number): Observable<Menu | undefined> {
    return this.httpClient.get<Menu>(`${environment.api_url}/menu/${id}`);
  }

  getMenuByName(name: string): Observable<Menu>{
    return this.httpClient.get<Menu>(`${environment.api_url}/menu/name/${name}`);
  }

  getMenusByMenuCategory(menuCategory: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${environment.api_url}/menu/menuCategory/${menuCategory}`);
  }

  getMenusByRestaurantId(restaurantId: number): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(`${environment.api_url}/menu/restaurant/${restaurantId}`);
  }

  getMenusByRestaurant(restaurant: Restaurant): Observable<Menu[]>{
    return this.httpClient.post<Menu[]>(`${environment.api_url}/menu/restaurant`, restaurant);
  }

  getAllMenus(): Observable<Menu[] | undefined> {
    return this.httpClient.get<Menu[]>(`${environment.api_url}/menu`);
  }

  addFlavorToMenu(menuId: number, flavor: Flavor): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/menu/${menuId}/flavor`, flavor);
  }

  deleteFlavorFromMenu(menuId: number, flavorId: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/menu/${menuId}/flavor/${flavorId}`);
  }

  updateFlavorFromMenu(menuId: number, updatedFlavor: Flavor): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/menu/${menuId}/flavor`, updatedFlavor);
  }

  getAllFlavorsFromMenuId(menuId: number): Observable<Flavor[]> {
    return this.httpClient.get<Flavor[]>(`${environment.api_url}/menu/${menuId}/flavors`);
  }

}
