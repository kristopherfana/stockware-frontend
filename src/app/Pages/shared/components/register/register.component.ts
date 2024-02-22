import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { HlmInputDirective } from '../../../../shared/spartan/ui-input-helm/src/lib/hlm-input.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '../input/input.component';
import { Role } from '../../auth/dto/create-user.dto';
import { Router } from '@angular/router';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, HlmInputDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService);
  usersService = inject(UsersService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  profilePicture!: File;
  roles: Array<string> = Object.values(Role);
  @Input() edit: boolean = false;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        role: [null, [Validators.required]]
      }
    )
    if (this.edit) {
      this.editUserForm = this.formBuilder.group({
        email: [this.authService.currentUserSignal()?.email],
        firstName: [this.authService.currentUserSignal()?.firstName],
        lastName: [this.authService.currentUserSignal()?.lastName],
      })
    }
  }
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  editUserForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })
  showAuthEror: { error: string, message: string } | undefined;

  onSubmitRegister() {
    let formData = new FormData();
    if (this.profilePicture) {
      formData.append('file', this.profilePicture)
    }
    for (let control in this.registerForm.controls) {
      formData.append(control, this.registerForm.controls[control].value);
    }
    this.authService.register(formData).subscribe({
      next: () => {
        this.registerForm.reset();
        this.showAuthEror = undefined;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.showAuthEror = { error: error.statusText, message: error.error?.message }
      }
    })
  }
  onSubmitEdit() {
    this.usersService.updateUser(this.editUserForm.value, this.authService.currentUserSignal()?.id).subscribe()
  }

  onFileSelected(event: Event) {
    this.profilePicture = (event!.target as HTMLInputElement).files![0];
  }

}
