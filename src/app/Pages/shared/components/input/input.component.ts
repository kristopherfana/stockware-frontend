import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self, inject } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule, ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `<input [value]="value" (input)="onChange(eValue)" (blur)="onTouched()" [placeholder]="placeholder" [type]="type" [formControlName]="formControlNameCust" class="w-full rounded-sm input px-5 py-2.5 border-2 border-black/15 text-lg" [ngClass]="
  formError(formControlNameCust, formGroupCust).length > 0
    ? 'border-red-700'
    : 'border-black/15'
"/>
<p
      *ngIf="formError(formControlNameCust, formGroupCust)"
      class="px-5 text-start text-red-800"
    >
      {{ formError(formControlNameCust, formGroupCust) }}
    </p>
`
  ,
  styleUrl: './input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() formControlNameCust!: string;
  @Input() formGroupCust!: FormGroup;

  element = event?.currentTarget as HTMLInputElement
  eValue = this.element?.value

  value: any = '';

  constructor(@Self()
  @Optional()
  private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  onChange: any = () => { };
  onTouched: any = () => { };
  @Input()
  atributes!: object;

  formError(formControlName: string, formGroup: FormGroup): string[] {
    const formControl = formGroup.get(formControlName);
    let errorMsgList: string[] = [];
    if (formControl?.errors) {
      Object.keys(formControl?.errors).map(error => {
        if ((formControl?.touched || formControl?.dirty) && formControl.invalid) {
          switch (error) {
            case 'required':
              errorMsgList.push(`${formControlName} is required`);
              break;
            case 'minlength':
              errorMsgList.push(`Minimum length is ${formControl.errors?.[error]?.requiredLength} but you provided ${formControl.errors?.[error]?.actualLength}`)
              break;
            case 'email':
              errorMsgList.push(`Please provide valid email format`);
          }
        }
      });
    }
    return errorMsgList;
  }

}
