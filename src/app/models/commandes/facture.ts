import { Commande } from "./commande";

export interface Facture {
    est_payee: boolean;
    commandes: Commande[];
  }