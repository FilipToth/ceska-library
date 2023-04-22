var handler = require('../db/handler');

var express = require('express');
var router = express.Router();

const DatabaseHandler = require('../db/handler');
const db = new DatabaseHandler();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/books', async (req, res, next) => {
    const books = await db.getBooks();
    res.send(books);
});

router.get('/id', async (req, res, next) => {
    const query = req.query.id;
    const book = await db.searchBook(query);
    res.send(book);
});

module.exports = router;