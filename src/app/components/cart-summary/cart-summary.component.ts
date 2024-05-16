import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {

  // totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartSummary();
  }

  updateCartSummary() {
    // // Subscribe to the cart totalPrice and totalQuantity
    // this.cartService.totalPrice.subscribe(
    //   data => this.totalPrice = data
    // );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
