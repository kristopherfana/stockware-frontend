import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastState = signal<"open" | "closed">("closed");
  toastMessage = signal<string | undefined>(undefined);

  showToast(message: string) {
    this.toastMessage.set(message);
    this.toastState.set("open");
    setTimeout(() => {
      this.toastState.set("closed");
    }, 1500);
  }
}
