import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '../../models/evenement.model';
import { EvenementsService } from '../../services/evenements.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-evenement',
  standalone: false,
  templateUrl: './add-evenement.component.html',
  styleUrl: './add-evenement.component.scss'
})
export class AddEvenementComponent {
  // Attributs
  eventForm!: FormGroup;
  minDate: Date;

  // Injections de dépendances
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly router: Router = inject(Router);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  // Constructeur
  constructor() {
    this.minDate = new Date();
  }

  // Initialisation
  ngOnInit() {
    // Initialiser le formulaire
    this.initForm();
  }

  // Méthodes

  // Initialiser le formulaire
  initForm(): void {
    this.eventForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      lieu: ['', [Validators.required, Validators.maxLength(100)]],
      dateHeure: ['', Validators.required],
      heure: ['', Validators.required], // Add this line
      prix: ['', [Validators.required, Validators.min(0)]],
      capacite: ['', [Validators.required, Validators.min(1)]],
      theme: ['', Validators.maxLength(50)]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      // Créer le bon format de date
      const dateOnly = new Date(formValue.dateHeure);
      const timeParts = formValue.heure.split(':');
      dateOnly.setHours(parseInt(timeParts[0], 10));
      dateOnly.setMinutes(parseInt(timeParts[1], 10));

      // Créer l'évent
      const newEvent = new Evenement(
        0,
        formValue.nom,
        formValue.lieu,
        dateOnly,
        formValue.prix,
        formValue.capacite,
        formValue.theme
      );


      // Envoi à l'api
      this.eventService.createEvent(newEvent).subscribe({
        next: (response) => {
          this.snackBar.open('Évènement créé avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/events']);
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Erreur lors de la création de l\'évènement';
          this.snackBar.open(errorMessage, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  resetForm(): void {
    this.eventForm.reset();
  }
}
