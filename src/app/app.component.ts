import {Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from "./shared/service/shoppingCart.service";
import {AuthService} from "./shared/service/auth.service";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.loadShoppingCart();
    this.authService.checkLogin().subscribe();
  }

  title = 'finalProject';


  @ViewChild("shoppingCartDrawer", { static: false })
  shoppingCartDrawer!: MatDrawer;
}
