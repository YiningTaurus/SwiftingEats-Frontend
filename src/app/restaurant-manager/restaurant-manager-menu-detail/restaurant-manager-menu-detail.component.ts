import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../shared/model/menu.model";
import {FlavorService} from "../../shared/service/flavor.service";
import {MenuService} from "../../shared/service/menu.service";
import {Flavor} from "../../shared/model/flavor.model";
import {FlavorCategoryService} from "../../shared/service/flavorCategory.service";
import {FlavorCategory} from "../../shared/model/flavorCategory.model";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-restaurant-manager-menu-detail',
  templateUrl: './restaurant-manager-menu-detail.component.html',
  styleUrls: ['./restaurant-manager-menu-detail.component.scss']
})

export class RestaurantManagerMenuDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { menu: Menu | null },
    private flavorService: FlavorService,
    private flavorCategoryService: FlavorCategoryService,
    private menuService: MenuService,
    public dialogRef: MatDialogRef<RestaurantManagerMenuDetailComponent>,
    private authService: AuthService

  ) {
    this.menu = data.menu ? { ...data.menu } : {
      id: -1,
      restaurant: {id: -1, name: '', image: '', restaurantCategory: ''},
      name: '',
      price: 0,
      image: '',
      description: '',
      isAvailable: true,
      menuCategory: '',
      flavors: [],
    };
  }


  menu: Menu;
  flavors: Flavor[] = [];
  selectedFlavorsMap: { [key: number]: boolean } = {};
  flavorCategories: FlavorCategory[] = [];


  ngOnInit(): void {
    this.fetchFlavors();
    this.fetchFlavorCategories();

    if (this.data.menu) {
      this.data.menu.flavors.forEach((flavor) => {
        this.selectedFlavorsMap[flavor.id] = true;
      });
    }
    // console.log('this.selectedFlavorsMap In ngOnInit(): ', this.selectedFlavorsMap);
    // console.log('this.flavorCategories In ngOnInit(): ', this.flavorCategories);
  }


  fetchFlavors(): void {
    const restaurantId = this.authService.user!.restaurant!.id;
    this.flavorService.getFlavorsByRestaurantId(restaurantId).subscribe(
      (flavors) => {
        this.flavors = flavors;
      },
      (error) => {
        console.error('Error fetching flavors:', error);
      }
    );
  }


  fetchFlavorCategories(): void {
    const restaurantId = this.authService.user!.restaurant!.id;
    this.flavorCategoryService
      .getFlavorCategoriesByRestaurantId(restaurantId)
      .subscribe((categories) => {
        this.flavorCategories = categories;
      });
  }


  getFlavorsByCategory(categoryId: number): Flavor[] {
    return this.flavors.filter((flavor) => flavor.flavorCategory.id === categoryId);
  }


  updateSelectedFlavors(flavor: Flavor, isChecked: boolean): void {
    // console.log('this.selectedFlavorsMap In updateSelectedFlavors(): ', this.selectedFlavorsMap);
    // console.log('this.flavorCategories In updateSelectedFlavors(): ', this.flavorCategories);
    this.selectedFlavorsMap[flavor.id] = isChecked;
  }


  saveMenu(): void {
    this.menu.flavors = this.flavors.filter(
      (flavor) => this.selectedFlavorsMap[flavor.id]
    );

    if (this.menu.id !== -1)  {
      this.menuService.updateMenuById(this.menu).subscribe(
        (updatedMenu) => {
          this.dialogRef.close(updatedMenu);
        },
        (error) => {
          console.error('Error updating menu:', error);
        }
      );
    } else {
      this.menu.restaurant = this.authService.user!.restaurant!;
      this.menuService.saveMenu(this.menu).subscribe(
        (newMenu) => {
          this.dialogRef.close(newMenu);
        },
        (error) => {
          console.error('Error saving menu:', error);
        }
      );
    }
  }


  cancel(): void {
    // console.log('this.selectedFlavorsMap In cancel(): ', this.selectedFlavorsMap);
    // console.log('this.flavorCategories In cancel(): ', this.flavorCategories);
    this.dialogRef.close(null);
  }


}
