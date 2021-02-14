import assert from 'assert';
import Deck from '../../../dist/models/deck.js';

describe('Deck', () => {
    describe('count', () => {
        it('Initial count should return 52', () => {
            let deck = new Deck();
            assert.strictEqual(deck.count(), 52, 'Number of cards in deck');
        });
    });

    describe('draw', () => {
        it('Draw removes card from deck', () => {
            let deck = new Deck(false);
            assert.strictEqual(deck.count(), 52);
            let drawn_card = deck.draw();
            assert.strictEqual(deck.count(), 51);
            let index = deck.cards.findIndex(card => card.value === drawn_card.value && card.suit === drawn_card.suit)
            assert.strictEqual(index, -1, 'Index of drawn card');
        });
    });
});