export interface Goodie {
  idGoodie: number;
  nom: string;
  quantite: number;
  description: string;
  coutUnitaire: number;
  stock_restant?: number; // Devenu optionnel
}
