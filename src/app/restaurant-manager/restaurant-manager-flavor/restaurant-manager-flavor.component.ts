import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../shared/service/restaurant.service";
import {MenuService} from "../../shared/service/menu.service";
import {FlavorService} from "../../shared/service/flavor.service";
import {FlavorCategoryService} from "../../shared/service/flavorCategory.service";
import {AuthService} from "../../shared/service/auth.service";
import {Restaurant} from "../../shared/model/restaurant.model";
import {Flavor} from "../../shared/model/flavor.model";
import {FlavorCategory} from "../../shared/model/flavorCategory.model";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-restaurant-manager-flavor',
  templateUrl: './restaurant-manager-flavor.component.html',
  styleUrls: ['./restaurant-manager-flavor.component.scss']
})

export class RestaurantManagerFlavorComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private flavorService: FlavorService,
    private flavorCategoryService: FlavorCategoryService,
    private authService: AuthService
  ) { }

  restaurant!: Restaurant;
  flavors: Flavor[] = [];
  flavorCategories: FlavorCategory[] = [];
  editingFlavorId: number | null = null;
  editingFlavorCategoryId: number | null = null;
  addingFlavorCategoryId: number | null = null;
  newFlavorInfo: string | null = null;
  newFlavorPrice: number | null = null;
  newCategory: FlavorCategory = {
    id: -1,
    type: '',
    isSingleton: false,
    isMandatory: false,
    restaurantId: -1
  };


  ngOnInit(): void {
    if (this.authService.user && this.authService.user['id']) {
      console.log('User:', this.authService.user);
      this.restaurant = this.authService.user.restaurant!;
    }
    this.getAllFlavors();
    this.getAllFlavorCategories();
    console.log('Flavors:', this.flavors);
    console.log('Flavor Categories:', this.flavorCategories);
  }


  getAllFlavors(): void {
    this.flavorService.getFlavorsByRestaurantId(this.restaurant.id).subscribe((flavors) => {
      if(flavors !== null && flavors !== undefined){
        this.flavors = flavors;
      }
    });
  }


  getAllFlavorCategories(): void {
    this.flavorCategoryService.getFlavorCategoriesByRestaurantId(this.restaurant.id).subscribe((flavorCategories) => {
      this.flavorCategories = flavorCategories;
      console.log('Flavor Categories inside getAllFlavorCategories():', this.flavorCategories);
    });
  }


  getFlavorsByCategory(category: FlavorCategory): Flavor[] {
    return this.flavors.filter(flavor => flavor.flavorCategory.id === category.id);
  }


  deleteFlavor(flavorId: number): void {
    this.flavorService.deleteFlavorById(flavorId).pipe(
      tap(() => {
        this.flavors = this.flavors.filter(flavor => flavor.id !== flavorId);
      }),
      catchError((error) => {
        console.error(error);
        alert('Deletion failed: Flavor is in use.');
        return throwError(error);
      })
    ).subscribe();
  }


  startEditingFlavor(flavorId: number): void {
    this.editingFlavorId = flavorId;
  }


  updateFlavorByIdAndStopEditing(flavor: Flavor): void {
    this.flavorService.updateFlavorById(flavor).subscribe((updatedFlavor) => {
      const index = this.flavors.findIndex((f) => f.id === updatedFlavor.id);
      if (index !== -1) {
        this.flavors[index] = updatedFlavor;
      }
    });
    this.editingFlavorId = null;
  }


  startAddingFlavor(categoryId: number): void {
    this.addingFlavorCategoryId = categoryId;
  }


  cancelAddingFlavor(): void {
    this.addingFlavorCategoryId = null;
    this.newFlavorInfo = null;
    this.newFlavorPrice = null;
  }


  addFlavorInCategory(category: FlavorCategory): void {
    if (!this.newFlavorInfo || this.newFlavorPrice === null) {
      return;
    }
    const newFlavor: Partial<Flavor> = {
      id: -1,
      info: this.newFlavorInfo,
      price: this.newFlavorPrice,
      flavorCategory: category,
      restaurantId: category.restaurantId
    };

    this.flavorService.saveFlavor(newFlavor as Flavor).subscribe((createdFlavor) => {
      const updatedFlavor = {
        ...createdFlavor,
        flavorCategory: {
          id: category.id,
          type: category.type,
          isSingleton: category.isSingleton,
          isMandatory: category.isMandatory,
          restaurantId: category.restaurantId
        },
      };
      console.log(updatedFlavor);
      this.flavors.push(updatedFlavor);
      this.cancelAddingFlavor();
    });
  }


  startEditingFlavorCategory(categoryId: number): void {
    this.editingFlavorCategoryId = categoryId;
  }


  cancelEditingFlavorCategory(): void {
    this.editingFlavorCategoryId = null;
  }


  updateFlavorCategoryAndStopEditing(category: FlavorCategory): void {
    this.flavorCategoryService.updateFlavorCategoryById(category).subscribe((updatedCategory) => {
      const index = this.flavorCategories.findIndex((c) => c.id === updatedCategory.id);
      if (index !== -1) {
        this.flavorCategories[index] = updatedCategory;
      }
    });
    this.editingFlavorCategoryId = null;
    console.log("isSingleton, ", category.isSingleton);
    console.log("isMandatory, ", category.isMandatory);
  }


  deleteFlavorCategory(category: FlavorCategory): void {
    const confirmation = confirm('Deleting a flavor category is not recommended. Are you sure you want to delete it?');
    if (confirmation) {
      this.flavorCategoryService.deleteFlavorCategoryById(category.id).subscribe(
        () => {
          this.flavors = this.flavors.filter((flavor) => flavor.flavorCategory.id !== category.id);
          this.flavorCategories = this.flavorCategories.filter((cat) => cat.id !== category.id);
        },
        (error) => {
          alert('Deletion failed: Flavor Category is in use.');
          console.error('Error deleting flavor category:', error);
        }
      );
    }
  }



  addFlavorCategory(): void {
    this.newCategory.restaurantId = this.restaurant.id;
    this.flavorCategoryService.saveFlavorCategory(this.newCategory).subscribe((createdCategory) => {
      this.flavorCategories.push(createdCategory);
    });
    this.resetNewCategory();
    console.log("In addFlavorCategory: " + this.newCategory.type);
  }


  cancelAddingFlavorCategory(): void {
    this.resetNewCategory();
  }


  resetNewCategory(): void {
    this.newCategory = {
      id: -1,
      type: '',
      isSingleton: false,
      isMandatory: false,
      restaurantId: -1
    };
  }


}
