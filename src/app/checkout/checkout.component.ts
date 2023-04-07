import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {loadStripe, Stripe, StripeCardElement, StripeElements} from "@stripe/stripe-js";
import {ShoppingCartService} from "../shared/service/shoppingCart.service";
import {ShoppingCart} from "../shared/model/shoppingCart.model";
import {CurrencyService} from "../shared/service/currency.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/service/order.service";
import {Order} from "../shared/model/order.model";
import {Status} from "../shared/enum/status.enum";
import {Menu} from "../shared/model/menu.model";
import {Flavor} from "../shared/model/flavor.model";
import {forkJoin} from "rxjs";
import {MenuService} from "../shared/service/menu.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  cardErrors: string | null = null;
  amount: number = 0;
  loading: boolean = false;
  address: string = '';
  phone: string = '';
  remark: string = '';

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    public currencyService: CurrencyService,
    private router: Router,
    private orderService: OrderService,
    private menuService: MenuService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');
    const elements: StripeElements = this.stripe!.elements();

    this.card = elements.create('card');
    this.card.mount('#card-element');

    (this.card as any).addEventListener('change', (event: any) => {
      const error = event.error;
      this.cardErrors = error && error.message;
    });

    this.shoppingCartService.getShoppingCart().subscribe((data: ShoppingCart | null) => {
      if (data) {
        this.amount = data.totalAmount;
      }
    });
  }


  onCurrencyChange(event: any) {
    this.currencyService.currencyCode = event.target.value;
    console.log('Selected currency:', this.currencyService.currencyCode);
  }


  async handleForm(e: Event) {
    e.preventDefault();
    if (!this.address || !this.phone || !this.card || this.cardErrors) {
      this.cardErrors = 'Please fill in all required fields.';
      this.loading = false;
      return;
    }
    this.loading = true;
    const token = { id: 'dummy_token_id' };
    console.log(token);

    this.shoppingCartService.getShoppingCart().subscribe((shoppingCart: ShoppingCart | null) => {
      if (shoppingCart) {
        const order: Order = {
          totalAmount: this.currencyService.convertToUSD(this.amount),
          userId: this.auth.user!.id as number,
          restaurant: shoppingCart.dishes[0].menu.restaurant,
          address: this.address,
          phone: this.phone,
          orderTime: new Date(),
          status: Status.PENDING_DELIVERY,
          remark: this.remark,
          dishes: shoppingCart.dishes
        };
        this.orderService.saveOrder(order).subscribe(response => {
          this.shoppingCartService.clearShoppingCart();
          console.log('Order saved successfully', response);
          this.router.navigate(['/success']);
          this.loading = false;
        }, error => {
          console.error('Failed to save the order', error);
        });
      }
    });
  }


}
