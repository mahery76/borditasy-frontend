import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from './components/connexion/connexion.component'
import {ProduitsComponent} from './components/produits/produits.component'

const routes: Routes = [
  {path: 'admin/connexion', component: ConnexionComponent},
  {path: 'admin/produit', component: ProduitsComponent},
  {path: '**', redirectTo: 'admin/connexion'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


