import { Component, inject, Input } from '@angular/core';
import { Evenement } from '../models/evenement.model'; 
import { EvenementsService } from '../services/evenements.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evenement',
  standalone: false,
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.scss'
})
export class EvenementComponent {
  @Input() event!: Evenement;
  @Input() isListView: boolean = true;
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly router: ActivatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['nom', 'mail', 'telephone', 'statut'];

  // constructeur
  constructor() {
  }

  // Méthodes
  ngOnInit(){
    // Récupération de l'article via son id
    const idParam = this.router.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      this.eventService.getEvenementById(id).subscribe(produit => {
        this.event = produit;

        // Changer l'état de liste
        this.isListView = false;

        // Charger les personnes inscrites
        this.loadInscriptions();
      });
    }
  }

  // Chargement des inscrits
  loadInscriptions(){
    this.eventService.getInscriptions(this.event.idEvenement).subscribe(inscriptions => {
      this.event.inscrits = inscriptions;
    });
  }

  

  // Méthode pour la couleur du statut
  getStatutColor(statut: string): string {
    switch(statut) {
      case 'Confirmée': return 'green';
      case 'En attente': return 'accent';
      case 'Annulée': return 'red';
      default: return '';
    }
  }
}
