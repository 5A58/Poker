import Card from './card.js';

class Hand {
    private card1: Card;
    private card2: Card;

    constructor(card1: Card, card2: Card) {
        // Sort cards in descending order
        let card1Higher: boolean = card1.value >= card2.value;
        this.card1 = card1Higher ? card1 : card2;
        this.card2 = card1Higher ? card2 : card1;
    }

    /**
     * Get the value of the hand (does not consider kickers)
     *
     * @param {Array<Card>} communityCards - Community cards sorted in descending value
     * @return {number} - Value of the hand
     */
    getValue(communityCards: Array<Card>): number {
        let result: Result = this.calculateResult(communityCards);

        // Return point value
        if (result.hasStraightFlush) {
            if (result.straightValue == 14) {
                return 10; // Royal flush
            }
            return 9;
        }
        else if (result.hasFourOfAKind) {
            return 8;
        }
        else if (result.hasThreeOfAKind && result.hasPair) {
            return 7; // Full house
        }
        else if (result.hasFlush) {
            return 6;
        }
        else if (result.hasStraight) {
            return 5;
        }
        else if (result.hasThreeOfAKind) {
            return 4;
        }
        else if (result.hasTwoPair) {
            return 3;
        }
        else if (result.hasPair) {
            return 2;
        }
        else {
            return 1; // High card
        }
    }


    /**
     * Evaluate the hand and aggregate the results
     *
     * @param {Array<Card>} communityCards - Community cards sorted in descending value
     * @return {Result} - Data about the contents of the hand
     */
    private calculateResult(communityCards: Array<Card>): Result {
        let result = new Result();
        let sortedCards: Array<Card> = this.sortCards(communityCards);
        sortedCards.push(new Card(-1, -1)); // add dummy card to complete counts at end
        let totalSuitCount: Array<number> = [0, 0, 0, 0];

        // Temp variables for counting
        let duplicateCount: number = 0;
        let lastValue: number = 100; // arbitrary number > max card value
        let straightCount: number = 0;
        let straightFlushSuits: Array<Array<number>> = []; // array of array of suits

        for (let i = 0; i < sortedCards.length; i++) {
            let currentCard: Card = sortedCards[i];
            if (currentCard.value > lastValue) {
                throw 'Pocket or community cards are not sorted in descending order';
            }
            else if (currentCard.value === lastValue) {
                // Duplicate, straight is paused but another suit is added
                duplicateCount++;
            }
            else {
                // Finished counting duplicates, determine results
                if (duplicateCount == 1) {
                    // No pair, short circuit
                }
                else if (duplicateCount == 2) {
                    result.hasTwoPair = result.hasPair;
                    result.hasPair = true;
                }
                else if (duplicateCount == 3) {
                    result.hasThreeOfAKind = true;
                }
                else if (duplicateCount == 4) {
                    result.hasFourOfAKind = true;
                }
                duplicateCount = 1; // reset count

                // Evaluate straight before adding current card
                if (straightCount == 5) {
                    let straightValue: number = lastValue + 4;
                    result.hasStraight = true;
                    result.straightValue = Math.max(result.straightValue, straightValue);

                    // Evaluate straight flush
                    if (this.hasStraightFlush(straightFlushSuits)) {
                        result.hasStraightFlush = true;
                        result.straightFlushValue = Math.max(result.straightFlushValue, straightValue);
                    }

                    // Shift 5 value window
                    straightCount--;
                    straightFlushSuits.shift();
                }

                // Process current card
                if ((currentCard.value + 1) === lastValue) {
                    // Straight continues
                    straightCount++;
                    straightFlushSuits.push([]);
                }
                else {
                    // Reset counts
                    straightCount = 1;
                    straightFlushSuits = [[]];
                }
            }

            straightFlushSuits[straightFlushSuits.length - 1].push(currentCard.suit);
            totalSuitCount[currentCard.suit] += 1;
            lastValue = currentCard.value;
        }
        result.hasFlush = this.hasFlush(totalSuitCount);
        return result;
    }

    /**
     * Sort pocket cards and community cards
     *
     * @param {Array<Card>} communityCards - Community cards sorted in descending order
     * @return {Array<Card>} - Sorted pocket cards and community cards
     */
    private sortCards(communityCards: Array<Card>): Array<Card> {
        let sortedCard1: boolean = false;
        let sortedCard2: boolean = false;
        let result: Array<Card> = [];

        for (let i = 0; i < (communityCards.length + 2); i++) {
            let nextCard: Card;

            if (sortedCard2) {
                // Sorted both pocket cards already
                nextCard = communityCards[i - 2];
            } else if (sortedCard1) {
                // Only sorted card1
                let card2Greater: boolean = this.card2.value >= (communityCards[i - 1]?.value ?? -1);
                if (card2Greater) {
                    nextCard = this.card2;
                    sortedCard2 = true;
                } else {
                    nextCard = communityCards[i - 1];
                }
            } else {
                // None of the pocket cards have been sorted
                let card1Greater: boolean = this.card1.value >= (communityCards[i]?.value ?? -1);
                if (card1Greater) {
                    nextCard = this.card1;
                    sortedCard1 = true;
                } else {
                    nextCard = communityCards[i];
                }
            }
            result.push(nextCard);
        }
        return result;
    }


    /**
     * Determine if the suit counts constitute a flush
     *
     * @param {Array<number>} suitCounts - 1x4 array containing counts for each suit
     * @return {boolean} - True if the suit counts constitute a flush
     */
    private hasFlush(suitCounts: Array<number>): boolean {
        for (let i = 0; i < suitCounts.length; i++) {
            if (suitCounts[i] >= 5) {
                return true;
            }
        }
        return false;
    }


    /**
     * Determine if a suit windows constitute a flush
     *
     * @private
     * @param {Array<Array<number>>} suitWindows - Array of array of suits
     * @return {boolean} - True if the suit windows constitute a flush
     */
    private hasStraightFlush(suitWindows: Array<Array<number>>): boolean {
        let suitCounts: Array<number> = [0, 0, 0, 0];

        suitWindows.forEach(window => {
            window.forEach(suit => {
                suitCounts[suit] += 1;
            });
        });

        for (let i = 0; i < suitCounts.length; i++) {
            if (suitCounts[i] >= 5) {
                return true;
            }
        }
        return false;
    }
}


/**
 * Class for recording information about a hand
 */
class Result {
    public hasFourOfAKind: boolean;
    public hasThreeOfAKind: boolean;
    public hasTwoPair: boolean;
    public hasPair: boolean;
    public hasFlush: boolean;
    public hasStraight: boolean;
    public straightValue: number;
    public hasStraightFlush: boolean;
    public straightFlushValue: number;

    constructor() {
        this.hasFourOfAKind = false;
        this.hasThreeOfAKind = false;
        this.hasTwoPair = false;
        this.hasPair = false;
        this.hasFlush = false;
        this.hasStraight = false;
        this.straightValue = -1;
        this.straightFlushValue = -1;
        this.hasStraightFlush = false;
    }
}

export default Hand;