import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from './components/connexion/connexion.component'
import {ProduitsComponent} from './components/produits/produits.component'

const routes: Routes = [
  {path: '', component: ConnexionComponent},
  {path: 'produit', component: ProduitsComponent},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
