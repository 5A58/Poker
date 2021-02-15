import { h, Component } from 'preact';
import { io } from "socket.io-client";
import Player from '../../../../server/models/player';
import { RedactedTableInfo } from '../../../../server/models/table';
import PlayerComponent from '../../components/player/player-component';
import TableComponent from '../../components/table/table-component';
import CardComponent from '../../components/card/card-component';
import style from './game.scss';

type GameProps = {
    gameId: string;
}

type GameState = {
    table: RedactedTableInfo;
    socketId: string;
};

class Game extends Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
    }

    componentDidMount() {
        // The server URL will be deduced from the window.location object
        const socket = io();

        let path = window.location.pathname;
        path = path[0] == '/' ? path.substr(1) : path;

        socket.on('connect', () => {
            this.setState({ socketId: socket.id });
            socket.emit('join table', path)
        });

        socket.on('add player', (player: Player) => {
            console.log(`New player joined the table with Id: ${player.id}`);
            this.setState(prevState => {
                let table: RedactedTableInfo = prevState.table;
                table.players[player.id] = player;
                return { table: table };
            });
        });

        socket.on('remove player', (playerId: string) => {
            console.log(`Player with Id ${playerId} left the table`);
            this.setState(prevState => {
                let table: RedactedTableInfo = prevState.table;
                delete table?.players[playerId];
                return { table: table };
            });
        });

        socket.on('initialize table', (tableInfo: RedactedTableInfo) => {
            this.setState({ table: tableInfo });
        });
    }

    render() {
        const { table, socketId } = this.state;
        let user: Player | undefined;
        let otherPlayers: Array<Player> = [];

        if (table !== undefined) {
            for (let playerId in table.players) {
                let player: Player = table.players[playerId];
                if (player.id === socketId) {
                    user = player;
                } else {
                    otherPlayers.push(player);
                }
            }
        }

        return <div class={style['game-container']}>
            <div>This is the page for Game {this.props.gameId}</div>
            <TableComponent tableInfo={table}>
                {otherPlayers.map((player, index) => {
                    return <PlayerComponent playerInfo={player} index={index + 1} isUser={false} />
                })}
                {user && <PlayerComponent playerInfo={user} index={undefined} isUser={true} />}
            </TableComponent>
            <div class={style['pocket-cards']}>
                {user?.hand?.card1 && <CardComponent name={user?.hand?.card1.getShortName()} pocketCard={true} />}
                {user?.hand?.card2 && <CardComponent name={user?.hand?.card2.getShortName()} pocketCard={true} />}
            </div>
        </div>;
    }
}

export default Game;
