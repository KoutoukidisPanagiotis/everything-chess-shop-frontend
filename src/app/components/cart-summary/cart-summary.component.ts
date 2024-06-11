import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartSummary();
  }

  updateCartSummary() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
