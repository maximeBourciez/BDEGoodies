export class Goodie{
    // Attributs 
    id: number;
    nom: string;
    quantite: number;
    description: string;
    coutUnitaire: number;

    // Constructeur
    constructor(id: number, nom: string, quantite: number, description: string, coutUnitaire: number){
        this.id = id;
        this.nom = nom;
        this.quantite = quantite;
        this.description = description;
        this.coutUnitaire = coutUnitaire;
    }
}