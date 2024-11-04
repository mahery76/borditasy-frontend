import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Statistique } from 'app/models/statistique/statistique'; // Import the existing model
import { StatistiqueDashboard, StatistiqueApiResponse } from 'app/models/statistique/statistique-dashboard'; // Import the new model

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = 'http://127.0.0.1:8000/api/statistics'; // Replace with your API URL
  private dashboardApiUrl = 'http://127.0.0.1:8000/api/statistics/statisticsDashboard'; // Replace with your API URL for dashboard

  constructor(private http: HttpClient) {}

  getStatistics(startDate: string, endDate: string): Observable<Statistique[]> {
    return this.http.get<Statistique[]>(`${this.apiUrl}?start=${startDate}&end=${endDate}`);
  }

  getStatisticsDashboard(productId: number, year: number): Observable<StatistiqueDashboard> {
    // Make an API call to fetch the statistics for the specified product and year
    return this.http.get<StatistiqueApiResponse[]>(`${this.dashboardApiUrl}?productId=${productId}&year=${year}`).pipe(
      map(response => {
        const months: string[] = [];
        const quantities: number[] = Array(12).fill(0); // Initialize quantities for each month

        response.forEach(item => {
          months[item.month - 1] = new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }); // Get month name
          quantities[item.month - 1] += item.total_profit; // Accumulate quantities for each month
        });

        return { months, quantities }; // Return the transformed data
      })
    );
  }
}
