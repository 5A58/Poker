import { h, Component, Fragment } from 'preact';
import style from './player.scss';
import Player from '../../models/player';

type PlayerProps = {
    playerInfo: Player;
    index: number | undefined;
};

class PlayerComponent extends Component<PlayerProps> {
    constructor(props: PlayerProps) {
        super(props);
    }

    private numberWithCommas(x: number): string {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }


    /**
     * Get additional styles for the player based on the index
     * @return {string} - Class name
     */
    private getStyleForIndex(): string {
        switch (this.props.index) {
            case 1:
                return style['player-1']
            case 2:
                return style['player-2']
            case 3:
                return style['player-3']
            case 4:
                return style['player-4']
            case 5:
                return style['player-5']
            case 6:
                return style['player-6']
            case 7:
                return style['player-7']
            case 8:
                return style['player-8']
            case 9:
                return style['player-9']
            default:
                return "";
        }
    }

    render() {
        let classes = [style.player];
        this.props.playerInfo.isUser ? classes.push(style.user) : classes.push(this.getStyleForIndex());
        if (this.props.playerInfo.hand === undefined) classes.push(style.inactive);

        return <div class={classes.join(' ')}>
            <img src="../../assets/avatar.jpg" alt="avatar" class={style.avatar} />
            <div class={style['bank-roll']}>${this.numberWithCommas(this.props.playerInfo.chips)}</div>
            <div>${this.numberWithCommas(this.props.playerInfo.amountBet)}</div>
        </div>
    }
}

export default PlayerComponent;