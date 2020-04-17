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
        let errorMoc, logMoc;
        beforeEach(()=> {
           errorMoc = jest.fn();
           logMoc = jest.fn();
           global.console.error = errorMoc;
           global.console.log = logMoc;
        })
        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = {new: 'chain'};

                blockchain.replaceChain(newChain.chain);
            })
            
            it('does not replace the chain', () => {
                newChain.chain[0] = {new: 'chain'};

                blockchain.replaceChain(newChain.chain);
                
                expect(blockchain.chain).toEqual(originalChain);
            })
            it('logs an error', () => {
                expect(errorMoc).toHaveBeenCalled();
            })
        })
        describe('when the new chain is longer', ()=> {
            beforeEach(() => {
                newChain.addBlock({data:'Bears'})
                newChain.addBlock({data:'Beets'})
                newChain.addBlock({data:'Battlestar'})
            })
            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockchain.replaceChain(newChain.chain);
                })
                it('does not replace the chain',()=> {
                    expect(blockchain.chain).toEqual(originalChain);
                })
            })
            describe('and the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                })
                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                })
            })
        })
    })
})