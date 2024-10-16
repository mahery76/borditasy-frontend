import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistique } from 'app/models/statistique/statistique'; // Import the model

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = 'http://127.0.0.1:8000/api/statistics'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getStatistics(startDate: string, endDate: string): Observable<Statistique[]> {
    return this.http.get<Statistique[]>(`${this.apiUrl}?start=${startDate}&end=${endDate}`);
  }
}
