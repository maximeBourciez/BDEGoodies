import {Component, HostListener, inject} from '@angular/core';
import { Goodie } from '../../models/goodie.model';
import { GoodiesService } from '../../services/goodies.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-goodies',
  standalone: false,
  templateUrl: './list-goodies.component.html',
  styleUrl: './list-goodies.component.scss'
})
export class ListGoodiesComponent {
  // Attributs
  goodies: Goodie[]= [];
  gridCols!: number;
  isLoading = true;

  // Injections de dépendances
  private readonly goodieService: GoodiesService = inject(GoodiesService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  // Constructeur
  constructor() {
  }

  // Initialisation
  ngOnInit(): void {
    this.loadGoodies();
    this.updateGridCols();
  }

  // Charger les goodies
  private loadGoodies(): void {
    this.goodieService.getGoodies().subscribe({
      next: data => {
        this.goodies = data;
      },
      error: error => {
        console.error('Erreur API:', error);
        this.snackBar.open(
          'Impossible de charger les goodies - L\'API semble indisponible',
          'Fermer',
          {
            duration: 5000, // 5 secondes
            panelClass: ['error-snackbar'] // Style d'erreur (optionnel)
          }
        );
      }
    });
  }

  // Responsive
  @HostListener('window:resize')
  onResize(): void {
    this.updateGridCols();
  }

  updateGridCols(): void {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1;
    } else if (width < 900) {
      this.gridCols = 2;
    } else {
      this.gridCols = 3;
    }
  }
}
