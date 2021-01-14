export default class Card {
    rank: string;
    suit: string;

    constructor(rank: string, suit: string) {
        this.rank = rank;
        this.suit = suit;
    }


    /**
     * Get the string equivalent of a card
     *
     * @return {string} Card as a string
     */
    toString(): string {
        return `${this.rank} of ${this.suit}`;
    }
}