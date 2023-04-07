import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FlavorCategory} from "../model/flavorCategory.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable()
export class FlavorCategoryService{

  constructor(private httpClient: HttpClient) {}

  saveFlavorCategory(flavorCategory: FlavorCategory): Observable<FlavorCategory> {
    return this.httpClient.post<FlavorCategory>(`${environment.api_url}/flavorCategory`, flavorCategory);
  }

  deleteFlavorCategoryById(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/flavorCategory/${id}`);
  }

  updateFlavorCategoryById(flavorCategory: FlavorCategory): Observable<FlavorCategory> {
    return this.httpClient.put<FlavorCategory>(`${environment.api_url}/flavorCategory/${flavorCategory.id}`, flavorCategory);
  }

  getFlavorCategoryById(id: number): Observable<FlavorCategory> {
    return this.httpClient.get<FlavorCategory>(`${environment.api_url}/flavorCategory/${id}`);
  }

  getFlavorCategoryByType(type: string): Observable<FlavorCategory> {
    return this.httpClient.get<FlavorCategory>(`${environment.api_url}/flavorCategory/type/${type}`);
  }

  getFlavorCategoriesByRestaurantId(restaurantId: number): Observable<FlavorCategory[]> {
    return this.httpClient.get<FlavorCategory[]>(`${environment.api_url}/flavorCategory/restaurant/${restaurantId}`);
  }

  getAllFlavorCategories(): Observable<FlavorCategory[]> {
    return this.httpClient.get<FlavorCategory[]>(`${environment.api_url}/flavorCategory`);
  }

}
