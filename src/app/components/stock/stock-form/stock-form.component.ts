import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stocks/stock.service';
import { ProductService } from '../../../services/products/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/products/product.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {
    this.stockForm = this.fb.group({
      quantite_stock: ['', Validators.required],
      prix_achat_dep: ['', Validators.required],
      prix_vente: [''],
      produit: ['', Validators.required] // Make produit required
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      if (params['produit']) {
        this.stockForm.patchValue({
          produit: params['produit'],
          prix_achat_dep: params['prix_achat'],
          prix_vente: params['prix_vente']
        });
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      const formValue = this.stockForm.value;
      this.stockService.addStock(formValue).subscribe(response => {
        console.log('Stock added:', response);
        this.stockForm.reset();
        this.router.navigate(['/list_stock']);
      });
    } else {
      console.log('Form is not valid. Current values:', this.stockForm.value);
    }
  }
}
