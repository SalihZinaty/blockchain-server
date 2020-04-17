const BlockChain = require('../BlockChain');
const Block = require('../Block');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new BlockChain();
        newChain = new BlockChain();

        originalChain = blockchain.chain;
    })
    it('contains a `chain` Array instance', ()=> {
        expect(blockchain.chain instanceof Array).toBe(true);
    })

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({data: newData});

        expect(blockchain.chain[blockchain.chain.length-1].data)
        .toEqual(newData);
    })
    describe('isValidChain()', () => {
        describe('when the chain does not starts with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};
                expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
            })
        })
        describe('whn the chain starts with the genesis block and has multiple blocks ', ()=> {
            beforeEach(() => {
                blockchain.addBlock({data:'Bears'})
                blockchain.addBlock({data:'Beets'})
                blockchain.addBlock({data:'Battlestar'})
            })
            describe('and a lasthash reference has changed', ()=> {
                it('returns fals', () => {

                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
                })
            })
            describe('ans the chain contains a block with an invalid field', () => {
                it('returns false', () => {

                    blockchain.chain[2].data = 'some-bad-data';
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
                })
            })
            describe('and the chain does not contains any invalid blocks', () => {
                it('returns true', () => {

                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(true);
                })
            })
        })
    })
    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does not replace the chain', () => {
                chain.chain[0] = {new: 'chain'};

                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            })
        })
        describe('when the chain is longer', ()=> {
            describe('and the chain is invalid', () => {
                it('does not replace the chain')
            })
            describe('and the chain is valid', () => {
                it('replaces the chain', () => {

                })
            })
        })
    })
})