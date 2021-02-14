import { h, Component } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import Home from '../routes/home/home';
import Game from '../routes/game/game';

type AppState = {
    currentUrl: string
};

class App extends Component<{}, AppState> {
    handleRoute = (e: RouterOnChangeArgs) => {
        this.setState({ currentUrl: e.url })
    };

    render() {
        return <div id="app">
            <Router onChange={this.handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/:gameId" component={Game} />
            </Router>
        </div>
    }
}

export default App;