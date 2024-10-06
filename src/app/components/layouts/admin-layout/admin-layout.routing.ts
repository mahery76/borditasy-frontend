import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProductComponent } from '../../products/product-list/product.component';
import { ProductFormComponent } from '../../products/product-form/product-form.component';
import { StockListComponent } from 'app/components/stock/stock-list/stock-list.component';
import { StockFormComponent } from 'app/components/stock/stock-form/stock-form.component';
import { CommandeFormComponent } from 'app/components/commandes/commande-form/commande-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'insert_product',        component: ProductFormComponent },
    { path: 'list_product',        component: ProductComponent },
    { path: 'list_stock',        component: StockListComponent },
    { path: 'insert_stock',        component: StockFormComponent },
    { path: 'insert_commande',        component:     CommandeFormComponent,
    },
   
];
