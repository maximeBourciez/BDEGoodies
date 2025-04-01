export class Evenement{
    // Attributs
    id: number;
    nom: string;
    lieu: string;
    date: Date;
    prix: number;
    capacite: number;
    theme: string;

    // Constructeur
    constructor(id: number, nom: string, lieu: string, date: Date, prix: number, capacite: number, theme: string){
        this.id = id;
        this.nom = nom;
        this.lieu = lieu;
        this.date = new Date(date);
        this.prix = prix;
        this.capacite = capacite;
        this.theme = theme;
    }
}