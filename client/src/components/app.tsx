import { h, render, Component } from 'preact';
import CardComponent from './cardComponent';

class App extends Component<{}, {}> {
    render() {
        return <div><CardComponent name='KS' /></div>;
    }
}

export default App;