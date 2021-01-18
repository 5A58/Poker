import { h, Component } from 'preact';
import CardComponent from './card';

class App extends Component {
    render() {
        return <div>
            <CardComponent name="AS" />
            <CardComponent />
        </div>;
    }
}

export default App;