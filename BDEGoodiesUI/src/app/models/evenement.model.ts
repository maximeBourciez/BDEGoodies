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
    constructor(id: number, nom: string, lieu: string, date: Date, prix: number, capacite: number, theme: string){
        this.idEvenement = id;
        this.nom = nom;
        this.lieu = lieu;
        this.dateHeure = new Date(date);
        this.prix = prix;
        this.capacite = capacite;
        this.theme = theme;
    }
}