import { Component, inject, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reservation, StatutReservation} from '../../models/reservation.model';
import {forkJoin} from 'rxjs';
import {GoodieReservation} from '../../models/goodieReservation.model';
import {Router} from '@angular/router';
import {GoodiesService} from '../../services/goodies.service';
import {Goodie} from '../../models/goodie.model';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-goodie.component.html',
  styleUrls: ['./add-goodie.component.scss'],
  standalone: false
})
export class AddGoodieComponent{

  // Attributes
  form!: FormGroup;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly goodieService : GoodiesService = inject(GoodiesService);

  ngOnInit(): void {
    this.initForm();
  }



  private initForm(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      coutUnitaire: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Création d'un nouvel objet goodie avec les valeurs du formulaire
      const goodie: Goodie = {
        idGoodie: 0,
        nom: this.form.value.nom,
        quantite: this.form.value.quantite,
        description: this.form.value.description,
        coutUnitaire: this.form.value.coutUnitaire
      };

      // Sauvegarde
      this.goodieService.createGoodie(goodie).subscribe({
        next: (response) => {
          // Rediriger et rafraîchir
          this.router.navigate(['/goodies'])
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du goodie', err);
        }
      });

      // Redirection après sauvegarde
      this.router.navigate(['/goodies']);
    }
  }
}
