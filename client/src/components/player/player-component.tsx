import { h, Component, Fragment } from 'preact';
import style from './player.scss';
import Player from '../../../../models/player';

type PlayerProps = {
    playerInfo: Player;
};

class PlayerComponent extends Component<PlayerProps> {
    constructor(props: PlayerProps) {
        super(props);
    }

    private numberWithCommas(x): string {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let classes = [style.player];
        if (this.props.playerInfo.hand === undefined) classes.push(style.inactive);

        return <div class={classes.join(' ')}>
            <img src="../../assets/avatar.jpg" alt="avatar" class={style.avatar} />
            <div class={style['bank-roll']}>${this.numberWithCommas(this.props.playerInfo.chips)}</div>
            <div>${this.numberWithCommas(this.props.playerInfo.bet)}</div>
        </div>
    }
}

export default PlayerComponent;