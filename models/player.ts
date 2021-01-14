import Hand from './hand.js';

export default class Player {
    id: string
    chips: number
    hand: Hand | undefined

    constructor() {
        this.id = '1';
        this.chips = 0;
    }


    /**
     * Set the player's hand
     *
     * @param {Hand} hand - Hand reference
     */
    setHand(hand: Hand): void {
        this.hand = hand;
    }


    /**
     * Fold the current hand
     */
    foldHand(): void {
        this.hand = undefined;
    }

    /**
     * Return the number of chips that the player has
     *
     * @return {number} - Number of chips that the player has
     */
    getChipCount(): number {
        return this.chips;
    }


    /**
     * Add chips to the player's bankroll
     *
     * @param {number} chips - Number of chips to add
     */
    addChips(chips: number): void {
        this.chips += chips
    }


    /**
     * Remove chips from the player's bankroll
     *
     * @param {number} chips - Number of chips to remove
     * @return {boolean} - True if chips were removed
     */
    removeChips(chips: number): boolean {
        if (this.chips - chips < 0) {
            return false;
        }
        this.chips -= chips;
        return true;
    }
}