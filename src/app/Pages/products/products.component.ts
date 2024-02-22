import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Signal, ViewChildren, inject, signal } from '@angular/core';
import { BrnMenuModule, BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmAlertDialogComponent, HlmAlertDialogModule } from '@spartan-ng/ui-alertdialog-helm';
import { RouterLink, RouterModule } from '@angular/router';

import { AuthService } from '../shared/auth/services/auth.service';
import { BrnAlertDialogModule } from '@spartan-ng/ui-alertdialog-brain';
import { CommonModule } from '@angular/common';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HlmSkeletonModule } from '@spartan-ng/ui-skeleton-helm';
import { Product } from './model/products.dto';
import { ProductsService } from './services/products.service';
import { ToastService } from '../shared/components/toaster/service/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, HlmSkeletonModule, CommonModule, HlmSeparatorModule, BrnMenuTriggerDirective, HlmMenuModule, BrnAlertDialogModule, HlmAlertDialogModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit, OnInit {
  @ViewChildren("images") imageRef!: QueryList<ElementRef<HTMLImageElement>>;
  imageLoaded = signal(false);
  @ViewChildren("parent") parents!: QueryList<ElementRef<HTMLElement>>;
  productList: Product[] = [];
  state = signal<"open" | "closed">("closed");
  @ViewChildren("dialogs") dialogs!: QueryList<HlmAlertDialogComponent>;
  productsService = inject(ProductsService);
  authService = inject(AuthService)
  toastService = inject(ToastService);


  revert() {
    this.parents.forEach((parent) => {
      parent.nativeElement.classList.add("bg-zinc-50")
    })
  }
  changeToGray() {
    this.parents.forEach((parent) => {
      parent.nativeElement.classList.remove("bg-zinc-50")
    })
  }

  ngAfterViewInit(): void {
    this.imageRef.changes.subscribe(() => {
      this.checkImageLoadStatus();
    });

    this.checkImageLoadStatus();

  }

  private checkImageLoadStatus(): void {
    this.imageRef.toArray().forEach((image) => {
      if (!image.nativeElement.complete) {
        image.nativeElement.addEventListener("load",
          () => {
            setTimeout(() => this.imageLoaded.set(true), 1000)
          }
        )
      }
      else {
        this.imageLoaded.set(true)
      }
    });
  }

  toggleDialogByName(state: "open" | "closed", id?: number) {
    this.dialogs.toArray().forEach((dialog) => {
      if (id == dialog?._contentTemplate?.elementRef.nativeElement.parentNode.id) {
        dialog.newState = state;
      }
    })
  }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe(
      (response) => {
        this.productList = response
      }
    )
  }

  deleteProduct(id?: number) {
    if (id) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.toastService.showToast('Product deleted successfully');
          this.getAllProducts();
        }
      })
    }
  }
}