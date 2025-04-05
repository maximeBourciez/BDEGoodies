import {Etudiant} from './etudiant.model';

export enum StatutReservation{
    EnAttente = "En attente",
    Confirmée = "Confirmée",
    Annulée = "Annulée"
}

export class Reservation{
    // Attributs
    idReservation: number;
    idEtudiant: number;
    idEvenement: number;
    dateReservation: Date;
    statut: StatutReservation;
    etudiant!: Etudiant;

    // Constructeur
    constructor(id: number, idEtudiant: number, idEvenement: number, dateReservation: Date, statut: StatutReservation){
        this.idReservation = id;
        this.idEtudiant = idEtudiant;
        this.idEvenement = idEvenement;
        this.dateReservation = dateReservation;
        this.statut = statut;
    }

    // Méthodes
    setEtudiant(etudiant: Etudiant){
      this.etudiant = etudiant;
    }
}
