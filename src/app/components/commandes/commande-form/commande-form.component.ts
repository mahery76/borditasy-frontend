import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactureService } from 'app/services/factures/facture.service'; 
import { Facture } from 'app/models/commandes/facture';
import { Commande } from 'app/models/commandes/commande';
import { Product } from 'app/models/products/product.model';
import { ProductService } from 'app/services/products/product.service';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss']
})
export class CommandeFormComponent implements OnInit {
  commandeForm: FormGroup;
  commandes: Commande[] = [];
  argentARendre: number = 1000; // Example value
  products: Product[] = []; // Add products array
  

  constructor(private fb: FormBuilder, private factureService: FactureService, private productService: ProductService,) {
    this.commandeForm = this.fb.group({
      produit: ['', Validators.required],
      quantite: ['', Validators.required],
      argent_recu: ['', Validators.required]
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

  addCommande() {
    const formValue = this.commandeForm.value;
    const commande: Commande = {
      produit: formValue.produit, // Assuming this is the product ID
      qte_produit: formValue.quantite
    };
    this.commandes.push(commande);
  }

  onSubmit() {
    if (this.commandeForm.valid) {
      const facture: Facture = {
        est_payee: false,
        commandes: this.commandes
      };

      this.factureService.addFacture(facture).subscribe(response => {
        console.log('Facture added:', response);
        this.commandeForm.reset();
        this.commandes = [];
      });
    }
  }
}
