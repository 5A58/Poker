import Hand from './hand';

class Player {
    id: string;
    chips: number;
    isUser: boolean;
    amountBet: number;
    hand: Hand | undefined;

    constructor(id: string, chips: number, isUser: boolean) {
        this.id = id;
        this.chips = chips;
        this.isUser = isUser;
        this.amountBet = 0;
    }
}

export default Player;