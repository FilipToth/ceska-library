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

router.get('/search', async (req, res, next) => {
    res.send('not implemented...');
});

module.exports = router;