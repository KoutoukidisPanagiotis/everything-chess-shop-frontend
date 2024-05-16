import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  // Subjects to hold the total price and quantity
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(item: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === item.id);

      alreadyExistsInCart = (existingCartItem != undefined);
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
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;

    if (item.quantity === 0) {
      this.remove(item);
    }

    // Compute cart totals whenever an item is removed
    this.computeCartTotals();
  }

  remove(item: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === item.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    // Compute cart totals whenever an item is removed
    this.computeCartTotals();
  }
}