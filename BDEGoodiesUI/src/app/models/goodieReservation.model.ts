export class GoodieReservation {
    // Attributs
    idReservation: number;
    idGoodie: number;
    quantite: number;

    // Constructeur
    constructor(reservationId: number, goodieId: number, quantity: number) {
        this.idReservation = reservationId;
        this.idGoodie = goodieId;
        this.quantite = quantity;
    }
}
