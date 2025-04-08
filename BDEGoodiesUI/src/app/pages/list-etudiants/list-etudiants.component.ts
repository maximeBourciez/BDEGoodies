import {Component, inject, ViewChild} from '@angular/core';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantsService} from '../../services/etudiants.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router} from '@angular/router';

@Component({
  selector: 'app-list-etudiants',
  standalone: false,
  templateUrl: './list-etudiants.component.html',
  styleUrl: './list-etudiants.component.scss'
})
export class ListEtudiantsComponent {
  // Attributs
  students: Etudiant[] = []
  isLoading: boolean = true;
  displayedColumns: string[] = ['idEtudiant',  'nom', 'email', 'telephone', 'actions'];
  dataSource!: MatTableDataSource<Etudiant>;

  // Références aux composants Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Injections de dépendances
  private readonly etudiantsService: EtudiantsService = inject(EtudiantsService);
  private readonly snackbar: MatSnackBar = inject(MatSnackBar);
  private readonly router: Router = inject(Router);

  // Constructeur
  constructor() {}

  // Initalisation
  ngOnInit() {
    this.loadStudents();
  }

  // Méthodes
  // Charger les étudiants
  private loadStudents() {
    // Requêeter l'api
    this.etudiantsService.getEtudiants().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      },
      error: err => {
        const errorMessage = err.error?.message || 'Erreur lors du chargement des étudiants';
        this.snackbar.open(errorMessage, 'Fermer',{
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    })
  }

  // Applicationd es filtres
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Suppression d'étudiant
  deleteStudent(idEtudiant: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantsService.delete(idEtudiant).subscribe({
        next: () => {

          // Afficher un message de succès
          this.snackbar.open('Étudiant supprimé avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          // R2charger
          this.router.navigate(['/students']);
        },
        error: (err) => {
          // Gestion des erreurs
          const errorMessage = err.error?.message || 'Erreur lors de la suppression';
          this.snackbar.open(errorMessage, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
