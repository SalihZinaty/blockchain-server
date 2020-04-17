const express = require('express');
const BlockChain = require('./BlockChain');

const app = express();
const blockchain = new BlockChain();

app.get('/api/blocks', (req,res) => {
    res.json(blockchain.chain);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`listining at localhost:${PORT}`)
});