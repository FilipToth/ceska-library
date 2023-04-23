var handler = require('../db/handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Ceska 10 Library' });
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

router.get('/auth', async(req, res, next) => {
    const sendFailed = () => {
        res.send({ success: false });
    };

    const username = req.query.username;
    const enteredPasswordPlain = req.query.password;

    const users = await handler.getUsers();
    const user = users[username];

    if (user == undefined) {
        sendFailed();
        return;
    }

    const hashedEnteredPassword = crypto.createHash('md5').update(enteredPasswordPlain).digest('hex');
    if (user.password == hashedEnteredPassword) {
        // generate json web token
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ success: true, token: token });
        return;
    }

    sendFailed();
});

router.get('/add-book', async(req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            console.log(err);
            res.send({ success: false });
            return;
        }

        if (decoded.username == undefined || decoded.username == '') {
            console.log(decoded.username);
            res.send({ success: false });
            return;
        }

        // add book to database
        const isbn = req.query.isbn;
        const title = req.query.title;
        const author = req.query.author;
        const library = req.query.library;
        const row = req.query.row;
        const column = req.query.column;

        await handler.addBook(isbn, title, author, library, row, column);
        res.send({ success: true });
    });
});

router.get('/remove-book', async(req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            console.log(err);
            res.send({ success: false });
            return;
        }

        if (decoded.username == undefined || decoded.username == '') {
            console.log(decoded.username);
            res.send({ success: false });
            return;
        }

        // remove book from database
        const id = req.query.id;
        await handler.removeBook(id);
        res.send({ success: true });
    });
});

module.exports = router;