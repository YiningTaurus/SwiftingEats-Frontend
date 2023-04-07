import {RouterModule, Routes} from "@angular/router";
import {RestaurantManagerComponent} from "./restaurant-manager.component";
import {RestaurantManagerFlavorComponent} from "./restaurant-manager-flavor/restaurant-manager-flavor.component";
import {RestaurantManagerMenuComponent} from "./restaurant-manager-menu/restaurant-manager-menu.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomStyleModule} from "../shared/module/custom-style/custom-style.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { RestaurantManagerMenuDetailComponent } from './restaurant-manager-menu-detail/restaurant-manager-menu-detail.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import { RestaurantManagerOrderComponent } from './restaurant-manager-order/restaurant-manager-order.component';
import {OrderFilterPipe} from "../shared/pipe/order-filter.pipe";

const routes: Routes = [
  {
    path: '',
    component: RestaurantManagerComponent,
    children: [
      { path: 'restaurant-manager-flavor', component: RestaurantManagerFlavorComponent },
      { path: 'restaurant-manager-menu', component: RestaurantManagerMenuComponent },
      { path: 'restaurant-manager-order', component: RestaurantManagerOrderComponent },
      { path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  declarations: [
    RestaurantManagerComponent,
    RestaurantManagerFlavorComponent,
    RestaurantManagerMenuComponent,
    RestaurantManagerMenuDetailComponent,
    RestaurantManagerOrderComponent,
    OrderFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomStyleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
  ]
})

export class RestaurantManagerModule{}
