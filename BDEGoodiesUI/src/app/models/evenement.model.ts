import { Etudiant } from './etudiant.model';

export class Evenement{
    // Attributs
    idEvenement: number;
    nom: string;
    lieu: string;
    dateHeure: Date;
    prix: number;
    capacite: number;
    theme: string;
    inscrits: Etudiant[] = [];

    // Constructeur
  constructor(
    idEvenement: number,
    nom: string,
    lieu: string,
    dateHeure: Date,
    prix: number,
    capacite: number,
    theme: string
  ) {
    this.idEvenement = idEvenement;
    this.nom = nom;
    this.lieu = lieu;
    this.dateHeure = new Date(dateHeure);
    this.prix = prix;
    this.capacite = capacite;
    this.theme = theme;
  }


}
