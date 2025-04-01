import { Component, inject } from '@angular/core';
import { Evenement } from '../models/evenement.model';
import { EvenementsService } from '../services/evenements.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Attributs 
  title = 'BDEGoodies | Accueil';
  evenements: Evenement[] = [];
  private readonly evenementsService: EvenementsService = inject(EvenementsService);

  // Constructeur
  constructor() { }

  currentOffset = 0;
  slideWidth = 400; 


  prochainEvenement = {
    nom: "Soirée Fluo",
    date: "2025-04-10",
    lieu: "Club XYZ",
    prix: 10,
    capacite: 200,
    theme: "Fluo"
  };

  dernieresReservations = [
    { etudiant: "Alice Dupont", statut: "Confirmée", soiree: "Soirée Fluo" },
    { etudiant: "Marc Leroy", statut: "En attente", soiree: "Bal de Promo" },
    { etudiant: "Emma Moreau", statut: "Annulée", soiree: "Soirée Années 90" }
  ];

  stockGoodies = [
    { nom: "Bracelet", quantite: 50 },
    { nom: "T-shirt", quantite: 20 },
    { nom: "Sticker", quantite: 100 }
  ];

  prevSlide() {
    this.currentOffset += this.slideWidth;
  }

  nextSlide() {
    this.currentOffset -= this.slideWidth;
  }

  // Méthodes
  ngOnInit(): void {
    this.evenementsService.getEvenements().subscribe((evenements: Evenement[]) => {
      this.evenements = evenements;
    });
  }
}
