import { RANKTONAME, SUITTONAME } from "../../../server/models/constants";

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
}

export default Card;