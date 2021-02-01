import Hand from './hand';

class Player {
    id: string;
    chips: number;
    amountBet: number;
    hand: Hand | undefined;

    constructor(id: string, chips: number) {
        this.id = id;
        this.chips = chips;
        this.amountBet = 0;
    }
}

export default Player;