import { Component, inject, Input } from '@angular/core';
import { Evenement } from '../models/evenement.model';
import { EvenementsService } from '../services/evenements.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-evenement',
  standalone: false,
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.scss'
})
export class EvenementComponent {
  @Input() event!: Evenement;
  isListView: boolean = true;
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly router: ActivatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['nom', 'mail', 'telephone', 'statut', 'actions'];
  snackBar: any;

  searchText: string = '';
  dataSource!: MatTableDataSource<any>;

  // constructeur
  constructor() {
  }

  // Méthodes
  ngOnInit() {
    // Récupération de l'article via son id
    const idParam = this.router.snapshot.paramMap.get('id');

    // Si on est sur les détails d'un evt
    if (idParam !== null) {
      console.log(idParam);
      const id = parseInt(idParam, 10);
      this.eventService.getEvenementById(id).subscribe(donnees => {
        this.event = donnees;

        // Changer l'état de liste
        this.isListView = false;

        // Charger les personnes inscrites
        this.loadReservations();

        // Initialiser la liste
        this.dataSource = new MatTableDataSource<any>(this.event.inscrits);
      });
    }


  }

  // Chargement des inscrits
  loadReservations() {
    this.eventService.getInscriptions(this.event.idEvenement).subscribe(inscriptions => {
      this.event.inscrits = inscriptions;
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

  deleteInscription(idEtudiant: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      this.eventService.delete(this.event.idEvenement, idEtudiant).subscribe({
        next: () => {
          this.snackBar.open('Inscription supprimée avec succès', 'Fermer', { duration: 3000 });
          this.loadReservations();
        },
        error: (err: any) => {
          console.error('Erreur lors de la suppression', err);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }


  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
}
