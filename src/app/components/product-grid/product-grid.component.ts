import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {

  products: Product[] = [];
  categoryId: number = 1;

  constructor(private productService: ProductService,private route:  ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    } 
    this.productService.getProductList(this.categoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
