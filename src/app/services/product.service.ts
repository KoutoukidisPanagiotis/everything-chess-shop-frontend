import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  private searchUrl = 'http://localhost:8080/api/products/search/findByNameContaining?name=';

  constructor(private httpClient: HttpClient) { }





  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.searchUrl + keyword).pipe(
      map(response => response._embedded.products)
    );
  }

  getCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
  getCategoryName(categoryId: number): Observable<string> {
    const searchUrl = `${this.categoryUrl}/${categoryId}`;
    return this.httpClient.get<ProductCategory>(searchUrl).pipe(
      map(response => response.categoryName)
    );
  }
}





interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}