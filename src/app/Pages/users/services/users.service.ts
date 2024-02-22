import { Injectable, inject } from '@angular/core';

import { AuthService } from '../../shared/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toaster/service/toast.service';
import { UserDto } from '../../shared/auth/dto/user.dto';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);
  API_URL = 'http://localhost:3000/users'
  toastService = inject(ToastService);
  authService = inject(AuthService);
  router = inject(Router);

  getAllUsers() {
    return this.httpClient.get<UserDto[]>(`${this.API_URL}`)
  }

  getUserById(id: number) {
    return this.httpClient.get<UserDto>(`${this.API_URL}/${id}`);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this.toastService.showToast(`User deleted successfully`);
        this.router.navigateByUrl('users');
      })
    )
  }

  updateUser(data: any, id?: number) {
    return this.httpClient.patch<UserDto>(`${this.API_URL}/${id}`, data).pipe(
      tap((response) => {
        this.authService.currentUserSignal.set(response);
        this.toastService.showToast("Edited successfully");
        window.location.reload();
      })
    )
  }
}
