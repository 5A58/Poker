import Player from './player';
import Card from './card';

class Table {
    players: { [id: string]: Player };
    communityCards: Array<Card>;

    constructor() {
        this.players = {};
        this.communityCards = [];
    }

    /**
     * Add a player to the table
     *
     * @param {string} id - Id of player to add
     * @param {number} chips - Number of chips that the player has
     */
    addPlayer(id: string, chips: number, isUser: boolean = false): void {
        this.players[id] = new Player(id, chips, isUser);
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
     * Add a community card to the table
     * @param {Card} card
     */
    addCommunityCard(card: Card): void {
        this.communityCards.push(card);
    }


    /**
     * Remove all of the community cards
     */
    clearCommunityCards(): void {
        this.communityCards = [];
    }

}

export default Table;