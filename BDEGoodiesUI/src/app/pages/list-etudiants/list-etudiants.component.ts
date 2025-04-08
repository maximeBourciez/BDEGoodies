import {Component, inject, ViewChild} from '@angular/core';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantsService} from '../../services/etudiants.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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
    this.etudiantsService.delete(idEtudiant).subscribe({
      next: data => {
        // Message de succès + redirection
      },
      error: err => {
        // MEssage d'erreur + redirection
      }
    })
  }
}
