import { Component, inject, Input } from '@angular/core';
import { Goodie } from '../models/goodie.model';

@Component({
  selector: 'app-goodie',
  standalone: false,
  templateUrl: './goodie.component.html',
  styleUrl: './goodie.component.scss'
})
export class GoodieComponent {
  @Input() goodie!: Goodie;

  // constructeur
  constructor() {
  }

  // Initialisation
  
}
