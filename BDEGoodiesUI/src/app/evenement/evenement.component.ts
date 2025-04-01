import { Component, Input } from '@angular/core';
import { Evenement } from '../models/evenement.model'; // Adjust the path as needed

@Component({
  selector: 'app-evenement',
  standalone: false,
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.scss'
})
export class EvenementComponent {
  @Input() event!: Evenement;

  // constructeur
  constructor() {
  }
  // Méthodes
}
