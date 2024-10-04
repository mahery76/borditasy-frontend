import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depense } from '../../models/depense/depense.model'

@Injectable({
    providedIn: 'root'
})

export class DepenseService {
    private apiUrlAddDepense = 'http://localhost:8000/api/depenses/';
    private apiUrlGetDepense = 'http://localhost:8000/api/depenses/list';
    constructor(private http: HttpClient) {}
    
    getDepenses(): Observable<Depense[]> {
        return this.http.get<Depense[]>(this.apiUrlGetDepense)
    }

    addDepense(depense: Depense): Observable<Depense>{
        return this.http.post<Depense>(this.apiUrlAddDepense, depense);
    }
}