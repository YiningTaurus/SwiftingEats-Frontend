import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {MenuComponent} from "./menu/menu.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {SuccessComponent} from "./success/success.component";
import {OrderComponent} from "./order/order.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {AccountComponent} from "./account/account.component";
import {WebAdminComponent} from "./web-admin/web-admin.component";
import {RestaurantManagerGuard} from "./shared/guard/restaurant-manager.guard";
import {WebAdminGuard} from "./shared/guard/web-admin.guard";

const routes: Routes = [
  { path:'home', component:HomeComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant/:id/menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'web-admin', component: WebAdminComponent, canActivate: [AuthGuard, WebAdminGuard] },
  {
    path: 'restaurant-manager',
    loadChildren: () => import('./restaurant-manager/restaurant-manager.module').then(m => m.RestaurantManagerModule),
    canActivate: [AuthGuard, RestaurantManagerGuard]
  },
  {
    path: 'web-admin',
    loadChildren: () => import('./web-admin/web-admin.module').then(m => m.WebAdminModule),
    canActivate: [AuthGuard, WebAdminGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
