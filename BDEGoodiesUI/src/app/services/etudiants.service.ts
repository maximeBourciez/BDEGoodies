import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant.model';

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
  getEtudiants():Observable<Etudiant[]>{ 
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  getEtudiantById(id: number):Observable<Etudiant>{
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }
}
