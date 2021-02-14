import { h, Component, Fragment } from 'preact';
import { io } from "socket.io-client";
import Player from '../../models/player';
import Table from '../../models/table';
import PlayerComponent from '../../components/player/player-component';
import TableComponent from '../../components/table/table-component';
import CardComponent from '../../components/card/card-component';
import Card from '../../models/card';
import Hand from '../../models/hand';
import style from './game.scss';

type GameProps = {
    gameId: string;
}

class Game extends Component<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    componentDidMount() {
        // The server URL will be deduced from the window.location object
        const socket = io();

        socket.on('connect', () => {
            // either with send()
            socket.send('Hello server from ' + socket.id);
        });

        // handle the event sent with socket.send()
        socket.on('message', (data: any) => {
            console.log(data);
        });
    }

    render() {
        let table: Table = new Table();
        table.addPlayer('Player 1', 1000);
        table.addPlayer('Player 2', 10000, true);
        table.addPlayer('Player 3', 5000);
        table.addPlayer('Player 4', 5000);
        table.addPlayer('Player 5', 5000);
        table.addPlayer('Player 6', 5000);
        // table.addPlayer('Player 7', 5000);
        // table.addPlayer('Player 8', 5000);
        // table.addPlayer('Player 9', 5000);
        // table.addPlayer('Player 10', 5000);
        table.addCommunityCard(new Card(14, 1));
        table.addCommunityCard(new Card(13, 1));
        table.addCommunityCard(new Card(12, 1));

        table.players['Player 1'].hand = new Hand(new Card(5, 1), new Card(6, 1));
        table.players['Player 1'].amountBet = 3000;
        table.players['Player 2'].hand = new Hand(new Card(10, 2), new Card(3, 3));
        table.players['Player 2'].amountBet = 5000;

        let user: Player | undefined;
        let otherPlayers: Array<Player> = [];

        for (let key in table.players) {
            let player: Player = table.players[key];
            if (player.isUser) {
                user = player;
            } else {
                otherPlayers.push(player);
            }
        }

        return <div class={style['game-container']}>
            <div>This is the page for Game {this.props.gameId}</div>
            <TableComponent tableInfo={table}>
                {otherPlayers.map((player, index) => {
                    return <PlayerComponent playerInfo={player} index={index + 1} />
                })}
                {user && <PlayerComponent playerInfo={user} index={undefined} />}
            </TableComponent>
            <div class={style['pocket-cards']}>
                {user?.hand?.card1 && <CardComponent name={user?.hand?.card1.getShortName()} pocketCard={true} />}
                {user?.hand?.card2 && <CardComponent name={user?.hand?.card2.getShortName()} pocketCard={true} />}
            </div>
        </div>;
    }
}

export default Game;
