import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor() { }

  create(resa: Reservation) : Observable<Reservation> {
    return new Observable<Reservation>(observer => {
      setTimeout(() => {
        observer.next(resa);
        observer.complete();
      }, 1000);
    }
    );

  }
}
