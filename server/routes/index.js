var handler = require('../db/handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

var express = require('express');
var router = express.Router();

const checkAuth = (err, decoded, res) => {
    if (err) {
        console.log(err);
        res.send({ success: false });
        return false;
    }

    if (decoded.username == undefined || decoded.username == '') {
        res.send({ success: false });
        return false;
    }

    return true;
}

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Ceska 10 Library' });
});

router.get('/books', async (req, res, next) => {
    const books = await handler.getBooks();

    const genre = req.query.genre;
    if (genre == undefined || genre == '*') {
        res.send(books);
        return;
    }

    const filteredBooks = {};
    for (const [key, book] of Object.entries(books)) {
        const bookGenre = book.genre;
        if (bookGenre == genre) {
            filteredBooks[key] = book;
        }
    }

    res.send(filteredBooks);
});

router.get('/id', async (req, res, next) => {
    const query = req.query.id;
    const book = await handler.searchBook(query);
    res.send(book);
});

router.get('/loc', async (req, res, next) => {
    const query = req.query.id;

    if (query != undefined) {
        const loc = await handler.getLocation(query);
        res.send(loc);
        return;
    }

    // get all locations
    const locations = await handler.getLocations();
    res.send(locations);
});

router.get('/auth', async (req, res, next) => {
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

router.get('/add-book', async (req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

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

router.get('/remove-book', async (req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        // remove book from database
        const id = req.query.id;
        await handler.removeBook(id);
        res.send({ success: true });
    });
});

router.post('/change-book', async (req, res, next) => {
    const token = req.body.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        const key = req.body.key;
        const value = req.body.value;
        await handler.changeBook(key, value);
        res.send({ success: true });
    });
});

router.post('/change-location', async (req, res, next) => {
    const token = req.body.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        const key = req.body.key;
        const value = req.body.value;
        await handler.changeLocation(key, value);
        res.send({ success: true });
    });
});

router.post('/add-person', async (req, res, next) => {
    const token = req.body.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        const username = req.body.name;
        const password = req.body.class;
        const role = req.body.mail;
        await handler.addPerson(username, password, role);
        res.send({ success: true });
    });
});

router.get('/get-people', async (req, res, next) => {
    // all people apis need to be secured
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        const people = await handler.getPeople();
        res.send(people);
    });
});

router.get('/get-person', async (req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;
        
        const id = req.query.id;
        const person = await handler.getPersonById(id);
        res.send(person);
    });
});

router.post('/checkout', async (req, res, next) => {
    const token = req.body.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        console.log(req.body)

        const bookId = req.body.bookID;
        const personId = req.body.personID;
        const personName= req.body.personName;
        const bookName = req.body.bookName;
        const date = req.body.date;

        const { failed, resp } = await handler.checkout(bookId, personId, personName, bookName, date);
        if (failed) {
            res.send({ success: false, err: resp });
            return;
        }

        res.send({ success: true });
    });
});

router.get('/checkouts', async (req, res, next) => {
    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;
        
        const checkouts = await handler.getCheckouts();
        res.send(checkouts);
    });
});

router.post('/return-book', async (req, res, next) => {
    const token = req.body.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;
        
        const id = req.body.id;
        await handler.returnBook(id);
        res.send({ success: true });
    });
});

router.get('/export-db', async (req, res, next) => {
    const writeDBExport = async (filename, data) => {
        const handle = await fs.open(filename, 'w+');
        
        // write header
        await handle.write('isbn,title,author,genre\n');

        for (var [key, book] of Object.entries(data)) {
            const line = `${key},${book.name},${book.author},${book.genre}\n`;
            await handle.write(line);
        }
        
        // flushes the write buffer
        await handle.sync();
    };

    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;
        
        const dbName = req.query.databaseName;
        switch (dbName) {
            case 'Books':
                const filename = 'books.csv'
                const path = `public/${filename}`;

                const books = await handler.getBooks();
                await writeDBExport(path, books);

                const outsidePath = `http://127.0.0.1:8080/${filename}`
                res.send({ success: true, path: outsidePath });
            case 'People':
                break;
            case 'Checkouts':
                break;
            default:
                res.send({ success: false, err: 'Database does\'t exist' });
        }
    });
});

module.exports = router;