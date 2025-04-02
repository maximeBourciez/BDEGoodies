import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '../../models/evenement.model';
import { Goodie } from '../../models/goodie.model';
import { Etudiant } from '../../models/etudiant.model';
import { EvenementsService } from '../../services/evenements.service';
import { EtudiantsService } from '../../services/etudiants.service';
import { GoodiesService } from '../../services/goodies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation, StatutReservation } from '../../models/reservation.model';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  standalone: false,
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly studentService: EtudiantsService = inject(EtudiantsService);
  private readonly goodieService: GoodiesService = inject(GoodiesService);
  private readonly reservationService: ReservationsService = inject(ReservationsService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly router: Router = inject(Router);

  // Attributs
  events: Evenement[] = [];
  goodies: Goodie[] = [];
  students: Etudiant[] = [];
  selectedGoodies: {goodie: Goodie, quantity: number}[] = [];
  form!: FormGroup;
  isLoading = false;
  statuts: string[] = [];

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  loadData(): void {
    this.isLoading = true;

    // Charger les évènements
    this.eventService.getEvenements().subscribe({
      next: events => this.events = events,
      error: () => this.showError('Erreur lors du chargement des événements')
    });

    // Charger les goodies
    this.goodieService.getGoodies().subscribe({
      next: goodies => this.goodies = goodies,
      error: () => this.showError('Erreur lors du chargement des goodies')
    });

    // Charger les étudiants
    this.studentService.getEtudiants().subscribe({
      next: students => {
        this.students = students;
        this.isLoading = false;
      },
      error: () => {
        this.showError('Erreur lors du chargement des étudiants');
        this.isLoading = false;
      }
    });

    // Charger les statuts
    this.statuts = Object.values(StatutReservation);
  }

  initForm(): void {
    this.form = this.fb.group({
      eventId: ['', Validators.required],
      studentId: ['', Validators.required],
      statut: [StatutReservation.EnAttente, Validators.required],
      goodieId: [''],
      quantity: [1, [Validators.min(1)]]
    });
  }

  addGoodie(): void {
    if (this.form.get('goodieId')?.invalid || this.form.get('quantity')?.invalid) {
      this.snackBar.open('Veuillez sélectionner un goodie et une quantité valide', 'Fermer', {duration: 2000});
      return;
    }

    const goodieId = this.form.value.goodieId;
    const quantity = this.form.value.quantity;
    const goodie = this.goodies.find(g => g.idGoodie === goodieId);

    if (goodie && !this.selectedGoodies.some(item => item.goodie.idGoodie === goodieId)) {
      this.selectedGoodies.push({ goodie, quantity });
      this.form.get('goodieId')?.reset();
      this.form.get('quantity')?.setValue(1);
    }
  }

  removeGoodie(index: number): void {
    this.selectedGoodies.splice(index, 1);
  }

  onSubmit(): void {
    if (this.form.get('eventId')?.invalid || 
      this.form.get('studentId')?.invalid || 
      this.form.get('statut')?.invalid) {
    this.markAllAsTouched();
    return;
  }


    const reservationData: Reservation = {
      idReservation: 0,
      idEtudiant: this.form.value.studentId,
      idEvenement: this.form.value.eventId,
      dateReservation: new Date(),
      statut: StatutReservation.EnAttente,
      
    };

    this.isLoading = true;
    this.reservationService.create(reservationData).subscribe({
      next: (reservation : Reservation) => {
        this.snackBar.open('Réservation créée avec succès', 'Fermer', { duration: 3000 });
        this.router.navigate(['/event', reservation.idEvenement]);
      },
      error: (error : Error) => {
        console.error('Erreur lors de la création de la réservation:', error);
        this.snackBar.open('Erreur lors de la création de la réservation', 'Fermer', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  private markAllAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}