import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stocks/stock.service';
import { Stock } from '../../../models/stocks/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }

  addStock(stock: Stock): void {
    this.router.navigate(['/insert_stock'], {
      queryParams: {
        produit: stock.produit?.id,
        prix_achat: stock.prix_achat_dep,
        prix_vente: stock.prix_vente
      }
    });
  }
}
