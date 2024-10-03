import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { ProductComponent } from './components/products/product-list/product.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component'; // Import ProductFormComponent
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './components/shared/navbar/navbar.module'
import { FooterModule } from './components/shared/footer/footer.module';
import { SidebarModule } from './components/sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { StockFormComponent } from './components/stock/stock-form/stock-form.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to imports
    ReactiveFormsModule, // Add ReactiveFormsModule to imports
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }