import { Component, OnInit, inject } from '@angular/core';

import { AuthService } from '../../shared/auth/services/auth.service';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { CategoriesFormComponent } from '../components/categories-form/categories-form.component';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../model/categories.dto';
import { CommonModule } from '@angular/common';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HlmSkeletonModule } from '@spartan-ng/ui-skeleton-helm';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, HlmSkeletonModule, HlmSeparatorModule, CommonModule, HlmDialogModule, CategoriesFormComponent, BrnDialogModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoriesService = inject(CategoriesService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => this.categories = response
    })
  }

}
