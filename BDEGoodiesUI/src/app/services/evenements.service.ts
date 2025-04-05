import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement.model';
import { Etudiant } from '../models/etudiant.model';
import {Reservation} from '../models/reservation.model';

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

  // R&cupérer les inscrits
  getInscriptions(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/${id}/reservations`);
  }

  // Désinscrire un étudiant
  delete(idEvenement: number, idEtudiant: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${idEvenement}/etudiants/${idEtudiant}`);
  }

  // Créer un évènement
  createEvent(event: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.apiUrl, event);
  }
}
