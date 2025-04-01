export class Etudiant{
    // Attributs 
    id: number;
    nom: string;
    email: string;
    telephone: string;

    // Constructeur
    constructor(id: number, nom: string, email: string, telephone: string){
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
    }
}