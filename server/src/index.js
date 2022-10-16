import Database from './db/db';

const express = require('express');
const app = express();

const db = new Database();

app.get('/', (req, res) => {
    res.send('oops\n');
    db.getBooks();
});

app.get('/search', (req, res) => {
    var query = req.query.query;
    console.log(query);

    res.send("k, thx!\n");
});

app.get('/check', (req, res) => {
    res.send("Not implemented!");
});

app.listen(4000, () => {
    console.log('litening on port 4000');
});