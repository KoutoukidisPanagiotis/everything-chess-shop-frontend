import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject(0);

  storage: Storage = sessionStorage;

  constructor() {
    this.loadCartItems();
  }

  loadCartItems() {
    let storedCart = JSON.parse(this.storage.getItem('cartItems'));

    if (storedCart) {
      this.cartItems = storedCart;
      this.computeCartTotals();
    }
  }

  saveCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(item: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === item.id
      );

      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(item);
    }

    // Compute cart totals whenever an item is added
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // Publish the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.saveCartItems();
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;

    if (item.quantity === 0) {
      this.remove(item);
    }
    this.computeCartTotals();
  }

  remove(item: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === item.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.computeCartTotals();
  }

  clearCart() {
    this.cartItems = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
    this.saveCartItems();
  }
  getCartItems() {
    return this.cartItems;
  }
}
