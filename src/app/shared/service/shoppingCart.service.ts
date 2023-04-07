import {Injectable} from "@angular/core";
import {ShoppingCart} from "../model/shoppingCart.model";
import {BehaviorSubject} from "rxjs";
import {Dish} from "../model/dish.model";
import {Flavor} from "../model/flavor.model";

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  private shoppingCart!: ShoppingCart;
  private cartSubject = new BehaviorSubject<ShoppingCart>(this.initializeShoppingCart());

  constructor() {
    this.loadShoppingCart();
  }

  private initializeShoppingCart(): ShoppingCart {
    return {
      id: 1,
      userId: 1,
      totalAmount: 0,
      dishes: [],
    };
  }

  getShoppingCart() {
    return this.cartSubject.asObservable();
  }

  loadShoppingCart() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.shoppingCart = JSON.parse(storedCart);
    } else {
      this.shoppingCart = this.initializeShoppingCart();
    }
    this.cartSubject.next(this.shoppingCart);
  }

  addDishToShoppingCart(dish: Dish) {
    if (!this.shoppingCart) {
      this.shoppingCart = {
        id: 1,
        userId: 1,
        totalAmount: 0,
        dishes: [],
      };
    }
    this.shoppingCart.dishes.push(dish);
    this.shoppingCart.totalAmount += dish.price;
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    this.cartSubject.next(this.shoppingCart);
  }

  deleteDishFromShoppingCart(dish: Dish): void {
    if (!this.shoppingCart) return;
    const dishIndex = this.shoppingCart.dishes.findIndex((dishInCart) => dishInCart.menu === dish.menu && dishInCart.flavors === dish.flavors);
    if (dishIndex !== -1) {
      this.shoppingCart.totalAmount -= this.shoppingCart.dishes[dishIndex].price;
      this.shoppingCart.dishes.splice(dishIndex, 1);
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
      this.cartSubject.next(this.shoppingCart);
    }
  }

  updateDishFlavors(dish: Dish, selectedFlavors: Flavor[]): void {
    dish.flavors = selectedFlavors;
    console.log("here:"+dish);
  }

  clearShoppingCart() {
    localStorage.removeItem('shoppingCart');
    this.shoppingCart = this.initializeShoppingCart();
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    this.cartSubject.next(this.shoppingCart);
  }

}
