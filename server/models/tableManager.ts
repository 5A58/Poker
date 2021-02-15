import Player from './player.js';
import { default as Table, RedactedTableInfo } from './table.js';

class TableManager {
    private playerToTableId: { [playerId: string]: string };
    private tables: { [id: string]: Table };

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
        let player = this.tables[tableId]?.addPlayer(playerId);
        if (player !== undefined) {
            this.playerToTableId[playerId] = tableId;
        }
        return player;
    }

    /**
     * Remove player from their table (delete the table if it is empty)
     *
     * @param {string} playerId- Id of player
     * @return {string} - Return Id of table that the player was removed from
     */
    removePlayerFromTable(playerId: string): string | undefined {
        let tableId: string | undefined = this.playerToTableId[playerId];
        if (tableId === undefined) {
            return undefined;
        }
        delete this.playerToTableId[playerId];

        let table: Table | undefined = this.tables[tableId];
        if (table === undefined) {
            return undefined;
        }

        console.log(`Removing player ${playerId} from table ${tableId}`);
        table.removePlayer(playerId);
        if (Object.keys(table.players).length === 0) {
            delete this.tables[tableId];
            console.log(`Deleting table ${tableId} because it is empty`);
        }
        return tableId;
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

    constructor() {
        this.tables = {};
        this.playerToTableId = {};
    }
}

export default TableManager;