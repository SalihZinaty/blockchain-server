const cryptoHash = require('../cryptoHash/cryptoHash');

describe('cryptoHash()', ()=> {
    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('testme'))
        .toEqual('3bcc367a3488e113dca68b67e5fa262fe4fd2df48b1b72fd3292b30358911aab')
    })

    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('one','two','three'))
        .toEqual(cryptoHash('three','one','two'))
    })
})