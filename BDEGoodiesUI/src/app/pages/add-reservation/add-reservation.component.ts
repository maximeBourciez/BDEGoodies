import { Component, inject, Input } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { GoodieReservation } from '../../models/goodieReservation.model';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
  standalone: false
})
export class AddReservationComponent {
  @Input() evenement!: Evenement;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly eventService: EvenementsService = inject(EvenementsService);
  private readonly studentService: EtudiantsService = inject(EtudiantsService);
  private readonly goodieService: GoodiesService = inject(GoodiesService);
  private readonly reservationService: ReservationsService = inject(ReservationsService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  // Attributes
  goodies: Goodie[] = [];
  students: Etudiant[] = [];
  selectedGoodies: { goodie: Goodie, quantity: number }[] = [];
  form!: FormGroup;
  isLoading = false;
  statuts = Object.values(StatutReservation);

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.getEvent();
  }

  private loadData(): void {
    this.isLoading = true;

    // Load goodies and students in parallel
    forkJoin([
      this.goodieService.getGoodies(),
      this.studentService.getEtudiants()
    ]).subscribe({
      next: ([goodies, students]) => {
        this.goodies = goodies;
        this.students = students;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.showError('Erreur lors du chargement des données');
        this.isLoading = false;
      }
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      statut: [StatutReservation.EnAttente, Validators.required],
      goodieId: [''],
      quantity: [1, [Validators.min(1), Validators.max(10)]],
    });
  }

  private getEvent(): void {
    const id = parseInt(this.route.snapshot.params['id']);
    this.eventService.getEvenementById(id).subscribe(data => {
        this.evenement = data;
    })
  }

  addGoodie(): void {
    const goodieControl = this.form.get('goodieId');
    const quantityControl = this.form.get('quantity');

    if (!goodieControl?.value || quantityControl?.invalid) {
      this.snackBar.open('Veuillez sélectionner un goodie et une quantité valide', 'Fermer', { duration: 2000 });
      return;
    }

    const goodie = this.goodies.find(g => g.idGoodie === goodieControl.value);
    if (!goodie) return;

    // Check if goodie already added
    const existingIndex = this.selectedGoodies.findIndex(item => item.goodie.idGoodie === goodie.idGoodie);
    if (existingIndex >= 0) {
      this.selectedGoodies[existingIndex].quantity += quantityControl?.value;
    } else {
      this.selectedGoodies.push({
        goodie,
        quantity: quantityControl?.value
      });
    }

    // Reset form controls
    this.form.patchValue({
      goodieId: '',
      quantity: 1
    });
  }

  removeGoodie(index: number): void {
    this.selectedGoodies.splice(index, 1);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllAsTouched();
      this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'Fermer', { duration: 3000 });
      return;
    }

    const eventId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    if (isNaN(eventId)) {
      this.showError('ID d\'événement invalide');
      return;
    }

    this.isLoading = true;

    const reservationData= new Reservation(0, this.form.value.studentId, eventId, new Date(), this.form.value.statut as StatutReservation);



    this.reservationService.create(reservationData).subscribe({
      next: (reservation: Reservation) => {
        if (this.selectedGoodies.length > 0) {
          this.createGoodieReservations(reservation.idReservation);
        } else {
          this.handleSuccess(reservation);
        }
      },
      error: (error) => this.handleError(error, 'Erreur lors de la création de la réservation')
    });
  }

  private createGoodieReservations(reservationId: number): void {
    const requests = this.selectedGoodies.map(item => {
      const goodieReservation = new GoodieReservation(
        reservationId,
        item.goodie.idGoodie,
        item.quantity
      );
      return this.reservationService.createGoodieReservation(goodieReservation);
    });

    forkJoin(requests).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error, 'Erreur lors de la création des réservations de goodies')
    });
  }

  private handleSuccess(reservation?: Reservation): void {
    this.snackBar.open('Réservation créée avec succès', 'Fermer', { duration: 3000 });
    this.router.navigate(['/event', reservation?.idEvenement || this.evenement.idEvenement]);
    this.isLoading = false;
  }

  private handleError(error: any, message: string): void {
    console.error(message, error);
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
    this.isLoading = false;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
