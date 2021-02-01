import { RANKS, SUITS } from './constants.js';
import Card from './card.js';

class Deck {
    private cards: Array<Card>

    constructor(shuffle: boolean = true) {
        this.cards = [];

        RANKS.forEach(rank =>
            SUITS.forEach(suit =>
                this.cards.push(new Card(rank, suit))));

        if (shuffle) {
            this.shuffle();
        }
    }


    /**
     * Randomly reorder the deck of card
     * Uses the modern version of the Fisher–Yates shuffle
     */
    private shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            // Random integer such that 0 ≤ j ≤ i
            let j = Math.floor(Math.random() * (i + 1));

            // Exchange a[j] and a[i]
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }


    /**
     * Return the next card in the deck
     *
     * @return {Card} The next card in the deck or undefined if empty
     */
    draw(): Card {
        let card = this.cards.pop();
        if (card !== undefined) return card;
        throw new Error('Cannot draw any more cards. Deck is empty.');
    }


    /**
     * Return the number of cards remaining in the deck
     *
     * @return {number} Number of cards in the deck
     */
    count(): number {
        return this.cards.length;
    }
}

export default Deck;