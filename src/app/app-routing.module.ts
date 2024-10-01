import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/products/product-list/product.component'; // Import ProductComponent
import { ProductFormComponent } from './components/products/product-form/product-form.component'; // Import ProductFormComponent

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'add-product', component: ProductFormComponent } // Add route for product form
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


