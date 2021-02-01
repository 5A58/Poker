import { h, Component } from 'preact';
import style from './table.scss';
import Table from '../../models/table';
import CardComponent from '../card/card-component';

type TableProps = {
    tableInfo: Table;
};

class TableComponent extends Component<TableProps> {
    constructor(props: TableProps) {
        super(props);
    }

    render() {
        let cards = this.props.tableInfo.communityCards.map(card => {
            return <CardComponent name={card.getShortName()} />
        });

        for (let i = cards.length; i < 5; i++) {
            let placeholder = <CardComponent display={false} />;
            cards.push(placeholder);
        }

        return <div class={style.table}>
            <div class={style['community-cards']}>
                {cards}
            </div>
        </div>
    }
}

export default TableComponent;