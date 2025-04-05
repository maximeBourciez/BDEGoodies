import {Component, inject, Input, OnInit} from '@angular/core';
import { Evenement } from '../models/evenement.model';
import { EvenementsService } from '../services/evenements.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {ReservationsService} from '../services/reservations.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-evenement',
  standalone: false,
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.scss'
})
export class EvenementComponent {
  @Input() event: Evenement = {
    idEvenement: 0,
    nom: '',
    dateHeure: new Date(),
    lieu: '',
    capacite: 0,
    prix: 0,
    theme: "",
    inscrits: [],
  };
  isListView: boolean = true;
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly reservationService: ReservationsService = inject(ReservationsService);
  private readonly router: ActivatedRoute = inject(ActivatedRoute);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nom', 'mail', 'telephone', 'statut', 'actions'];

  searchText: string = '';
  dataSource!: MatTableDataSource<any>;

  // constructeur
  constructor() {
  }

  // Méthodes
  ngOnInit() {
    // Initialiser dataSource avec un tableau vide
    this.dataSource = new MatTableDataSource<any>([]);

    // Récupération de l'article via son id
    const idParam = this.router.snapshot.paramMap.get('id');

    // Si on est sur les détails d'un evt
    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      this.eventService.getEvenementById(id).subscribe(donnees => {
        this.event = donnees;
        // S'assurer que event.inscrits existe (initialiser si nécessaire)
        if (!this.event.inscrits) {
          this.event.inscrits = [];
        }

        // Changer l'état de liste
        this.isListView = false;

        // Charger les personnes inscrites
        this.loadReservations();
      });
    }
  }

  // Chargement des inscrits
  loadReservations() {
    this.eventService.getInscriptions(this.event.idEvenement).subscribe(reservations => {
      // Mapper les réservations pour inclure à la fois l'étudiant et le statut
      this.event.inscrits = reservations.map(reservation => {
        return {
          ...reservation.etudiant,
          statut: reservation.statut,
          idReservation: reservation.idReservation,
        };
      });
      // Mettre à jour les données de dataSource
      this.dataSource.data = this.event.inscrits;
    });
  }



  // Méthode pour la couleur du statut
  getStatutColor(statut: string): string {
    switch (statut) {
      case 'Confirmée': return 'green';
      case 'En attente': return 'accent';
      case 'Annulée': return 'red';
      default: return '';
    }
  }

  deleteInscription(idReservation: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      this.reservationService.deleteReservation(idReservation).subscribe({
        next: () => {
          this.snackBar.open('Inscription supprimée avec succès', 'Fermer', { duration: 3000 });
          this.loadReservations();
        },
        error: (err: any) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }


  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
}
