import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  products: Product[] = [];
  categoryId: number = 1;
  categoryName: string = 'Products';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
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
        this.productService.getCategoryName(this.categoryId).subscribe((name) => {
          this.categoryName = name;
        });
      }
      this.productService.getProductList(this.categoryId).subscribe((data) => {
        this.products = data;
      });
    }

    handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }
}
