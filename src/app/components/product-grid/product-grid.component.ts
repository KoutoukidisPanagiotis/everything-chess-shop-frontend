import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [];
  categoryId!: number;
  previousCategoryId: number = 100;
  previousKeyword: string = '';
  categoryName: string = 'Products';

  page: number = 0;
  pageSize: number = 10;
  totalProducts: number = 0;

  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartSevice: CartService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe(() => {
      this.isLoading = true;
      this.listProducts();
    });
  }

  listProducts() {
    const hasKeyword: boolean = this.route.snapshot.paramMap.has('keyword');
    if (hasKeyword) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
      if (this.previousCategoryId != this.categoryId) {
        this.paginator.firstPage();
        this.previousCategoryId = this.categoryId;
      }
      this.productService.getCategoryName(this.categoryId).subscribe((name) => {
        this.categoryName = name;
      });
      this.productService
        .getProductListPaginated(this.categoryId, this.page, this.pageSize)
        .subscribe((data) => {
          this.handleProductData(data);
        });
    } else {
      this.productService
        .getAllProductsPaginated(this.page, this.pageSize)
        .subscribe((data) => {
          this.handleProductData(data);
        });
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.paginator.firstPage();
      this.previousKeyword = theKeyword;
    }

    this.productService
      .searchProductsPaginated(theKeyword, this.page, this.pageSize)
      .subscribe((data) => {
        this.handleProductData(data);
      });
  }

  handlePage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listProducts();
  }

  handleProductData(data: any) {
    this.products = data._embedded.products;
    this.totalProducts = data.page.totalElements;
    this.pageSize = data.page.size;
    this.page = data.page.number;
    this.isLoading = false;
  }

  addToCart(theProduct: Product) {
    const cartItem = new CartItem(theProduct);
    this.cartSevice.addToCart(cartItem);
  }
}
