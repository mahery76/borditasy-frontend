import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/products/product-list/product.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component'; // Import ProductFormComponent

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent // Declare ProductFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to imports
    ReactiveFormsModule, // Add ReactiveFormsModule to imports
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }