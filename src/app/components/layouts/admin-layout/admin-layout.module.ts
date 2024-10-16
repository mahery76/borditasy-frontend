import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';

import { ProductComponent } from '../../products/product-list/product.component';
import { ProductFormComponent } from '../../products/product-form/product-form.component';
import { StockFormComponent } from 'app/components/stock/stock-form/stock-form.component';
import { StockListComponent } from 'app/components/stock/stock-list/stock-list.component';
import { DepenseListComponent } from 'app/components/depenses/depense-list/depense-list.component';
import { DepenseFormComponent } from 'app/components/depenses/depense-form/depense-form.component'
import { CommandeFormComponent } from 'app/components/commandes/commande-form/commande-form.component';
import { StatistiqueComponent } from 'app/components/statistique/statistique/statistique.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,  // {{ edit_1 }} Added ReactiveFormsModule
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductFormComponent,
    StockFormComponent,
    StockListComponent,
    DepenseListComponent,
    DepenseFormComponent,
    CommandeFormComponent,
    StatistiqueComponent
  ]
})

export class AdminLayoutModule {}
