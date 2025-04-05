export interface Goodie {
  idGoodie: number;
  nom: string;
  quantite: number;
  description: string;
  coutUnitaire: number;
}

export interface GoodieStock extends Goodie {
  stock_restant: number;
}
