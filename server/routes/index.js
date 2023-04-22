var handler = require('../db/handler');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/books', async (req, res, next) => {
    const books = await handler.getBooks();
    res.send(books);
});

router.get('/id', async (req, res, next) => {
    const query = req.query.id;
    const book = await handler.searchBook(query);
    res.send(book);
});

router.get('/loc', async (req, res, next) => {
    const query = req.query.id;
    const loc = await handler.getLocation(query);
    res.send(loc);
});

module.exports = router;