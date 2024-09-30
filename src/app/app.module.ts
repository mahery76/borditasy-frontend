import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component'; // Import ProductComponent

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent // Declare ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to imports
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }