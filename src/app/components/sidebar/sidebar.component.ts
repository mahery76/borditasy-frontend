import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/authentications/authentication.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
  {
    path: '/insert_product',
    title: 'Inserer Produit',
    icon: 'pe-7s-box2',
    class: '',
  },
  {
    path: '/list_product',
    title: 'List Produit',
    icon: 'pe-7s-note2',
    class: '',
  },
  {
    path: '/insert_stock',
    title: 'Inserer Stock',
    icon: 'pe-7s-box2',
    class: '',
  },
  { path: '/list_stock', title: 'List Stock', icon: 'pe-7s-note2', class: '' },

  {
    path: '/insert_depense',
    title: 'Inserer depense',
    icon: 'pe-7s-box2',
    class: '',
  },
  {
    path: '/list_depense',
    title: 'Liste depense',
    icon: 'pe-7s-note2',
    class: '',
  },

  {
    path: '/insert_commande',
    title: 'Nouvelle Commande',
    icon: 'pe-7s-news-paper',
    class: '',
  },
];

export const WAITERROUTES: RouteInfo[] = [
  {
    path: '/insert_commande',
    title: 'Nouvelle Commande',
    icon: 'pe-7s-news-paper',
    class: '',
  },
]

export let ROUTES: RouteInfo[] = [];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe((response) => {
      if (response.is_superuser) {
        console.log('User is a super admin');
        this.menuItems = ADMINROUTES.filter((menuItem) => menuItem);
        ROUTES = ADMINROUTES;  
      } else {
        console.log('User is not a super admin');
        this.menuItems = WAITERROUTES.filter((menuItem) => menuItem);
        ROUTES = WAITERROUTES;
      }
    });
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
