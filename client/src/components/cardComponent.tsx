import { h, Component } from 'preact';

type CardProps = {
    name: string
};

type CardState = {
};

class CardComponent extends Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
    }

    render(props: CardProps, state: CardState) {
        let path = `../assets/${props.name}.svg`;
        return <img src={path} class="card"></img>;
    }
}

export default CardComponent;