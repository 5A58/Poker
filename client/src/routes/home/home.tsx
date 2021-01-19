import { h, Component, Fragment } from 'preact';
import style from './home.scss';

class Home extends Component {
    render() {
        return <Fragment>
            <h1>Pickup Poker Home Page</h1>
            <a href="/123" class={style.button}>Play</a>
        </Fragment>;
    }
}

export default Home;
