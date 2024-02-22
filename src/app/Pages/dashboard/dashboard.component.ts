import { Component, OnInit, inject } from '@angular/core';

import { AuthService } from '../shared/auth/services/auth.service';
import { CategoriesService } from '../categories/services/categories.service';
import { Category } from '../categories/model/categories.dto';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { Product } from '../products/model/products.dto';
import { ProductsService } from '../products/services/products.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserDto } from '../shared/auth/dto/user.dto';
import { UsersService } from '../users/services/users.service';
import { navLinks } from '../shared/components/navbar/navlink';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  navLinks = navLinks;
  authService = inject(AuthService);
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  usersService = inject(UsersService);
  users: UserDto[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  chart!: any;

  getCurrentUser() {
    return this.authService.currentUserSignal();
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllUsers();

  }
  getAllProducts() {
    return this.productsService.getAllProducts().subscribe({
      next: (response) => this.products = response
    })
  }
  getAllCategories() {
    return this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.chart = new Chart(
          'canvas',
          {
            type: 'bar',
            data: {
              labels: response.map(response => response.name),
              datasets: [{
                label: 'No. of products',
                backgroundColor: ['#74bcd2', '#090140'],
                data: response.map(response => response.products.length),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          }
        )
      }
    })
  }
  getAllUsers() {
    return this.usersService.getAllUsers().subscribe({
      next: (response) => this.users = response
    })
  }
}
