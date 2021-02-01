import Deck from './deck.js';
import Player from './player.js';
import Card from './card.js';
import Hand from './hand.js';

class Table {
    deck: Deck;
    players: Array<Player>;
    communityCards: Array<Card>;
    pots: Array<number>;
    startingChips: number;
    bigBlind: number;
    smallBlind: number;

    constructor() {
        this.players = [];
        this.deck = new Deck(true);
        this.communityCards = [];
        this.pots = [];
        // Hardcoding until settings are implemented
        this.startingChips = 100;
        this.bigBlind = Math.round(this.startingChips / 50);
        this.smallBlind = Math.round(this.startingChips / 100);
    }

    /**
     * Add a player to the table
     *
     * @param {string} Id - Id of player to add
     */
    addPlayer(id: string): void {
        this.players.push(new Player(id, this.startingChips));
    }

    /**
     * Remove a player from the table
     *
     * @param {string} id - Id of player to remove
     */
    removePlayer(id: string): void {
        this.players = this.players.filter(p => p.id !== id);
    }

    /**
     * Place a bet for a player
     *
     * @param {string} playerId - Id of player making the bet
     * @param {number} amount - Number of chips bet
     */
    placeBet(playerId: string, amount: number) {
        let player: Player = this.players.filter(p => p.id === playerId)[0];
        if (!player.removeChips(amount)) {
            player.foldHand();
            throw new Error(`Player ${playerId} cannot bet ${amount} with only ${player.getChipCount()} chips`);
        }
    }

    /**
     * Reset the table after a round
     */
    private resetTable(): void {
        this.deck = new Deck(true);
        this.communityCards = [];
        this.pots = [];
        this.players.forEach(player => {
            player.foldHand();
            player.amountBet = 0;
        });
    }


    /**
     * Deal two cards to all of the players at the table
     */
    private dealCards(): void {
        this.players.forEach(player => {
            player.setHand(new Hand(this.deck.draw(), this.deck.draw()));
        });
    }


    /**
     * Reveal the next community cards in the game sequence (i.e. flop, turn, river)
     */
    private revealCards(): void {
        let cardsRevealed: number = this.communityCards.length;
        if (cardsRevealed >= 5) {
            throw new Error('5 cards have already been revealed. The table need to be reset');
        }
        else if (cardsRevealed >= 3) {
            // The turn or river
            this.communityCards.push(this.deck.draw());
        }
        else {
            // Flop
            for (let i = 0; i < 3; i++) {
                this.communityCards.push(this.deck.draw());
            }
        }
    }
}

export default Table;