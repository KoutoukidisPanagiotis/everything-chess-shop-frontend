import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
 

  constructor(private http: HttpClient, private cartService: CartService) { }

  placeOrder(totalQuantity: number, totalPrice: number, address: any, cartItems: any[]) {
    const orderData = {
      order: {
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
        orderItems: cartItems.map(item => ({
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          product: { id: item.product.id }
        })),
        address: address
      }
    };
  
    return this.http.post(this.purchaseUrl, orderData);
  }
}