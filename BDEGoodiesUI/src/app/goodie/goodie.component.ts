import { Component, inject, Input } from '@angular/core';
import { Goodie, GoodieStock } from '../models/goodie.model'; // Assurez-vous que GoodieStock est importé
import { GoodiesService } from '../services/goodies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goodie',
  standalone: false,
  templateUrl: './goodie.component.html',
  styleUrl: './goodie.component.scss'
})
export class GoodieComponent {
  @Input() goodie!: Goodie | GoodieStock; // Accepte les deux types
  isLoading!: boolean;
  private readonly goodieService: GoodiesService = inject(GoodiesService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  // Vérifie si c'est un Goodie avec stock
  get isStockGoodie(): boolean {
    return 'stock_restant' in this.goodie ;
  }

  incrementStock(): void {
    if (this.isStockGoodie && this.goodie) {
      (this.goodie as GoodieStock).quantite++;
    }
  }

  decrementStock(): void {
    if (this.isStockGoodie && this.goodie && (this.goodie as GoodieStock).quantite > 0) {
      (this.goodie as GoodieStock).quantite--;
    }
  }

  saveStock(): void {
    if (!this.isStockGoodie || !this.goodie) return;

    this.isLoading = true;

    this.goodieService.updateGoodie(this.goodie as GoodieStock)
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
