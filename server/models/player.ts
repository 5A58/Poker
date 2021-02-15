import Card from './card.js';
import Hand from './hand.js';

class Player {
    id: string;
    chips: number;
    hand: Hand | undefined;
    amountBet: number;

    constructor(id: string, chips: number) {
        this.id = id;
        this.chips = chips;
        this.hand = undefined;
        this.amountBet = 0;
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


    /**
     * Get redacted player info
     *
     * @return {Player} - Redacted player info
     */
    toJSON(): Player {
        let temp = new Player(this.id, this.chips);
        temp.hand = this.hand === undefined ? this.hand : new Hand(new Card(0, 0), new Card(0, 0));
        temp.amountBet = this.amountBet;
        return temp;
    }
}

export default Player;