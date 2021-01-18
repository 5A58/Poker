import { h, Component } from 'preact';
import CardComponent from './card';
import Deck from '../../../models/deck';
import Card from '../../../models/card';

class App extends Component {
    render() {
        let deck = new Deck(false);
        let cards: Array<Card> = [];
        let card: Card | undefined = deck.draw();
        while (card !== undefined) {
            console.log("Drew " + card.toString());
            cards.push(card);
            card = deck.draw();
        }

        return <div>
            {cards.map(card => {
                return <CardComponent name={card.getShortName()} />
            })}
            <CardComponent />
        </div>;
    }
}

export default App;