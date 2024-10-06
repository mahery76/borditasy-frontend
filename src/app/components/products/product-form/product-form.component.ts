import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../models/products/product.model';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      nom_produit: ['', Validators.required],
      quantite_minimum: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(response => {
        console.log('Product added:', response);
        this.productForm.reset();
        this.router.navigate(['/list_product']);
      });
    }
  }
}
