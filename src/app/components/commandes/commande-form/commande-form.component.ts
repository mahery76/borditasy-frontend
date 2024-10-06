import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactureService } from 'app/services/factures/facture.service'; 
import { Facture } from 'app/models/commandes/facture';
import { Commande } from 'app/models/commandes/commande';
import { Product } from 'app/models/products/product.model';
import { ProductService } from 'app/services/products/product.service';
import { Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss']
})
export class CommandeFormComponent implements OnInit, OnDestroy {
  commandeForm: FormGroup;
  commandes: Commande[] = [];
  argentARendre: number = 1000; // Example value
  products: Product[] = []; // Add products array
  totalMontant: number = 0; // Add a property to hold the total amount
  private subscription: Subscription = new Subscription(); // Add subscription property

  constructor(private fb: FormBuilder, private factureService: FactureService, private productService: ProductService,) {
    this.commandeForm = this.fb.group({
      produit: ['', Validators.required],
      quantite: ['', Validators.required],
      argent_recu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // Load products on init
    this.trackArgentRecu(); // Track changes in argent_recu
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up subscription
  }

  trackArgentRecu(): void {
    this.subscription.add(
      this.commandeForm.get('argent_recu')!.valueChanges.subscribe(value => {
        this.updateArgentARendre(value); // Update argentARendre when value changes
      })
    );
  }

  updateArgentARendre(argentRecu: number): void {
    this.argentARendre = argentRecu - this.totalMontant; // Calculate argentARendre
  }

  loadProducts(): void {
    this.productService.getProductsPrice().subscribe(products => {
      this.products = products;
    });
  }

  addCommande() {
    const formValue = this.commandeForm.value;
    console.log('here is the form_value', formValue)
    console.log('voici la liste des produits', this.products)
    const produit_id= Number(formValue.produit);
    const quantite=formValue.quantite;
    const produit = this.products.find(p => p.id === produit_id); // Find product by ID
    const prix_total = produit.prix_vente * quantite; // Calculate total price if product exists
    const nom_produit = produit.nom_produit; // Get product name if product exists
    console.log('voici le nom du produit ',nom_produit)
    const commande: Commande = {
      produit: produit_id,
      nom_produit:nom_produit,
      qte_produit: quantite,
      prix_total: prix_total
    };
    console.log('voici la commande : ', commande)
    this.commandes.push(commande);
    this.calculateTotal(); // Update total when a new commande is added
    this.commandeForm.reset();
  }

  calculateTotal() {
    this.totalMontant = this.commandes.reduce((total, item) => {
      const product = this.products[item.produit - 1]; // Get the product based on ID
      return total + (product ? product.prix_vente * item.qte_produit : 0);
    }, 0);
  }

  onSubmit() {
      const facture: Facture = {
        est_payee: false,
        commandes: this.commandes
      };
      console.log('here is the facture payload: ',facture)

      this.factureService.addFacture(facture).subscribe(response => {
        console.log('Facture added:', response);
        this.commandes = [];
      });

  }
}
