import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlGetProduct = 'http://127.0.0.1:8000/api/produits/list'; // Replace with your API URL
  private apiUrlAddProduct = 'http://127.0.0.1:8000/api/produits/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlGetProduct);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrlAddProduct, product);
  }
 
}