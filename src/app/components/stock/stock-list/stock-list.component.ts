import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stocks/stock.service';
import { Stock } from '../../../models/stocks/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }
}
