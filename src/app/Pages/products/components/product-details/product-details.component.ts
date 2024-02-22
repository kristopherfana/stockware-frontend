import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { HlmAccordionContentDirective, HlmAccordionDirective, HlmAccordionIconDirective, HlmAccordionItemDirective, HlmAccordionModule, HlmAccordionTriggerDirective } from '@spartan-ng/ui-accordion-helm';

import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import { CommonModule } from '@angular/common';
import { HlmIconComponent } from '../../../../shared/spartan/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../model/products.dto';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HlmSeparatorModule, CommonModule],

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productId!: number;
  product!: Product;


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (isNaN(+params['id'])) { this.router.navigateByUrl('not-found') } else {
          this.productId = params['id'];
        }
      }
    )
    if (this.productId) {

      this.productsService.getOneById(this.productId).subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 404) this.router.navigateByUrl('/not-found');
        }
      })
    }
  }

}
