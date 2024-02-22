import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { BrnAccordionModule } from '@spartan-ng/ui-accordion-brain';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/model/categories.dto';
import { HlmAccordionModule } from '@spartan-ng/ui-accordion-helm';
import { HlmIconComponent } from '../../../../shared/spartan/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../../../shared/spartan/ui-input-helm/src/lib/hlm-input.directive';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ProductsService } from '../../services/products.service';
import { ToastService } from '../../../shared/components/toaster/service/toast.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [HlmAccordionModule, HlmSeparatorModule, HlmIconComponent, HlmInputDirective, ReactiveFormsModule, InputComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService)
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  categories: Category[] = [];
  createProductForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    cost: new FormControl(''),
    categoryId: new FormControl('')
  })
  image!: File;
  imageUrl!: any;
  showFormEror: { error: string, message: string } | undefined;
  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => this.categories = response
    })
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required,],
      description: [''],
      cost: ['', Validators.required],
      marketing_text: ['Hey'],
      quantity: ['', Validators.required],
      categoryId: [null, Validators.required]
    })
  }
  toastService = inject(ToastService);

  onSubmit() {
    let formData = new FormData;
    formData.append('createdById', `${this.authService.currentUserSignal()?.id}`)
    formData.append('file', this.image);
    for (let control in this.createProductForm.controls) {
      formData.append(control, this.createProductForm.controls[control].value);
    }
    this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        this.authService.currentUserSignal()?.products.push(response);
        this.createProductForm.reset();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onFileSelected(event: Event) {
    this.image = (event!.target as HTMLInputElement).files![0];
    console.log(this.image);
    var reader = new FileReader();
    reader.readAsDataURL(this.image);

    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }
}
