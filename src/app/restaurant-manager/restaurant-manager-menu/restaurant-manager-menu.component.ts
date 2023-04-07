import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../shared/service/restaurant.service";
import {MenuService} from "../../shared/service/menu.service";
import {FlavorService} from "../../shared/service/flavor.service";
import {FlavorCategoryService} from "../../shared/service/flavorCategory.service";
import {AuthService} from "../../shared/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Restaurant} from "../../shared/model/restaurant.model";
import {Menu} from "../../shared/model/menu.model";
import {Flavor} from "../../shared/model/flavor.model";
import {FlavorCategory} from "../../shared/model/flavorCategory.model";
import {catchError, tap, throwError} from "rxjs";
import {MenuDetailComponent} from "../../menu-detail/menu-detail.component";
import {
  RestaurantManagerMenuDetailComponent
} from "../restaurant-manager-menu-detail/restaurant-manager-menu-detail.component";

@Component({
  selector: 'app-restaurant-manager-menu',
  templateUrl: './restaurant-manager-menu.component.html',
  styleUrls: ['./restaurant-manager-menu.component.scss']
})
export class RestaurantManagerMenuComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  restaurant!: Restaurant;
  menus: Menu[] = [];
  flavors: Flavor[] = [];


  ngOnInit(): void {
    if (this.authService.user && this.authService.user['id']) {
      console.log('User:', this.authService.user);
      this.restaurant = this.authService.user.restaurant!;
      if (this.restaurant) {
        this.getMenus();
      }
    }
  }


  openManageMenuDetailDialog(menu: Menu | null): void {
    const dialogRef = this.dialog.open(RestaurantManagerMenuDetailComponent, {
      data: { menu: menu },
    });

    dialogRef.afterClosed().subscribe((updatedMenu: Menu | null) => {
      if (updatedMenu) {
        if (menu) {
          this.updateMenu(updatedMenu);
        } else {
          this.addNewMenu(updatedMenu);
        }
      }
    });
  }


  updateMenu(updatedMenu: Menu): void {
    const index = this.menus.findIndex((menu) => menu.id === updatedMenu.id);
    if (index !== -1) {
      this.menus[index] = updatedMenu;
    }
  }


  getMenus(): void {
    if (this.restaurant) {
      this.menuService.getMenusByRestaurantId(this.restaurant.id).subscribe((menus) => {
        this.menus = menus;
      });
    }
  }


  addNewMenu(menu: Menu): void {
    if (this.restaurant) {
      menu.restaurant.id = this.restaurant.id;
      this.menuService.saveMenu(menu).subscribe(
        (newMenu) => {
          this.menus.push(newMenu);
        },
        (error) => {
          console.error('Error adding new menu:', error);
        }
      );
    }
  }


  deleteMenu(menu: Menu): void {
    const confirmation = confirm('Deleting dishes is not recommended. Are you sure you want to delete it?');

    if (confirmation) {
      this.menuService.deleteMenuById(menu.id).subscribe(
        () => {
          this.removeMenuFromList(menu.id);
        },
        (error) => {
          alert('Deletion failed: Menu is in use.');
          console.error('Error deleting menu:', error);
        }
      );
    }
  }



  removeMenuFromList(menuId: number): void {
    this.menus = this.menus.filter((menu) => menu.id !== menuId);
  }



}
