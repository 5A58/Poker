import { RANKTONAME, SUITTONAME } from "./constants.js";

class Card {
    value: number;
    suit: number;

    constructor(value: number, suit: number) {
        this.value = value;
        this.suit = suit;
    }

    /**
     * Get the string equivalent of a card
     *
     * @return {string} Card as a string
     */
    toString(): string {
        return `${RANKTONAME[this.value]} of ${SUITTONAME[this.suit]}`;
    }

    /**
     * Get short name to use for rendering assets (e.g. 2H for 2 of hearts)
     *
     * @return {string} Short name of card 
     */
    getShortName(): string {
        return `${RANKTONAME[this.value]}${SUITTONAME[this.suit].charAt(0).toUpperCase()}`;
    }

    /**
     * Compare the value of 2 cards for sorting in descending order
     * n < 0: card1 comes first
     * n = 0: card1 and card2 are unchanged
     * n > 0: card2 comes first
     * 
     * @param {Card} card1
     * @param {Card} card2
     * @return {number} - Value of card 1 relative to card 2 
     */
    compareCards(card1: Card, card2: Card): number {
        return card2.value - card1.value;
    }
}

export default Card;