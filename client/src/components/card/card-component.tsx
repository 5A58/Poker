import { h, Component } from 'preact';
import style from "./card.css";

type CardProps = {
    name?: string;
};

class CardComponent extends Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        let path = `../../assets/${this.props.name ?? 'back'}.svg`;
        let classes = [style.card];
        if (this.props.name === undefined) classes.push(style.back);
        return <img src={path} class={classes.join(' ')}></img>;
    }
}

export default CardComponent;