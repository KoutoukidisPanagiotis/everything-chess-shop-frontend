import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: 'category/:id', component: ProductGridComponent },
  { path: 'category', component: ProductGridComponent },
  { path: 'products', component: ProductGridComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    CategoryListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
