import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
