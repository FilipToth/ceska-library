var handler = require('../db/handler');

var express = require('express');
var router = express.Router();

const DatabaseHandler = require('../db/handler');
const db = new DatabaseHandler();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/books', (req, res, next) => {
    db.getBooks();
    res.send({ ok: true });
});

module.exports = router;