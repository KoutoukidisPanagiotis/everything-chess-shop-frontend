import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.productService.getCategoryList().subscribe((data) => {
      this.categories = data;
    });
  }
}
