export class Etudiant{
    // Attributs 
    idEtudiant: number;
    nom: string;
    mail: string;
    telephone: string;

    // Constructeur
    constructor(id: number, nom: string, email: string, telephone: string, annee: number){
        this.idEtudiant = id;
        this.nom = nom;
        this.mail = email;
        this.telephone = telephone;
    }
}