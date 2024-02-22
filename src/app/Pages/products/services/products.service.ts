import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../model/products.dto';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toaster/service/toast.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  API_URL = 'http://localhost:3000/products';
  toastService = inject(ToastService);

  getAllProducts() {
    return this.httpClient.get<Product[]>(this.API_URL);
  }

  getOneById(id: number) {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(data: FormData) {
    return this.httpClient.post<Product>(this.API_URL, data).pipe(
      tap((response) => {
        this.toastService.showToast(`Product ${response.name} created successfully`);
        this.router.navigateByUrl('products');
      })
    )
  }

  updateProduct(id: number, data: FormData) {
    return this.httpClient.post(`${this.API_URL}/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this.toastService.showToast(`Product ${id} deleted successfully`);
      })
    )
  }
}
