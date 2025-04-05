import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '../../models/evenement.model';
import { EvenementsService } from '../../services/evenements.service';

@Component({
  selector: 'app-add-evenement',
  standalone: false,
  templateUrl: './add-evenement.component.html',
  styleUrl: './add-evenement.component.scss'
})
export class AddEvenementComponent {
  // Attributs
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly eventService: EvenementsService = inject(EvenementsService);
  eventForm!: FormGroup;
  minDate: Date;

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
      prix: ['', [Validators.required, Validators.min(0)]],
      capacite: ['', [Validators.required, Validators.min(1)]],
      theme: ['', Validators.maxLength(50)]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      
      // Combiner date et heure
      const date = new Date(formValue.dateHeure);
      const [hours, minutes] = formValue.heure.split(':');
      date.setHours(parseInt(hours), date.setMinutes(parseInt(minutes));
  
      // Formater pour Laravel (format ISO 8601)
      const dateTimeForLaravel = date.toISOString().slice(0, 19).replace('T', ' ');
  
      const newEvent = new Evenement(
        0,
        formValue.nom,
        formValue.lieu,
        dateTimeForLaravel, // Envoyez cette valeur à votre API
        formValue.prix,
        formValue.capacite,
        formValue.theme
      );
  
      // Envoi à l'API
      this.eventService.createEvent(newEvent).subscribe({
        next: (response) => {
          console.log('Événement créé', response);
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Erreur', err);
        }
      });
    }
  }

  resetForm(): void {
    this.eventForm.reset();
  }
}