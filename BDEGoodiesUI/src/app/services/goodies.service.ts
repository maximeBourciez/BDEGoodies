import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Goodie, GoodieStock} from '../models/goodie.model';
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

  // Ajout d'un goodie à la bd
  createGoodie(goodie: Goodie){
    return this.http.post(this.apiUrl, goodie);
  }

  // Récupérer les petits stocks
  getPetitsStocks(){
    return this.http.get<GoodieStock[]>('http://localhost:8000/api/petits-stocks');
  }
}
