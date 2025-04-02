import { Component, inject } from '@angular/core';
import { Goodie } from '../../models/goodie.model';
import { GoodiesService } from '../../services/goodies.service';

@Component({
  selector: 'app-list-goodies',
  standalone: false,
  templateUrl: './list-goodies.component.html',
  styleUrl: './list-goodies.component.scss'
})
export class ListGoodiesComponent {
  // Attributs
  goodies: Goodie[]= [];
  private readonly goodieService: GoodiesService = inject(GoodiesService);

  // Constructeur
  constructor() {
  }

  // Initialisation
  ngOnInit(): void {
    this.goodieService.getGoodies().subscribe((goodies) => {
      this.goodies = goodies;
    });
  }
}