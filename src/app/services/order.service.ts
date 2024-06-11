import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/order-dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getOrdersForCurrentUser(): Observable<OrderDto[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<OrderDto[]>(this.apiUrl + '/orders', {
      headers,
      withCredentials: true,
    });
  }

  getOrdersForAdmin(): Observable<OrderDto[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<OrderDto[]>(this.apiUrl + '/admin-orders', {
      headers,
      withCredentials: true,
    });
  }
}
