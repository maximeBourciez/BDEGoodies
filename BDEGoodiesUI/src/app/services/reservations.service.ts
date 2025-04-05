import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoodieReservation } from '../models/goodieReservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  // Attributs 
  private readonly API_URL = 'http://localhost:8000/api/reservations';
  private readonly http: HttpClient = inject(HttpClient);


  constructor() { }

  create(resa: Reservation) : Observable<Reservation> {
    return this.http.post<Reservation>(this.API_URL, resa);
  }

  // Créer la réservation de goodie
  createGoodieReservation(resa: GoodieReservation) : Observable<GoodieReservation> {
    return this.http.post<GoodieReservation>(`${this.API_URL}/goodies`, resa);
  }
}
