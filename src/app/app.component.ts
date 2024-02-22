import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AuthService } from './Pages/shared/auth/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './Pages/shared/components/footer/footer.component';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { NavbarComponent } from './Pages/shared/components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent } from './Pages/shared/components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, FooterComponent, HlmSeparatorModule, ReactiveFormsModule, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  isLoading: boolean = true;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  isDashboardRoute(): boolean {
    return this.router.url === '/dashboard';
  }
  isCategoriesRoute() {
    return this.router.url.match("categories");
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      }
    });
    if (this.authService.isAuthenticated()) {
      const decodedToken = this.authService.getDecodedAccessToken(this.authService.isAuthenticated());
      this.authService.validateUser(decodedToken?.email, decodedToken?.role).subscribe(
        {
          next: (response) => {
            this.authService.currentUserSignal.set(response);
            if (this.activatedRoute.snapshot.firstChild?.data['roles'] && !(this.activatedRoute.snapshot.firstChild?.data['roles'].some((role: string) => role == this.authService.currentUserSignal()?.role))) {
              this.router.navigateByUrl('/home');
            }
          },
          error: () => {
            this.router.navigateByUrl('/home');
          }
        }
      )
    }
  }
}
