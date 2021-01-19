import { h, Component } from 'preact';
import CardComponent from '../../components/card/card-component';
import Deck from '../../../../models/deck';
import Card from '../../../../models/card';

type GameProps = {
    id: string;
}

class Game extends Component<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    render() {
        let deck = new Deck(false);
        let cards: Array<Card> = [];
        let card: Card | undefined = deck.draw();
        while (card !== undefined) {
            cards.push(card);
            card = deck.draw();
        }

        return <div>
            <div>This is the page for Game {this.props.id}</div>
            {cards.map(card => {
                return <CardComponent name={card.getShortName()} />
            })}
            <CardComponent />
        </div>;
    }
}

export default Game;
