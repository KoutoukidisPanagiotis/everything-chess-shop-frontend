import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      shippingDetails: this.formBuilder.group({
        city: ['', Validators.required],
        address: ['', Validators.required],
        zipCode: ['', Validators.required],
        doorName: [''],
      }),
    });
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  
    // Get the total quantity and total price from the cartService
    const totalQuantity = this.cartService.totalQuantity.value;
    const totalPrice = this.cartService.totalPrice.value;
  
    // Get the address details from the form
    const address = this.checkoutFormGroup.get('shippingDetails').value;
  
    // Get the cart items from the cartService
    const cartItems = this.cartService.getCartItems().map(item => ({
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      product: { id: item.id }
    }));
  
    // Call the placeOrder method from your service
    this.checkoutService.placeOrder(totalQuantity, totalPrice, address, cartItems)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.cartService.clearCart();
          this.router.navigate(['/order-confirmation']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  isLoggedIn(): boolean{
    return this.authService.isAuthenticated();
  }
}



