import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import {Restaurant} from "../model/restaurant.model";

@Injectable()
export class UserService{

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.api_url}/user`, {
      withCredentials: true,
    });
  }

  addUser(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${environment.api_url}/user`, user);
  }

  createRestaurantAndManager(restaurant: Restaurant, user: User): Observable<Response> {
    const requestData = {
      restaurant: restaurant,
      user: user,
    };
    return this.httpClient.post<Response>(`${environment.api_url}/user/addRestaurantManager`, requestData,{
      withCredentials: true,
    });
  }

  changePassword(user: User): Observable<any> {
    return this.httpClient.put<Response>(`${environment.api_url}/user`, {
      withCredentials: true,
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<Response>(`${environment.api_url}/user/${id}`, {
      withCredentials: true,
    });
  }

}
