import Deck from './deck';
import Player from './player';
import Card from './card';

export default class Table {
    deck: Deck;
    players: Array<Player>;
    communityCards: Array<Card>;
    pots: Array<number>;

    constructor() {
        this.deck = new Deck();
        this.players = [];
        this.communityCards = [];
        this.pots = [];
    }

    /**
     * Add a player to the table
     *
     * @param {Player} player - Player to add
     */
    addPlayer(player: Player): void {
        this.players.push(player);
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
    resetTable(): void {
        this.deck = new Deck();
        this.communityCards = [];
        this.pots = [];
    }
}