import { Component, inject, Input } from '@angular/core';
import { Reservation, StatutReservation } from '../../models/reservation.model';
import { ReservationsService } from '../../services/reservations.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss'],
  standalone: false
})
export class EditReservationComponent {
  idReservation!: number;
  reservation!: Reservation;
  form!: FormGroup;
  isLoading = true;
  statuts = Object.values(StatutReservation);

  // Injections de dépendances
  private readonly reservationService: ReservationsService = inject(ReservationsService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  // Constructeur
  constructor() {
  }

  ngOnInit() {
    this.loadReservation();
  }

  private loadReservation() {
    this.idReservation = this.activatedRoute.snapshot.params['id'];

    this.reservationService.getReservationById(this.idReservation).subscribe({
      next: (reservation) => {
        this.reservation = reservation;
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.isLoading = false;
        // Redirection vers une page d'erreur ou la liste
        this.router.navigate(['/reservations']);
      }
    });
  }

  private initForm() {
    this.form = this.fb.group({
      idReservation: new FormControl({value: this.reservation.idReservation, disabled: true}),
      idEtudiant: new FormControl(this.reservation.idEtudiant, [Validators.required]),
      idEvenement: new FormControl(this.reservation.idEvenement, [Validators.required]),
      dateReservation: new FormControl(
        this.formatDateForInput(this.reservation.dateReservation),
        [Validators.required]
      ),
      statut: new FormControl(this.reservation.statut, [Validators.required])
    });
  }

  private formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  onSubmit() {
    if (this.form.valid) {
      // Création d'une nouvelle instance de Reservation avec les valeurs du formulaire
      const updatedReservation = new Reservation(
        parseInt(this.form.get('idReservation')?.value),
        parseInt(this.form.get('idEtudiant')?.value),
        parseInt(this.form.get('idEvenement')?.value),
        new Date(this.form.get('dateReservation')?.value),
        this.form.get('statut')?.value
      );


      // Appel du service pour mettre à jour
      this.reservationService.updateReservation(updatedReservation).subscribe({
        next: () => {
          this.snackBar.open('Réservation mise à jour avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/event/' + this.reservation.idEvenement]);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMessage = err.error?.message || 'Erreur lors de la mise à jour';
          this.snackBar.open(errorMessage, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs de validation
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    const idEvenement = this.reservation.idEvenement;
    this.router.navigate(['/event/ + idEvenement']);
  }
}
