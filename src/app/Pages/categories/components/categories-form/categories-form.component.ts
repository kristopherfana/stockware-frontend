import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { CategoriesService } from '../../services/categories.service';
import { HlmInputDirective } from '../../../../shared/spartan/ui-input-helm/src/lib/hlm-input.directive';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, HlmInputDirective],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss'
})
export class CategoriesFormComponent {
  image!: File;
  categoriesService = inject(CategoriesService);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  onFileSelected(event: Event) {
    this.image = (event!.target as HTMLInputElement).files![0];
  }


  createCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  ngOnInit() {
    this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('name', this.createCategoryForm.get('name')?.value);
    formData.append('createdById', `${this.authService.currentUserSignal()?.id}`)
    if (this.image) {
      formData.append('file', this.image);
    }
    this.categoriesService.createCategory(formData).subscribe()
  }
}
