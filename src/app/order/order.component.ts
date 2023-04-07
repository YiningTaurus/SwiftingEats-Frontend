import {Component, OnInit} from '@angular/core';
import {Order} from "../shared/model/order.model";
import {OrderService} from "../shared/service/order.service";
import {AuthService} from "../shared/service/auth.service";
import {CurrencyService} from "../shared/service/currency.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    if (this.authService.user && this.authService.user['id']) {
      const userId = this.authService.user['id'];
      this.orderService.getOrdersByUserId(userId).subscribe((orders) => {
        this.orders = orders;
      });
    }
  }

}
