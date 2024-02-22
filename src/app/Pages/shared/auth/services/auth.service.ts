import * as jwt_decode from "jwt-decode";

import { Injectable, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Router } from "@angular/router";
import { ToastService } from "../../components/toaster/service/toast.service";
import { UserDto } from '../dto/user.dto';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000/auth'
  httpClient = inject(HttpClient);
  currentUserSignal = signal<UserDto | undefined | null>(undefined);
  router = inject(Router);
  toastService = inject(ToastService);

  constructor() { }

  login(loginDto: LoginDto) {
    return this.httpClient.post<any>(`${this.API_URL}/login`, loginDto
    ).pipe(
      tap((response: any) => {
        localStorage.setItem('Token', response?.token);
        this.currentUserSignal.set(response?.user);
        this.toastService.showToast(`Authenticated as ${response.user.email}`)
        this.router.navigateByUrl('profile');
      })
    )
  }

  register(data: any) {
    return this.httpClient.post<any>(
      `${this.API_URL}/register`,
      data
    ).pipe(
      tap((response: any) => {
        console.log(response);
        if (response?.success) {
          this.toastService.showToast(`${response?.message}`)
          this.router.navigateByUrl('home');
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('Token');
    this.currentUserSignal.set(null);
    this.toastService.showToast(`Logout successful`)
    this.router.navigateByUrl("/home")
  }

  isAuthenticated() {
    return localStorage.getItem('Token');
  }

  validateUser(email: string, password: string) {
    return this.httpClient.post<UserDto>(`${this.API_URL}/validate-user`, { email: email, password: password })
  }

  getDecodedAccessToken(token: string | null): any {
    if (!token) return null;
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

}
