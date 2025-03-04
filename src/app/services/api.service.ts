import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getCategories() {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(category: string) {
    return this.http.get(`${this.apiUrl}/products/category/${category}`);
  }

  getSortedProducts(order: 'asc' | 'desc' = 'asc', category: string | null) {
    return this.http.get(
      `${this.apiUrl}/products${category ? '/category/' + category + '?' : '?'}sort=${order}`,
    );
  }
}
