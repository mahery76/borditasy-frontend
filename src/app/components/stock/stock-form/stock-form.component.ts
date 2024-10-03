import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stocks/stock.service';
import { Stock } from '../../../models/stocks/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;

  constructor(private fb: FormBuilder, private stockService: StockService, private router: Router) {
    this.stockForm = this.fb.group({
      designation_depense: ['', Validators.required],
      quantite_stock: ['', Validators.required],
      prix_achat_dep: ['', Validators.required],
      prix_vente: [''],
      produit: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.stockForm.valid) {
      const newStock: Stock = this.stockForm.value;
      this.stockService.addStock(newStock).subscribe(response => {
        console.log('Stock added:', response);
        this.stockForm.reset();
        this.router.navigate(['/list_stock']);
      });
    } else {
      console.log('Form is not valid. Current values:', this.stockForm.value);
    }
  }
}
