import Player from './player.js';
import { default as Table, RedactedTableInfo } from './table.js';

class TableManager {
    private tables: { [id: string]: Table };

    constructor() {
        this.tables = {};
    }

    /**
     * Add a new player to a table (create the table if it does not exist)
     *
     * @param {string} playerId - Id of player
     * @param {string} tableId - Id of table
     * @return {boolean} - True if the addition was successful
     */
    addPlayerToTable(playerId: string, tableId: string): Player | undefined {
        // Create the table if it does not exist
        if (this.tables[tableId] === undefined) {
            console.log(`Creating new table with Id: ${tableId}`);
            this.tables[tableId] = new Table();
        }

        // Add the player to the table
        return this.tables[tableId]?.addPlayer(playerId);
    }

    /**
     * Remove player from their table (delete the table if it is empty)
     *
     * @param {string} tableId- Id of table
     * @param {string} playerId- Id of player
     * @return {boolean} - True if the player was successfully found and removed
     */
    removePlayerFromTable(tableId: string, playerId: string): boolean {
        let table: Table | undefined = this.tables[tableId];
        if (table === undefined) {
            return false;
        }

        console.log(`Removing player ${playerId} from table ${tableId}`);
        table.removePlayer(playerId);
        if (table.playerCount() === 0) {
            delete this.tables[tableId];
            console.log(`Deleting table ${tableId} because it is empty`);
        }
        return true;
    }


    /**
     * Increment the game clock of a given table
     *
     * @param {string} tableId - Id of table
     */
    incrementGameClock(tableId: string): void {
        let table = this.tables[tableId];
        if (table !== undefined) {
            return table.incrementGameClock();
        }
    }

    /**
     * Get redacted table info
     *
     * @param {string} tableId - Id of table
     * @return {RedactedTableInfo} - Redacted table info
     */
    getTableInfo(tableId: string): RedactedTableInfo {
        return this.tables[tableId].toJSON();
    }
}

export default TableManager;