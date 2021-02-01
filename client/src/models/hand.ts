import Card from './card';

class Hand {
    private card1: Card;
    private card2: Card;

    constructor(card1: Card, card2: Card) {
        this.card1 = card1;
        this.card2 = card2;
    }
}

export default Hand;