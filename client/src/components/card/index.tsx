import { h, Component } from 'preact';
import * as style from "./style.css";

type CardProps = {
    name?: string
};

class CardComponent extends Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render(props: CardProps) {
        let path = `../../assets/${props.name ?? 'back'}.svg`;
        return <img src={path} class={style.card}></img>;
    }
}

export default CardComponent;