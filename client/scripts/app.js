import { h, render, Component } from './vendor/preact.min.js';
import Clock from './components/clock.js';

class App extends Component {
    render() {
        return <div><Clock /></div>;
    }
}

render(<App />, document.body);

// window.onload = () => {
    // let deck = new Deck();
    // deck.cards.forEach(card => {
    //     console.log(card.toString());
    //     renderCard(card);
    // });
    // renderAsset('assets/back.svg');
// }

// function renderCard(card) {
//     let imageName = `${card.rank}${card.suit.charAt(0)}`;
//     let path = `assets/${imageName}.svg`;
//     renderAsset(path);
// }

// function renderAsset(path) {
//     let img = document.createElement("img");
//     img.src = path;
//     document.querySelector("body").appendChild(img);
// }