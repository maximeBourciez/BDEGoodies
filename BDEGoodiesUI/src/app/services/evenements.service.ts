import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  // Attributs
  private readonly apiUrl = 'http://localhost:8000/api/evenements';
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  // Méthodes
  getEvenements():Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getEvenementById(id: number):Observable<Evenement>{
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }
  
}
