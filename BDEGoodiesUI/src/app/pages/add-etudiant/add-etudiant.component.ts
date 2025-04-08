import {Component, inject} from '@angular/core';
import {Etudiant} from '../../models/etudiant.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EtudiantsService} from '../../services/etudiants.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-etudiant',
  standalone: false,
  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.scss'
})
export class AddEtudiantComponent {
  etudiantForm!: FormGroup;
  etudiant?: Etudiant;
  isLoading = true;
  isEdit = false;

  // Services
  private fb = inject(FormBuilder);
  private etudiantsService = inject(EtudiantsService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private readonly http: ActivatedRoute = inject(ActivatedRoute);

  constructor() {

  }

  ngOnInit() {
    const id = this.http.snapshot.paramMap.get('id');

    if(id){
      this.etudiantsService.getEtudiantById(parseInt(id)).subscribe(
        {
          next: (etudiant: Etudiant) => {
            this.etudiant = etudiant;
            this.initForm(this.etudiant);
            this.isEdit = true;

          }
        }
      )
    }
    this.initForm(null);
  }

  private initForm(data: Etudiant | null) {
    this.etudiantForm = this.fb.group({
      nom: [this.etudiant? this.etudiant.nom : '', [Validators.required, Validators.minLength(2)]],
      mail: [this.etudiant? this.etudiant.mail : '', [Validators.required, Validators.email]],
      telephone: [this.etudiant? this.etudiant.telephone : '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
    this.isLoading = false;
  }

  onSubmit() {
    if (this.etudiantForm.valid) {
      this.isLoading = true;
      const etudiantData = new Etudiant(
        this.isEdit ? this.etudiant!.idEtudiant : 0, // Garde l'ID existant en mode édition
        this.etudiantForm.value.nom,
        this.etudiantForm.value.mail,
        this.etudiantForm.value.telephone,
        0 // Année par défaut
      );

      const operation$ = this.isEdit
        ? this.etudiantsService.update(etudiantData)
        : this.etudiantsService.create(etudiantData);

      operation$.subscribe({
        next: () => {
          const message = this.isEdit
            ? 'Étudiant mis à jour avec succès'
            : 'Étudiant créé avec succès';

          this.snackBar.open(message, 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMessage = this.isEdit
            ? err.error?.message || 'Erreur lors de la mise à jour'
            : err.error?.message || 'Erreur lors de la création';

          this.snackBar.open(errorMessage, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.etudiantForm.markAllAsTouched();
    }
  }
}
