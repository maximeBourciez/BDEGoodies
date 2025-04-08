import { Component, inject, Input } from '@angular/core';
import { Goodie } from '../models/goodie.model';
import { GoodiesService } from '../services/goodies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goodie',
  templateUrl: './goodie.component.html',
  standalone: false,
  styleUrls: ['./goodie.component.scss']
})
export class GoodieComponent {
  @Input() goodie!: Goodie;
  isLoading = false;

  private readonly goodieService = inject(GoodiesService);
  private readonly snackBar = inject(MatSnackBar);

  // Vérifie si le goodie a des informations de stock
  get hasStockInfo(): boolean {
    return this.goodie.stock_restant !== undefined;
  }

  incrementQuantity(): void {
    this.goodie.quantite++;
  }

  decrementQuantity(): void {
    if (this.goodie.quantite > 0) {
      this.goodie.quantite--;
    }
  }

  saveChanges(): void {
    this.isLoading = true;

    this.goodieService.updateGoodie(this.goodie).subscribe({
      next: () => {
        this.snackBar.open('Modifications enregistrées', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur de mise à jour', error);
        this.snackBar.open('Échec de la mise à jour', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }
}
