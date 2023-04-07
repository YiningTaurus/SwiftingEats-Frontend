import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Flavor} from "../model/flavor.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {FlavorCategory} from "../model/flavorCategory.model";

@Injectable()
export class FlavorService{

  constructor(private httpClient: HttpClient) {}

  saveFlavor(flavor: Flavor): Observable<Flavor> {
    return this.httpClient.post<Flavor>(`${environment.api_url}/flavor`, flavor);
  }

  deleteFlavorById(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/flavor/${id}`);
  }

  updateFlavorById(flavor: Flavor): Observable<Flavor> {
    return this.httpClient.put<Flavor>(`${environment.api_url}/flavor/${flavor.id}`, flavor);
  }

  getFlavorById(id: number): Observable<Flavor> {
    return this.httpClient.get<Flavor>(`${environment.api_url}/flavor/${id}`);
  }

  getFlavorByInfo(info: string): Observable<Flavor>{
    return this.httpClient.get<Flavor>(`${environment.api_url}/flavor/info/${info}`);
  }

  getFlavorsByFlavorCategory(flavorCategory: FlavorCategory): Observable<Flavor[]> {
    return this.httpClient.post<Flavor[]>(`${environment.api_url}/flavor/category`, flavorCategory);
  }

  getFlavorsByRestaurantId(restaurantId: number): Observable<Flavor[]> {
    return this.httpClient.get<Flavor[]>(`${environment.api_url}/flavor/restaurant/${restaurantId}`);
  }

  getAllFlavors(): Observable<Flavor[]> {
    return this.httpClient.get<Flavor[]>(`${environment.api_url}/flavor`);
  }

}
