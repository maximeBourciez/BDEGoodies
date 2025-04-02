export class Goodie{
    // Attributs 
    idGoodie: number;
    nom: string;
    quantite: number;
    description: string;
    coutUnitaire: number;

    // Constructeur
    constructor(id: number, nom: string, quantite: number, description: string, coutUnitaire: number){
        this.idGoodie = id;
        this.nom = nom;
        this.quantite = quantite;
        this.description = description;
        this.coutUnitaire = coutUnitaire;
    }
}