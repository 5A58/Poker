import { h, Component } from 'preact';
import { io } from "socket.io-client";
import Player from '../../../../server/models/player';
import { RedactedTableInfo } from '../../../../server/models/table';
import PlayerComponent from '../../components/player/player-component';
import TableComponent from '../../components/table/table-component';
import CardComponent from '../../components/card/card-component';
import style from './game.scss';
import Hand from '../../../../server/models/hand';
import Card from '../../../../server/models/card';

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
        const socket = io('/' + this.props.gameId);

        socket.on('connect', () => {
            this.setState({ socketId: socket.id });
            socket.emit('join table');
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

        socket.on('table full', () => {
            // TODO: Add proper handling
            console.log('Unable to join table. Maximum capacity reached.')
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
            <TableComponent tableInfo={table}>
                {otherPlayers.map((player, index) => {
                    return <PlayerComponent playerInfo={player} index={index + 1} isUser={false} />
                })}
                {user && <PlayerComponent playerInfo={user} index={undefined} isUser={true} />}
            </TableComponent>
            <div class={style.footer}>
                <div class={[style['control-panel'], style.left].join(' ')}>
                    <div class={style.control}>Start Game</div>
                </div>
                <div class={style['pocket-cards']}>
                    {<CardComponent name={"JS"} pocketCard={true} />}
                    {<CardComponent name={"10H"} pocketCard={true} />}
                    {/* {user?.hand?.card1 && <CardComponent name={user?.hand?.card1.getShortName()} pocketCard={true} />}
                    {user?.hand?.card2 && <CardComponent name={user?.hand?.card2.getShortName()} pocketCard={true} />} */}
                </div>
                <div class={[style['control-panel'], style.right].join(' ')}>
                    <div class={style.control}>Place Bid</div>
                </div>
            </div>
        </div>;
    }
}

export default Game;
