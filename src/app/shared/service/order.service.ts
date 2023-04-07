import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order.model";
import {environment} from "../../../environments/environment.development";
import {Restaurant} from "../model/restaurant.model";

@Injectable()
export class OrderService{

  constructor(private httpClient: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.api_url}/order`, {
      withCredentials: true,
    });
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    console.log(userId);
    return this.httpClient.get<Order[]>(`${environment.api_url}/order/user/${userId}`, {
      withCredentials: true,
    });
  }

  getOrderByOrderId(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.api_url}/order/${orderId}`, {
      withCredentials: true,
    });
  }

  getOrdersByUserIdAndOrderId(userId: number, orderId: number): Observable<Order | null> {
    return this.httpClient.get<Order | null>(`${environment.api_url}/order/user/${userId}/order/${orderId}`);
  }

  getOrdersByRestaurant(restaurant: Restaurant): Observable<Order[]> {
    return this.httpClient.post<Order[]>(`${environment.api_url}/order/restaurant`, restaurant, {
      withCredentials: true,
    });
  }

  getOrdersByRestaurantId(restaurantId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.api_url}/order/restaurant/${restaurantId}`, {
      withCredentials: true,
    });
  }

  saveOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/order`, order);
  }

  updateOrder(orderId: number, order: Order): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/order/${orderId}`, order);
  }

}
