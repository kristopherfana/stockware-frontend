import { Component, inject } from '@angular/core';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { BrnTabsModule } from '@spartan-ng/ui-tabs-brain';
import { Category } from '../../../categories/model/categories.dto';
import { CommonModule } from '@angular/common';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HlmTabsListComponent } from '../../../../shared/spartan/ui-tabs-helm/src/lib/hlm-tabs-list.component';
import { HlmTabsModule } from '@spartan-ng/ui-tabs-helm';
import { Product } from '../../../products/model/products.dto';
import { ProductsService } from '../../../products/services/products.service';
import { RegisterComponent } from '../../../shared/components/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HlmSeparatorModule, BrnTabsModule, HlmTabsListComponent, HlmTabsModule, CommonModule, RouterModule, HlmDialogModule, BrnDialogModule, RegisterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);
  products?: Product[];
  categories?: Category[];

  getCurrentUser() {
    return this.authService.currentUserSignal();
  }

  ngOnInit() {
  }

  getAllProducts() {
    return this.authService.currentUserSignal()?.products;
  }
  getAllCategories() {
    return this.authService.currentUserSignal()?.categories;
  }
}
