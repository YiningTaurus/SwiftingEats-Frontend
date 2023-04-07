import { Component } from '@angular/core';
import {Status} from "../../shared/enum/status.enum";
import {OrderService} from "../../shared/service/order.service";
import {AuthService} from "../../shared/service/auth.service";
import {Restaurant} from "../../shared/model/restaurant.model";
import {Order} from "../../shared/model/order.model";

@Component({
  selector: 'app-restaurant-manager-order',
  templateUrl: './restaurant-manager-order.component.html',
  styleUrls: ['./restaurant-manager-order.component.scss']
})
export class RestaurantManagerOrderComponent {

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}


  orders!: Order[];
  public statusEnum = Status;
  searchUserId: string = '';
  searchOrderId: string = '';
  displayedColumns: string[] = [
    'id',
    'totalAmount',
    'userId',
    'address',
    'phone',
    'orderTime',
    'status',
    'remark',
    'dishes',
    'actions'
  ];
  restaurant!: Restaurant;


  ngOnInit(): void {
    if (this.authService.user && this.authService.user['id']) {
      console.log('User:', this.authService.user);
      this.restaurant = this.authService.user.restaurant!;
    }
    this.orderService.getOrdersByRestaurantId(this.restaurant.id).subscribe((orders) => {
      console.log(orders);
      this.orders = orders;
    });
  }


  displayNoOrderMessage(): boolean {
    return (
      (!!this.searchUserId && this.orders.every(order => !order.userId.toString().includes(this.searchUserId))) ||
      (!!this.searchOrderId && this.orders.every(order => !order.id!.toString().includes(this.searchOrderId)))
    );
  }


  cancelOrder(order: Order): void {
    if (order.id === undefined) {
      console.error('Order ID is undefined');
      return;
    }
    order.status = Status.CANCELED;
    this.orderService.updateOrder(order.id, order).subscribe((updatedOrder) => {
      console.log('Order status updated:', updatedOrder);
    });
  }
}
