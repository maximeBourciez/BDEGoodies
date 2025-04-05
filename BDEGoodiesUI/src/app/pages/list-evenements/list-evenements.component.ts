import {Component, HostListener, inject, Input, OnInit} from '@angular/core';
import { Evenement } from '../../models/evenement.model';
import { EvenementsService } from '../../services/evenements.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-evenements',
  standalone: false,
  templateUrl: './list-evenements.component.html',
  styleUrls: ['./list-evenements.component.scss']
})
export class ListEvenementsComponent implements OnInit {
  // Attributs
  @Input() events: Evenement[] = [];
  private readonly eventService: EvenementsService = inject(EvenementsService);
  gridCols = 3;
  searchText: string = '';
  selectedTheme: string[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  filteredEvents: Evenement[] = [];
  availableThemes: string[] = [];
  hasMoreEvents = true;
  currentPage = 1;
  itemsPerPage = 9;
  private searchTextChanged = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Initialisation
  ngOnInit(): void {
    this.loadEvents();
    this.updateGridCols();

    // Debounce pour la recherche texte (300ms)
    this.searchTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEvents(): void {
    this.eventService.getEvenements().subscribe((data: Evenement[]) => {
      this.events = data;
      this.filteredEvents = [...this.events];
      this.extractAvailableThemes();
      this.checkHasMoreEvents();
    });
  }

  loadMore(): void {
    this.currentPage++;
    // Ici vous devriez faire un appel API pour charger plus d'événements
    // Pour l'exemple, nous simulons le chargement
    this.checkHasMoreEvents();
  }

  private checkHasMoreEvents(): void {
    // Logique pour vérifier s'il reste des événements à charger
    // Dans une vraie app, cela dépendrait de votre API
    this.hasMoreEvents = this.filteredEvents.length < this.events.length;
  }

  trackEvent(index: number, event: Evenement): number {
    return event.idEvenement;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateGridCols();
  }

  updateGridCols(): void {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1;
    } else if (width < 900) {
      this.gridCols = 2;
    } else {
      this.gridCols = 3;
    }
  }

  onSearchTextChange(): void {
    this.searchTextChanged.next(this.searchText);
  }

  private extractAvailableThemes(): void {
    this.availableThemes = [...new Set(this.events.map(event => event.theme))];
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      const textMatch = !this.searchText ||
        event.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.theme.toLowerCase().includes(this.searchText.toLowerCase());

      const themeMatch = this.selectedTheme.length === 0 ||
        this.selectedTheme.includes(event.theme);

      const eventDate = new Date(event.dateHeure);
      const startDateMatch = !this.startDate || eventDate >= this.startDate;
      const endDateMatch = !this.endDate || eventDate <= this.endDate;

      return textMatch && themeMatch && startDateMatch && endDateMatch;
    });
    this.checkHasMoreEvents();
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedTheme = [];
    this.startDate = null;
    this.endDate = null;
    this.applyFilters();
  }
}
