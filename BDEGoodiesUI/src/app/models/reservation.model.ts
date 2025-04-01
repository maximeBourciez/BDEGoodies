
export enum StatutReservation{
    EnAttente = "En attente",
    Acceptee = "Acceptée",
    Refusee = "Refusée"
}

export class Reservation{
    // Attributs
    id: number;
    idEtudiant: number;
    idEvenement: number;
    dateReservation: Date;
    statut: StatutReservation;

    // Constructeur
    constructor(id: number, idEtudiant: number, idEvenement: number, dateReservation: Date, statut: StatutReservation){
        this.id = id;
        this.idEtudiant = idEtudiant;
        this.idEvenement = idEvenement;
        this.dateReservation = dateReservation;
        this.statut = statut;
    }
}