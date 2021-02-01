import { h, Component } from 'preact';
import style from './card.scss';

type CardProps = {
    name?: string;
    pocketCard?: boolean;
    display?: boolean;
};

class CardComponent extends Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render({ name = 'blank', pocketCard = false, display = true }: CardProps) {
        let path = `../../assets/${name}.svg`;
        let classes = [style.card];
        if (display === false) classes.push(style.hide);
        if (pocketCard === true) classes.push(style.pocket);
        if (name === undefined) classes.push(style.back);
        return <img src={path} class={classes.join(' ')}></img>;
    }
}

export default CardComponent;