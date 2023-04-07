import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Flavor} from "../shared/model/flavor.model";
import {ShoppingCartService} from "../shared/service/shoppingCart.service";
import {MenuService} from "../shared/service/menu.service";
import {Menu} from "../shared/model/menu.model";
import {Dish} from "../shared/model/dish.model";
import {DishService} from "../shared/service/dish.service";
import { MatDialog } from '@angular/material/dialog';
import {MenuDetailComponent} from "../menu-detail/menu-detail.component";
import {CurrencyService} from "../shared/service/currency.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  restaurantId!: number;
  menus: Menu[] = [];
  @Input() dish: Dish | null = null;


  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dishService: DishService,
    private shoppingCartService: ShoppingCartService,
    private matDialog: MatDialog,
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenusByRestaurantId(this.restaurantId).subscribe(menus => {
      this.menus = menus;
      this.loadFlavorsForMenus();
    });
  }

  openMenuDetailDialog(menu: Menu): void {
    const dialogRef = this.matDialog.open(MenuDetailComponent, {
      data: {menu: menu, isEdit: false}
    });

    dialogRef.afterClosed().subscribe(selectedFlavors => {
      if (selectedFlavors) {
        this.addToShoppingCart(menu, selectedFlavors);
      }
    });
  }

  loadFlavorsForMenus(): void {
    this.menus.forEach(menu => {
      this.menuService.getAllFlavorsFromMenuId(menu.id).subscribe(flavors => {
        menu.flavors = flavors;
        console.log(menu);
      });
    });
  }

  addToShoppingCart(menu: Menu, selectedFlavors: Flavor[]): void {
    if (selectedFlavors.length > 0) {
      const dish: Dish = {
        id: -1,
        menu: menu,
        price: menu.price + selectedFlavors.reduce((total, flavor) => total + flavor.price, 0),
        flavors: selectedFlavors
      };
      this.shoppingCartService.addDishToShoppingCart(dish);
      alert('Dish added to the shopping cart');
    } else {
      alert('Please select a flavor');
    }
  }



}
