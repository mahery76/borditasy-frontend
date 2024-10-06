import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from 'app/models/commandes/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://127.0.0.1:8000/api/commandes/'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  addFacture(facture: Facture): Observable<any> {
    return this.http.post<any>(this.apiUrl, {"facture": facture});
  }
}