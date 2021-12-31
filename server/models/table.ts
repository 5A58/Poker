import Deck from './deck.js';
import Player from './player.js';
import Card from './card.js';
import Hand from './hand.js';
import { MAXPLAYERS } from './constants.js';

type RedactedTableInfo = {
    players: { [playerId: string]: Player };
    communityCards: Array<Card>;
    bigBlind: number;
    smallBlind: number;
    gameStarted: boolean;
};

class Table {
    deck: Deck;
    players: { [playerId: string]: Player };
    communityCards: Array<Card>;
    gameStarted: boolean;
    startingChips: number;
    bigBlind: number;
    smallBlind: number;

    constructor() {
        this.players = {};
        this.deck = new Deck(true);
        this.communityCards = [];
        this.gameStarted = false;
        // Hardcoding until settings are implemented
        this.startingChips = 100;
        this.bigBlind = Math.round(this.startingChips / 50);
        this.smallBlind = Math.round(this.startingChips / 100);
    }

    /**
     * Add a player to the table
     *
     * @param {string} Id - Id of player to add
     * @return {(Player | undefined)} - Player object if player is added, else undefined
     */
    addPlayer(id: string): Player | undefined {
        if (this.playerCount() < MAXPLAYERS && this.players[id] === undefined) {
            let player = new Player(id, this.startingChips);
            this.players[id] = player;
            return player;
        }
        return undefined;
    }

    /**
     * Remove a player from the table
     *
     * @param {string} id - Id of player to remove
     */
    removePlayer(id: string): void {
        delete this.players[id];
    }

    /**
     * Place a bet for a player
     *
     * @param {string} playerId - Id of player making the bet
     * @param {number} amount - Number of chips bet
     */
    placeBet(playerId: string, amount: number) {
        let player: Player = this.players[playerId];
        if (!player?.removeChips(amount)) {
            // Player does not exist or front-end validation was bypassed
            player.foldHand();
            console.log(`Player ${playerId} cannot bet ${amount} with only ${player.getChipCount()} chips`);
        }
    }

    /**
     * Get redacted player info
     *
     * @return {RedactedTableInfo} - Redacted table info
     */
    toJSON(): RedactedTableInfo {
        let redactedPlayerInfo: { [playerId: string]: Player } = {};
        for (let playerId in this.players) {
            redactedPlayerInfo[playerId] = this.players[playerId].toJSON();
        }
        return {
            players: redactedPlayerInfo,
            communityCards: this.communityCards,
            bigBlind: this.bigBlind,
            smallBlind: this.smallBlind,
            gameStarted: this.gameStarted
        };
    }


    /**
     * Get the number fo playres at the table
     *
     * @return {number} - Number of players at the table
     */
    playerCount(): number {
        return Object.keys(this.players).length;
    }

    incrementGameClock(): void {
        if (!this.gameStarted) {
            this.dealCards();
        }
    }

    /**
     * Reset the table after a round
     */
    private resetTable(): void {
        this.deck = new Deck(true);
        this.communityCards = [];
        this.forEachPlayer(player => {
            player.foldHand();
            player.amountBet = 0;
        });
    }


    /**
     * Deal two cards to all of the players at the table
     */
    private dealCards(): void {
        this.forEachPlayer(player => {
            player.setHand(new Hand(this.deck.draw(), this.deck.draw()))
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


    /**
     * Perform an operation on each player at the table
     *
     * @param {(value: Player) => void} callbackfn - Function to perform operation on a player
     */
    private forEachPlayer(callbackfn: (value: Player) => void): void {
        Object.keys(this.players).forEach(playerId => {
            let player: Player = this.players[playerId];
            callbackfn(player);
        });
    }
}

export { Table as default, RedactedTableInfo };