import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { accountLinks, navLinks } from './navlink';

import { AuthService } from '../../auth/services/auth.service';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnSheetImports } from '@spartan-ng/ui-sheet-brain';
import { HlmDialogComponent } from '../../../../shared/spartan/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '../../../../shared/spartan/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HlmSheetImports } from '@spartan-ng/ui-sheet-helm';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '../input/input.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UserDto } from '../../auth/dto/user.dto';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterLink, BrnSheetImports, HlmSheetImports, HlmSeparatorModule, RouterLinkActive, BrnDialogModule, HlmDialogComponent, HlmDialogModule, HlmMenuModule, HlmIconComponent, BrnMenuTriggerDirective, ReactiveFormsModule, CommonModule, InputComponent, RegisterComponent, LoginComponent]
})
export class NavbarComponent {
  navLinks = navLinks;
  accountLinks = accountLinks;
  loginState = signal<"open" | "closed">("closed");
  registerState = signal<"open" | "closed">("closed");
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  localStorage?: Storage;
  router = inject(Router);
  showAuthToast: { message: string } | undefined;
  showAuthEror: { error: string, message: string } | undefined;
  currentUser = this.authService.currentUserSignal();
  @ViewChildren('dialogs') dialogs!: QueryList<HlmDialogComponent>;

  errorMsgList: any = [];

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {

    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,]],
      }
    );
  }

  onSubmitLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (response: { token: string, user: UserDto, status: any }) => {
          this.showAuthEror = undefined;
          if (response.token) {
            this.closeDialog(this.dialogs)
          }
        },
        error: (error: HttpErrorResponse) => {
          this.showAuthEror = { error: error.statusText, message: error.error?.message }
        }
      }
    )
  }
  showAuth(message: string) {
    this.showAuthToast = { message: message };
    setTimeout(() => {
      this.showAuthToast = undefined
    }, 2000)
  }
  login(response: { token: string, user: UserDto, status: any }) {
    this.router.navigateByUrl('/profile');
    this.showAuth(response.status.message);
  }
  closeDialog(dialogs: QueryList<HlmDialogComponent>) {
    dialogs.forEach(
      (dialog) => {
        this.loginState.set("closed")
        dialog.newState = this.loginState();
      }
    )
  }

  logout() {
    this.authService.logout();
  }

}
