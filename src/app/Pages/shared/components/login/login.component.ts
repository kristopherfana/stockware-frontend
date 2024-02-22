import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '../input/input.component';
import { UserDto } from '../../auth/dto/user.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  showAuthEror: { error: string, message: string } | undefined;

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
        error: (error: HttpErrorResponse) => {
          this.showAuthEror = { error: error.statusText, message: error.error?.message }
        }
      }
    )
  }
}
