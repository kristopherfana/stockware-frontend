import { AuthGuard } from './Pages/shared/auth/guard/auth.guard';
import { CategoriesComponent } from './Pages/categories/categories/categories.component';
import { CategoriesFormComponent } from './Pages/categories/components/categories-form/categories-form.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { ProductDetailsComponent } from './Pages/products/components/product-details/product-details.component';
import { ProductFormComponent } from './Pages/products/components/product-form/product-form.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ProfileComponent } from './Pages/users/components/profile/profile.component';
import { Role } from './Pages/shared/auth/dto/create-user.dto';
import { Routes } from '@angular/router';
import { UsersComponent } from './Pages/users/users.component';

export const routes: Routes = [
    {
        path: 'products',
        data: {
            authRequired: true,
        },
        children: [
            { path: '', component: ProductsComponent },
            { path: 'create', component: ProductFormComponent, canActivate: [AuthGuard] },
            { path: ':id', component: ProductDetailsComponent },
            { path: ':id/edit', component: ProductFormComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: 'categories',
        data: {
            authRequired: true,
        },
        children: [
            { path: '', component: CategoriesComponent },
        ]
    },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    },
    {
        path: 'users', component: UsersComponent, canActivate: [AuthGuard],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];
