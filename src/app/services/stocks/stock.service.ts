import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Stock } from '../../models/stocks/stock';
import { Product } from '../../models/products/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrlAddStock = 'http://127.0.0.1:8000/api/stocks/';
  private apiUrlGetStock = 'http://127.0.0.1:8000/api/stocks/list'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {


    return this.http.get<Stock[]>(this.apiUrlGetStock).pipe(
      map(stocks => stocks.map(stock => ({
        ...stock,
        product: this.getProductById(stock.produit as unknown as number) // Fetch product by ID
      })))
    );
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrlAddStock, stock);
  }

  private getProductById(productId: number): Product {
    // Implement the logic to fetch the product by ID
    // This is a placeholder function
    return {
      id: productId,
      nom_produit: 'Sample Product',
      quantite_minimum: 10
    };
  }
}
