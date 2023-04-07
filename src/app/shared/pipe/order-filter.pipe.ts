import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/order.model";

@Pipe({
  name: 'orderFilter'
})

export class OrderFilterPipe implements PipeTransform {
  transform(orders: Order[], userId: string, orderId: string): Order[] {
    if (!orders) {
      return [];
    }

    let filteredOrders = orders;

    if (userId) {
      filteredOrders = filteredOrders.filter(order => order.userId.toString().includes(userId));
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter(order => order.id?.toString().includes(orderId));
    }

    return filteredOrders;
  }
}
