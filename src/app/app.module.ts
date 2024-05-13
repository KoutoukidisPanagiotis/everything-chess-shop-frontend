import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductGridComponent},
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
    CategoryListComponent,
    SearchComponent,
    ProductDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  providers: [ProductService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
