import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stocks/stock.service';
import { ProductService } from '../../../services/products/product.service'; // Import ProductService
import { Stock } from '../../../models/stocks/stock';
import { Product } from 'app/models/products/product.model';  // Import Product model
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;
  products: Product[] = []; // Add products array

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private productService: ProductService, // Inject ProductService
    private router: Router
  ) {
    this.stockForm = this.fb.group({
      designation_depense: ['', Validators.required],
      quantite_stock: ['', Validators.required],
      prix_achat_dep: ['', Validators.required],
      prix_vente: [''],
      produit: ['', Validators.required] // Make produit required
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // Load products on init
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      const formValue = this.stockForm.value;
      // const selectedProduct = {} as Product;
      // selectedProduct.id= formValue.produit;
      // const newStock: Stock = {
      //   ...formValue,
      //   produit: selectedProduct // Assign the entire Product object
      // };
      console.log('Stock to be added:', formValue);
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
