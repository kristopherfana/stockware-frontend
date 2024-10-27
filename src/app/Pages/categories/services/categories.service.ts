import { Injectable, inject } from '@angular/core';

import { Category } from '../model/categories.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toaster/service/toast.service';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  httpClient = inject(HttpClient);
  API_URL = `${environment.apiUrl}/categories`;
  toastService = inject(ToastService);
  router = inject(Router);

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.API_URL}`);
  }

  getCategoryById(id: number) {
    return this.httpClient.get<Category>(`${this.API_URL}/${id}`);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }

  createCategory(data: FormData) {
    return this.httpClient.post<Category>(`${this.API_URL}`, data).pipe(
      tap((response) => {
        this.toastService.showToast(`Category ${response.name} created successfully`);
        this.router.navigateByUrl('categories');
      })
    );
  }
}
