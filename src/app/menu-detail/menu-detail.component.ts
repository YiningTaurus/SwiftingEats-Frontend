import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../shared/model/menu.model";
import {Flavor} from "../shared/model/flavor.model";
import {CurrencyService} from "../shared/service/currency.service";
import {Dish} from "../shared/model/dish.model";

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})

export class MenuDetailComponent {
  selectedFlavors: Flavor[] = [];
  sameCategoryFlavors: { [flavorCategoryId: number]: Flavor[] } = {};
  @Input() currentDish: Dish | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {menu: Menu, isEdit: boolean},
    public currencyService: CurrencyService,
    private dialogRef: MatDialogRef<MenuDetailComponent>
  ) {
    this.sameCategoryFlavors = this.groupFlavorsByCategory(data.menu.flavors);
    if (this.currentDish) {
      this.selectedFlavors = this.currentDish.flavors.slice();
    }
  }


  groupFlavorsByCategory(flavors: Flavor[] | undefined): { [flavorCategoryId: number]: Flavor[] } {
    const groupedFlavors: { [flavorCategoryId: number]: Flavor[] } = {};
    if (flavors) {
      flavors.forEach((flavor) => {
        const flavorCategoryId = flavor.flavorCategory.id;
        if (!groupedFlavors[flavorCategoryId]) {
          groupedFlavors[flavorCategoryId] = [];
        }
        groupedFlavors[flavorCategoryId].push(flavor);
      });
    }
    return groupedFlavors;
  }


  toggleFlavorSelection(flavor: Flavor, selected: boolean): void {
    const flavorIndex = this.selectedFlavors.findIndex((selectedFlavor) => selectedFlavor.id === flavor.id);

    if (selected && flavorIndex === -1) {
      this.selectedFlavors.push(flavor);
    } else if (!selected && flavorIndex !== -1) {
      this.selectedFlavors.splice(flavorIndex, 1);
    }
  }


  onCheckboxChange(event: Event, flavor: Flavor) {
    const target = event.target as HTMLInputElement;
    this.toggleFlavorSelection(flavor, target.checked);
  }


  onRadioChange(event: Event, flavor: Flavor) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedFlavors = this.selectedFlavors.filter(
        (selectedFlavor) => selectedFlavor.flavorCategory.id !== flavor.flavorCategory.id,
      );
      this.selectedFlavors.push(flavor);
    }
  }

  castToFlavorArray(value: any): Flavor[] {
    return value as Flavor[];
  }


  isAllMandatoryFlavorsSelected(): boolean {
    const mandatoryCategories = Object.values(this.sameCategoryFlavors)
      .flat()
      .filter((flavor) => flavor.flavorCategory.isMandatory)
      .map((flavor) => flavor.flavorCategory.id);

    const uniqueMandatoryCategories = [...new Set(mandatoryCategories)];
    const selectedMandatoryCategories = this.selectedFlavors
      .filter((flavor) => flavor.flavorCategory.isMandatory)
      .map((flavor) => flavor.flavorCategory.id);

    return uniqueMandatoryCategories.every((categoryId) =>
      selectedMandatoryCategories.includes(categoryId)
    );
  }

  addToCart(): void {
    if (this.isAllMandatoryFlavorsSelected()) {
      // Close the dialog and return the selected flavors
      this.dialogRef.close(this.selectedFlavors);
    } else {
      alert("Please choose the mandatory flavor(s)! It will help us better understand your taste~");
    }
  }

}
