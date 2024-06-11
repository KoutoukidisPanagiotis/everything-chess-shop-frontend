import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/order-dto';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: OrderDto[];
  isLoading: boolean = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrdersForCurrentUser().subscribe((orders) => {
      this.orders = orders;
      this.isLoading = false;
    });
  }
}
