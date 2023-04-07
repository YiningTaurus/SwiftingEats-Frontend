import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingCart} from "../shared/model/shoppingCart.model";
import {ShoppingCartService} from "../shared/service/shoppingCart.service";
import {Router} from "@angular/router";
import {CurrencyService} from "../shared/service/currency.service";
import {Dish} from "../shared/model/dish.model";
import {MenuDetailComponent} from "../menu-detail/menu-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../shared/service/auth.service";
import {MenuService} from "../shared/service/menu.service";
import {Menu} from "../shared/model/menu.model";
import {Flavor} from "../shared/model/flavor.model";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    public currencyService: CurrencyService,
    private matDialog: MatDialog,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart().subscribe((data: ShoppingCart) => {
      this.shoppingCart = data;
      console.log('shoppingCart:', this.shoppingCart);
    });
  }

  shoppingCart: ShoppingCart | null = null;
  @Output() closeDrawer = new EventEmitter<void>();

  onRemoveDish(dish: Dish): void {
    this.shoppingCartService.deleteDishFromShoppingCart(dish);
  }

  onEditDish(dish: Dish): void {
    const dialogRef = this.matDialog.open(MenuDetailComponent, {
      data: {menu: dish.menu, isEdit: true}
    });
    dialogRef.afterClosed().subscribe(selectedFlavors => {
      if (selectedFlavors) {
        console.log(dish);
        this.shoppingCartService.updateDishFlavors(dish, selectedFlavors);
      }
    });
  }


  unavailableDishes(dishes: { menu: Menu; flavors: Flavor[] }[], currentMenus: (Menu | undefined)[]): string[] {
    return dishes.filter(dish => {
      const menu = currentMenus.find(menu => menu?.id === dish.menu.id);
      return menu && !menu.isAvailable;
    }).map(dish => dish.menu.name);
  }


  onCheckout(): void {
    this.closeDrawer.emit();
    if (this.shoppingCart && this.shoppingCart.dishes.length === 0) {
      alert("Your cart is empty! Satisfy it and your stomach!");
      return;
    }

    if (this.shoppingCart) {
      const menuIds = this.shoppingCart.dishes.map(dish => dish.menu.id);
      const menuObservables = menuIds.map(id => this.menuService.getMenuById(id));
      forkJoin(menuObservables).subscribe(currentMenus => {
        const unavailableDishNames = this.unavailableDishes(this.shoppingCart!.dishes, currentMenus);
        if (unavailableDishNames.length > 0) {
          alert(`The following dish(es) in your shopping cart are unavailable. Please remove them before proceeding: \n\n${unavailableDishNames.join('\n')}`);
          return;
        }

        if (this.authService.user !== null) {
          this.router.navigate(['/checkout']).then((r) => {
            if (!r) {
              console.error('Navigation to /checkout failed');
            }
          });
        } else {
          this.router.navigate(['/login']).then((r) => {
            if (!r) {
              console.error('Navigation to /login failed');
            }
          });
        }
      });
    }
  }
}
