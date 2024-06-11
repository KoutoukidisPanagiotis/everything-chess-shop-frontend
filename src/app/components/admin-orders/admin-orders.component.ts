import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/order-dto';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

  orders: OrderDto[];
  isLoading: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrdersForAdmin().subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
    });
  }
}

