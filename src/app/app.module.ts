import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from "./shared/module/custom-style/custom-style.module";
import { HomeComponent } from './home/home.component';
import {RestaurantService} from "./shared/service/restaurant.service";
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import {DishService} from "./shared/service/dish.service";
import {FlavorService} from "./shared/service/flavor.service";
import {FlavorCategoryService} from "./shared/service/flavorCategory.service";
import {MenuService} from "./shared/service/menu.service";
import {ShoppingCartService} from "./shared/service/shoppingCart.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {CurrencyExchangePipe} from "./shared/pipe/currency-exchange.pipe";
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthService} from "./shared/service/auth.service";
import {CurrencyService} from "./shared/service/currency.service";
import {UserService} from "./shared/service/user.service";
import { SuccessComponent } from './success/success.component';
import {OrderService} from "./shared/service/order.service";
import { OrderComponent } from './order/order.component';
import { AccountComponent } from './account/account.component';
import {UserDetailService} from "./shared/service/userDetail.service";
import { WebAdminComponent } from './web-admin/web-admin.component';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RestaurantComponent,
        FooterComponent,
        HomeComponent,
        MenuComponent,
        MenuDetailComponent,
        ShoppingCartComponent,
        CurrencyExchangePipe,
        LoginComponent,
        CheckoutComponent,
        RegisterComponent,
        SuccessComponent,
        OrderComponent,
        AccountComponent,
        WebAdminComponent
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomStyleModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
    ],

    providers: [
        AuthService,
        CurrencyService,
        DishService,
        FlavorService,
        FlavorCategoryService,
        MenuService,
        RestaurantService,
        ShoppingCartService,
        UserService,
        OrderService,
        UserDetailService
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
