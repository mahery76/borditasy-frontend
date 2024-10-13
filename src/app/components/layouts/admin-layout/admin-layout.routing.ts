import { Routes } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard'; 

import { HomeComponent } from '../../home/home.component';
import { ProductComponent } from '../../products/product-list/product.component';
import { ProductFormComponent } from '../../products/product-form/product-form.component';
import { StockListComponent } from 'app/components/stock/stock-list/stock-list.component';
import { StockFormComponent } from 'app/components/stock/stock-form/stock-form.component';

import { DepenseListComponent } from 'app/components/depenses/depense-list/depense-list.component';
import { DepenseFormComponent } from 'app/components/depenses/depense-form/depense-form.component'
import { CommandeFormComponent } from 'app/components/commandes/commande-form/commande-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'list_depense', component: DepenseListComponent, canActivate: [AuthGuard] },
    { path: 'insert_depense', component: DepenseFormComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'insert_product', component: ProductFormComponent, canActivate: [AuthGuard] },
    { path: 'list_product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'list_stock', component: StockListComponent, canActivate: [AuthGuard] },
    { path: 'insert_stock', component: StockFormComponent, canActivate: [AuthGuard] },
    { path: 'insert_commande', component: CommandeFormComponent, canActivate: [AuthGuard] },
];
