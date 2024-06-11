import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    CategoryListComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartSummaryComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    LoginComponent,
    OrderComponent,
    AdminOrdersComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi: true},ProductService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
