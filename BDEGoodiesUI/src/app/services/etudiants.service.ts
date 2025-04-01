import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  // Attributs 
  private readonly apiUrl = 'http://localhost:8000/api/etudiants';
  private readonly http: HttpClient = inject(HttpClient); 

  // Constructeur
  constructor() { }

  // Méthodes
  getEvenements():Observable<Evenement[]>{ 
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getEvenementById(id: number):Observable<Evenement>{
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }
}
