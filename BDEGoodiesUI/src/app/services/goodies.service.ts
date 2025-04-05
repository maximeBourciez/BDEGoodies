import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Goodie } from '../models/goodie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodiesService {
  // Attributs
  private readonly apiUrl = 'http://localhost:8000/api/goodies';
  private readonly http: HttpClient = inject(HttpClient);

  // Constructeur
  constructor() { }

  // Méthodes
  getGoodies():Observable<Goodie[]>{
    return this.http.get<Goodie[]>(this.apiUrl);
  }

  updateGoodie(goodie: Goodie){
    return this.http.put<Goodie>(this.apiUrl + '/' + goodie.idGoodie, goodie);
  }
}
