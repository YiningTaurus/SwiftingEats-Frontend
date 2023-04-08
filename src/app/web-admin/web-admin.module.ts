import {RouterModule, Routes} from "@angular/router";
import {WebAdminComponent} from "./web-admin.component";
import {AddRestaurantManagerComponent} from "./add-restaurant-manager/add-restaurant-manager.component";
import {ViewAllUsersComponent} from "./view-all-users/view-all-users.component";
import {CommonModule} from "@angular/common";
import {CustomStyleModule} from "../shared/module/custom-style/custom-style.module";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";


const routes: Routes = [
  {
    path: '',
    component: WebAdminComponent,
    children: [
      { path: 'view-all-users', component: ViewAllUsersComponent },
      { path: 'add-restaurant-manager', component: AddRestaurantManagerComponent },
      { path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  declarations: [
    WebAdminComponent,
    ViewAllUsersComponent,
    AddRestaurantManagerComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CustomStyleModule,
        ReactiveFormsModule,
        MatTabsModule,
    ]
})

export class WebAdminModule{}
