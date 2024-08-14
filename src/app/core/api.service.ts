import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Sold } from './types/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/api/v1';

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getPedidos(): Observable<Sold[]> {
    return this.http.get<Sold[]>(`${this.apiUrl}/solds/`);
  }

  getTotalPedidos(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/solds/total`);
  }

  getTotalProductos(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/solds/total/products`);
  }

  getNuevosClientes(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/clients/count`);
  }
}
