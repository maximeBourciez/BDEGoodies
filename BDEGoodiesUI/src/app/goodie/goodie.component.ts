import { Component, inject, Input } from '@angular/core';
import { Goodie } from '../models/goodie.model';
import {GoodiesService} from '../services/goodies.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-goodie',
  standalone: false,
  templateUrl: './goodie.component.html',
  styleUrl: './goodie.component.scss'
})
export class GoodieComponent {
  @Input() goodie!: Goodie;
  isLoading!: boolean;
  private readonly goodieService: GoodiesService = inject(GoodiesService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);


  // constructeur
  constructor() {
  }

  // Initialisation
  incrementStock(): void {
    if (this.goodie) {
      this.goodie.quantite++;
    }
  }

  decrementStock(): void {
    if (this.goodie && this.goodie.quantite > 0) {
      this.goodie.quantite--;
    }
  }

  saveStock(): void {
    if (!this.goodie) return;

    this.isLoading = true;

    this.goodieService.updateGoodie(this.goodie)
      .subscribe({
        next: () => {
          this.snackBar.open('Stock mis à jour avec succès', 'Fermer', { duration: 3000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du stock', error);
          this.snackBar.open('Erreur lors de la mise à jour du stock', 'Fermer', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }
}
