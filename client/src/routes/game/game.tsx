import { h, Component, Fragment } from 'preact';
import Player from '../../models/player';
import Table from '../../models/table';
import PlayerComponent from '../../components/player/player-component';
import TableComponent from '../../components/table/table-component';
import Card from '../../models/card';

type GameProps = {
    id: string;
}

class Game extends Component<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    render() {
        let table: Table = new Table();
        table.addPlayer('Player 1', 1000);
        table.addPlayer('Player 2', 5000);
        table.addCommunityCard(new Card(14, 1));
        table.addCommunityCard(new Card(13, 1));
        table.addCommunityCard(new Card(12, 1));

        return <Fragment>
            <div>This is the page for Game {this.props.id}</div>
            <TableComponent tableInfo={table} />
            {table.players.map(player => {
                return <PlayerComponent playerInfo={player} />
            })}
        </Fragment>;
    }
}

export default Game;
