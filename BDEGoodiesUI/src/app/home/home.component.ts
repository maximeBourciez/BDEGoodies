import { Component, inject } from '@angular/core';
import { Evenement } from '../models/evenement.model';
import { EvenementsService } from '../services/evenements.service';
import {GoodiesService} from '../services/goodies.service';
import {ReservationsService} from '../services/reservations.service';
import {Reservation} from '../models/reservation.model';
import {Goodie} from '../models/goodie.model';
import {forkJoin} from 'rxjs';
import { ListEvenementsComponent} from '../pages/list-evenements/list-evenements.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Attributs
  title = 'BDEGoodies | Accueil';
  private readonly evenementsService: EvenementsService = inject(EvenementsService);
  private readonly goodiesService : GoodiesService = inject(GoodiesService);
  private readonly reservationsService : ReservationsService = inject(ReservationsService);
  isLoading = true;


  prochainsEvents : Evenement[] = [];
  dernieresReservations : Reservation[] = [];
  stocksGoodies : Goodie[] = [];

  // Constructeur
  constructor() { }




  // Méthodes
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;

    forkJoin({
      events: this.evenementsService.getProchainsEvenements(),
      reservations: this.reservationsService.getDernieresReservations(),
      goodies: this.goodiesService.getPetitsStocks()
    }).subscribe({
      next: ({ events, reservations, goodies }) => {
        // Traitement des événements
        this.prochainsEvents = events;

        // Traitement des réservations
        this.dernieresReservations = reservations;

        // Transformation des goodies avec typage strict
        this.stocksGoodies = goodies;

        console.log(goodies);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données:', err);
        this.isLoading = false;
        // Ajoutez ici un MatSnackBar ou autre système de notification
      }
    });
  }

}
