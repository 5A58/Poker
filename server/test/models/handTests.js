import chai from 'chai';
import Hand from '../../../dist/models/hand.js';
import Card from '../../../dist/models/card.js';
const assert = chai.assert;

describe('Hand', () => {
    describe('constructorSort', () => {
        it('Card1.value > Card2.value', () => {
            const card1 = new Card(10, 1);
            const card2 = new Card(9, 2);
            const hand = new Hand(card1, card2);
            assert.strictEqual(hand.card1, card1, 'Higher value card should be card 1');
            assert.strictEqual(hand.card2, card2, 'Lower value card should be card 2');
        });

        it('Card1.value < Card2.value', () => {
            const card1 = new Card(9, 2);
            const card2 = new Card(10, 1);
            const hand = new Hand(card1, card2);
            assert.strictEqual(hand.card1, card2, 'Higher value card should be card 1');
            assert.strictEqual(hand.card2, card1, 'Lower value card should be card 2');
        });

        it('Card1.value == Card2.value', () => {
            const card1 = new Card(9, 2);
            const card2 = new Card(9, 1);
            const hand = new Hand(card1, card2);
            assert.strictEqual(hand.card1, card1, 'Order should not be changed when value are equal');
            assert.strictEqual(hand.card2, card2, 'Order should not be changed when value are equal');
        });
    });

    describe('sortCards', () => {
        it('Sort with pocket cards first', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(13, 2);
            const card3 = new Card(10, 3);
            const card4 = new Card(8, 4);
            const card5 = new Card(7, 1);
            const card6 = new Card(5, 2);
            const card7 = new Card(2, 3);

            const hand = new Hand(card1, card2);
            const communityCards = [card3, card4, card5, card6, card7];
            const expectedResult = [card1, card2, card3, card4, card5, card6, card7];
            const actualResult = hand.sortCards(communityCards);
            assert.sameOrderedMembers(actualResult, expectedResult, 'Cards should be sorted in descending order');
        });

        it('Sort with pocket cards last', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(13, 2);
            const card3 = new Card(10, 3);
            const card4 = new Card(8, 4);
            const card5 = new Card(7, 1);
            const card6 = new Card(5, 2);
            const card7 = new Card(2, 3);

            const hand = new Hand(card7, card6);
            const communityCards = [card1, card2, card3, card4, card5];
            const expectedResult = [card1, card2, card3, card4, card5, card6, card7];
            const actualResult = hand.sortCards(communityCards);
            assert.sameOrderedMembers(actualResult, expectedResult, 'Cards should be sorted in descending order');
        });

        it('Sort with duplicate values', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(13, 2);
            const card3 = new Card(13, 3);
            const card4 = new Card(8, 4);
            const card5 = new Card(5, 2);
            const card6 = new Card(5, 1);
            const card7 = new Card(2, 3);

            const hand = new Hand(card3, card6);
            const communityCards = [card1, card2, card4, card5, card7];
            // For cards of equal value, pocket cards should come first
            const expectedResult = [card1, card3, card2, card4, card6, card5, card7];
            const actualResult = hand.sortCards(communityCards);
            assert.sameOrderedMembers(actualResult, expectedResult, 'Cards should be sorted in descending order');
        });
    });

    describe('getValue', () => {
        it('Unsorted cards', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(10, 1);
            const card3 = new Card(10, 3);
            const card4 = new Card(12, 1);
            const card5 = new Card(7, 1);
            const card6 = new Card(13, 1);
            const card7 = new Card(11, 1);

            const hand = new Hand(card1, card2);
            const communityCards = [card3, card4, card5, card6, card7];
            assert.throws(() => hand.getValue(communityCards), 'Pocket or community cards are not sorted in descending order');
        });

        it('Royal Flush', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(13, 1);
            const card3 = new Card(12, 1);
            const card4 = new Card(11, 1);
            const card5 = new Card(10, 1);
            const card6 = new Card(10, 3);
            const card7 = new Card(7, 1);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 10;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Royal Flush');
        });

        it('Royal Straight and Flush', () => {
            // High straight and flush, but flush is not with straight cards
            const card1 = new Card(14, 1);
            const card2 = new Card(13, 1);
            const card3 = new Card(12, 1);
            const card4 = new Card(11, 1);
            const card5 = new Card(10, 2);
            const card6 = new Card(10, 3);
            const card7 = new Card(7, 1);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 6;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Royal Straight and Flush');
        });

        it('Straight Flush', () => {
            const card1 = new Card(12, 1);
            const card2 = new Card(9, 3);
            const card3 = new Card(6, 2);
            const card4 = new Card(5, 2);
            const card5 = new Card(4, 2);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 9;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight Flush');
        });

        it('Straight Flush with Pair', () => {
            const card1 = new Card(9, 3);
            const card2 = new Card(6, 2);
            const card3 = new Card(5, 2);
            const card4 = new Card(4, 3);
            const card5 = new Card(4, 2);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 9;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight Flush with Pair');
        });

        it('Straight Flush with Pair 2', () => {
            // Straight ends with pair
            const card1 = new Card(9, 3);
            const card2 = new Card(6, 2);
            const card3 = new Card(5, 2);
            const card4 = new Card(4, 2);
            const card5 = new Card(3, 2);
            const card6 = new Card(2, 3);
            const card7 = new Card(2, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 9;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight Flush with Pair 2');
        });

        it('Straight Flush with Pair 3', () => {
            // Straight begins with pair, two possible suits
            const card1 = new Card(9, 3);
            const card2 = new Card(6, 1);
            const card3 = new Card(6, 2);
            const card4 = new Card(5, 2);
            const card5 = new Card(4, 2);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 9;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight Flush with Pair 2');
        });

        it('High Straight, Low Straight Flush', () => {
            // There is a straight with a higher starting card than the straight flush
            const card1 = new Card(10, 1);
            const card2 = new Card(9, 3);
            const card3 = new Card(9, 1);
            const card4 = new Card(8, 3);
            const card5 = new Card(7, 3);
            const card6 = new Card(6, 3);
            const card7 = new Card(5, 3);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 9;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'High Straight, Low Straight Flush');
        });

        it('Straight and Flush', () => {
            // Straight and flush, but flush is not with straight cards
            const card1 = new Card(12, 1);
            const card2 = new Card(9, 2);
            const card3 = new Card(6, 3);
            const card4 = new Card(5, 2);
            const card5 = new Card(4, 2);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 6;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight and Flush');
        });

        it('Four of a Kind', () => {
            const card1 = new Card(9, 2);
            const card2 = new Card(8, 3);
            const card3 = new Card(8, 1);
            const card4 = new Card(8, 2);
            const card5 = new Card(8, 4);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 4);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 8;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Four of a Kind');
        });

        it('Full House', () => {
            const card1 = new Card(8, 4);
            const card2 = new Card(8, 1);
            const card3 = new Card(8, 2);
            const card4 = new Card(7, 3);
            const card5 = new Card(3, 2);
            const card6 = new Card(2, 4);
            const card7 = new Card(2, 1);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 7;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Full House');
        });

        it('Flush', () => {
            const card1 = new Card(14, 1);
            const card2 = new Card(11, 1);
            const card3 = new Card(8, 2);
            const card4 = new Card(8, 1);
            const card5 = new Card(7, 1);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 1);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 6;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Flush');
        });

        it('Top Straight', () => {
            // Straight spans top 5 cards
            const card1 = new Card(11, 2);
            const card2 = new Card(10, 1);
            const card3 = new Card(9, 2);
            const card4 = new Card(8, 1);
            const card5 = new Card(7, 4);
            const card6 = new Card(6, 1);
            const card7 = new Card(3, 3);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 5;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Top Straight');
        });

        it('Bottom Straight', () => {
            // Straight spans bottom 5 cards
            const card1 = new Card(11, 2);
            const card2 = new Card(10, 1);
            const card3 = new Card(7, 2);
            const card4 = new Card(6, 1);
            const card5 = new Card(5, 4);
            const card6 = new Card(4, 1);
            const card7 = new Card(3, 3);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 5;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Bottom Straight');
        });

        it('Straight with 2 Pair', () => {
            const card1 = new Card(10, 2);
            const card2 = new Card(10, 3);
            const card3 = new Card(9, 3);
            const card4 = new Card(9, 4);
            const card5 = new Card(8, 2);
            const card6 = new Card(7, 2);
            const card7 = new Card(6, 2);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 5;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Straight with 2 Pair');
        });


        it('Three of a Kind', () => {
            const card1 = new Card(10, 1);
            const card2 = new Card(9, 2);
            const card3 = new Card(8, 2);
            const card4 = new Card(8, 4);
            const card5 = new Card(8, 3);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 4);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 4;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Three of a Kind');
        });

        it('Two Pair', () => {
            const card1 = new Card(10, 1);
            const card2 = new Card(8, 3);
            const card3 = new Card(8, 4);
            const card4 = new Card(4, 2);
            const card5 = new Card(3, 1);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 4);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 3;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'Two Pair');
        });

        it('One Pair', () => {
            const card1 = new Card(13, 4);
            const card2 = new Card(10, 1);
            const card3 = new Card(8, 2);
            const card4 = new Card(8, 3);
            const card5 = new Card(4, 1);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 4);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 2;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'One Pair');
        });

        it('High Card', () => {
            const card1 = new Card(13, 4);
            const card2 = new Card(10, 1);
            const card3 = new Card(8, 2);
            const card4 = new Card(5, 3);
            const card5 = new Card(4, 1);
            const card6 = new Card(3, 2);
            const card7 = new Card(2, 4);

            const hand = new Hand(card3, card5);
            const communityCards = [card1, card2, card4, card6, card7];
            const expectedValue = 1;
            const actualValue = hand.getValue(communityCards);
            assert.strictEqual(actualValue, expectedValue, 'High Card');
        });
    });

    describe('calculateResult', () => {
        describe('Straights', () => {
            it('Ace High', () => {
                const card1 = new Card(14, 4);
                const card2 = new Card(13, 1);
                const card3 = new Card(12, 2);
                const card4 = new Card(12, 3);
                const card5 = new Card(11, 1);
                const card6 = new Card(10, 2);
                const card7 = new Card(7, 4);

                const hand = new Hand(card3, card5);
                const communityCards = [card1, card2, card4, card6, card7];
                const expectedValue = 14;
                const result = hand.calculateResult(communityCards);
                const actualValue = result.straightValue;
                assert.strictEqual(actualValue, expectedValue, 'Ace High Straight');
            });

            it('Six High', () => {
                const card1 = new Card(14, 4);
                const card2 = new Card(6, 1);
                const card3 = new Card(5, 2);
                const card4 = new Card(4, 3);
                const card5 = new Card(3, 1);
                const card6 = new Card(3, 2);
                const card7 = new Card(2, 4);

                const hand = new Hand(card3, card5);
                const communityCards = [card1, card2, card4, card6, card7];
                const expectedValue = 6;
                const result = hand.calculateResult(communityCards);
                const actualValue = result.straightValue;
                assert.strictEqual(actualValue, expectedValue, 'Six High Straight');
            });

            it('Long Straight', () => {
                const card1 = new Card(10, 4);
                const card2 = new Card(9, 1);
                const card3 = new Card(8, 2);
                const card4 = new Card(7, 3);
                const card5 = new Card(6, 1);
                const card6 = new Card(5, 2);
                const card7 = new Card(4, 4);

                const hand = new Hand(card3, card5);
                const communityCards = [card1, card2, card4, card6, card7];
                const expectedValue = 10;
                const result = hand.calculateResult(communityCards);
                const actualValue = result.straightValue;
                assert.strictEqual(actualValue, expectedValue, 'Long Straight');
            });

            it('High Straight, Low Straight Flush', () => {
                // There is a straight with a higher starting card than the straight flush
                const card1 = new Card(10, 1);
                const card2 = new Card(9, 1);
                const card3 = new Card(8, 3);
                const card4 = new Card(7, 3);
                const card5 = new Card(6, 3);
                const card6 = new Card(5, 3);
                const card7 = new Card(4, 3);

                const hand = new Hand(card3, card5);
                const communityCards = [card1, card2, card4, card6, card7];
                const expectedStraightValue = 10;
                const expectedStraightFlushValue = 8;
                const result = hand.calculateResult(communityCards);
                const actualStraightValue = result.straightValue;
                const actualStraightFlushValue = result.straightFlushValue;
                assert.strictEqual(actualStraightValue, expectedStraightValue, 'Straight Value');
                assert.strictEqual(actualStraightFlushValue, expectedStraightFlushValue, 'Straight Flush Value');
            });
        });
    });
});