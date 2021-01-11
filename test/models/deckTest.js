import assert from 'assert';
import Deck from '../../dist/deck.js';

describe('Deck', () => {
    describe('Initial count', () => {
        it('Initial count should return 52', () => {
            let deck = new Deck();
            assert.equal(deck.count(), 52);
        });
    });
});
