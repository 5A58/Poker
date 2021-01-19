import { h, Component, Fragment } from 'preact';
import Player from '../../../../models/player';
import Table from '../../../../models/table';
import TableComponent from '../../components/table/table-component';

type GameProps = {
    id: string;
}

class Game extends Component<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    render() {
        let table: Table = new Table();
        let player1: Player = new Player('Player 1', 1000);
        let player2: Player = new Player('Player 2', 5000);
        table.addPlayer(player1);
        table.addPlayer(player2);
        table.dealCards();
        console.log(`Player 1 has ${player1.hand?.card1} and ${player1.hand?.card2}`);
        console.log(`Player 2 has ${player2.hand?.card1} and ${player2.hand?.card2}`);
        table.revealCards();
        table.revealCards();
        table.revealCards();
        console.log(`Community cards: ${table.communityCards.map(card => card.toString()).join(',')}`);

        return <Fragment>
            <div>This is the page for Game {this.props.id}</div>
            <TableComponent tableInfo={table} />
        </Fragment>;
    }
}

export default Game;
