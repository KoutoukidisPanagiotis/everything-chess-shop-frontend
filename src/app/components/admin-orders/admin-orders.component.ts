import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/order-dto';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

  orders: OrderDto[];
  isLoading: boolean = true;
  orderForm: FormGroup;
  statuses = ['PROCESSING','SHIPPED', 'COMPLETED', 'CANCELLED'];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrdersForAdmin().subscribe(orders => {
      this.orders = orders;
      this.orderForm = new FormGroup({
        status: new FormControl("")
      });
      this.isLoading = false;
    });
  }

  changeOrderStatus(order) {
    const newStatus = this.orderForm.get('status').value;
    this.orderService.updateOrderStatus(order.orderTrackingNumber, newStatus)
      .subscribe({
        next: response => {
          if (response) {
            const updatedOrder = JSON.parse(response);
            const index = this.orders.findIndex(o => o.orderTrackingNumber === updatedOrder.orderTrackingNumber);
            if (index !== -1) {
              this.orders[index] = updatedOrder;
            }
          }
        },
        error: error => {
          console.error('There was an error updating the order status', error);
        }
      });
  }
}

