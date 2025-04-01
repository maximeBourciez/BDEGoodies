import { Component, HostListener, inject } from '@angular/core';
import { Evenement } from '../../models/evenement.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvenementComponent } from '../../evenement/evenement.component';
import { EvenementsService } from '../../services/evenements.service';

@Component({
  selector: 'app-list-evenements',
  standalone: false,
  templateUrl: './list-evenements.component.html',
  styleUrl: './list-evenements.component.scss'
})
export class ListEvenementsComponent {
  // Attributs
  events: Evenement[] = []; 
  private readonly eventService: EvenementsService = inject(EvenementsService); 
  gridCols = 3; 

  // Constructeur
  constructor() {}

  // Initialisation
  ngOnInit(): void {
    this.eventService.getEvenements().subscribe((data: Evenement[]) => {
      this.events = data;
    });
    this.updateGridCols(); // Adapter les colonnes au chargement
  }


  // Méthodes
  loadMore(){
    
  }

  trackEvent(index: number, event: Evenement): number {
    return event.id;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateGridCols(); // Adapter les colonnes au redimensionnement
  }

  updateGridCols(): void {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1; // Mobile : 1 colonne
    } else if (width < 900) {
      this.gridCols = 2; // Tablette : 2 colonnes
    } else {
      this.gridCols = 3; // Desktop : 3 colonnes
    }
  }
}
