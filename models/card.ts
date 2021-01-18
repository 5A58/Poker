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


    /**
     * Get short name to use for rendering assets (e.g. 2H for 2 of hearts)
     *
     * @return {string} Short name of card 
     */
    getShortName(): string {
        return `${this.rank}${this.suit.charAt(0).toUpperCase()}`;
    }
}