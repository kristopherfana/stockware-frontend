import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div
    id="toast-default"
    class="items-center px-5 py-3 bg-black text-white rounded-md shadow text-lg text-center mx-auto max-h-12 z-[1001]"
    [ngClass]="{
      'flex justify-center':
      this.toastService.toastState()=='open',
      hidden: (this.toastService.toastState()=='closed')
    }"
    role="alert"
  >
    <div>
      {{  this.toastService.toastMessage() }}
    </div>
  </div>
`,
  styleUrl: './toaster.component.scss',

})
export class ToasterComponent {
  toastService = inject(ToastService);
}
