var handler = require('../db/handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const fsSync = require('fs');
const papa = require('papaparse');
const { getBookByISBN } = require('../services/google');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

var express = require('express');
const { default: axios } = require('axios');
var router = express.Router();

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

router.post('/authenticate-user', async (req, res, next) => {
    const sendFailed = () => {
        res.send({ success: false });
    };

    const username = req.body.username;
    const enteredPasswordPlain = req.body.password;

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

router.post('/auth/add-book', async (req, res, next) => {
    // add book to database
    const isbn = req.body.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const library = req.body.library;
    const row = req.body.row;
    const column = req.body.column;
    const genre = req.body.genre;
    const note = req.body.note;

    const book = {
        isbn: isbn,
        title: title,
        author: author,
        library: library,
        row: row,
        column: column,
        genre: genre,
        note: note
    };
    
    await handler.addBooks([ book ], true);
    res.send({ success: true });
});

router.post('/auth/remove-book', async (req, res, next) => {
    // remove book from database
    const id = req.body.id;
    await handler.removeBook(id);
    res.send({ success: true });
});

router.post('/auth/change-book', async (req, res, next) => {
    const key = req.body.key;
    const value = req.body.value;
    await handler.changeBook(key, value);
    res.send({ success: true });
});

router.post('/auth/change-location', async (req, res, next) => {
    const key = req.body.key;
    const value = req.body.value;
    await handler.changeLocation(key, value);
    res.send({ success: true });
});

router.post('/auth/add-person', async (req, res, next) => {
    const username = req.body.name;
    const pClass = req.body.pClass;
    const email = req.body.mail;
    const person = {
        name: username,
        pClass: pClass,
        mail: email
    };
    await handler.addPeople([ person ]);
    res.send({ success: true });
});

router.post('/auth/get-people', async (req, res, next) => {
    const people = await handler.getPeople();
    res.send(people);
});

router.post('/auth/get-person', async (req, res, next) => {
    const id = req.body.id;
    const person = await handler.getPersonById(id);
    res.send(person);
});

router.post('/auth/checkout', async (req, res, next) => {
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

router.post('/auth/checkouts', async (req, res, next) => {
    const checkouts = await handler.getCheckouts();
    res.send(checkouts);
});

router.post('/auth/return-book', async (req, res, next) => {
    const id = req.body.id;
    await handler.returnBook(id);
    res.send({ success: true });
});

router.post('/auth/export-db', async (req, res, next) => {
    const writeDBExport = async (filename, data, header, lineCallback) => {
        const handle = await fs.open(filename, 'w+');
        
        // write header
        await handle.write(header);

        for (var [key, data] of Object.entries(data)) {
            const line = lineCallback(key, data);
            await handle.write(line);
        }
        
        // flushes the write buffer and close
        await handle.sync();
        await handle.close();
    };

    const dbName = req.body.databaseName;
    let data;
    let filename;
    let header;
    let lineCallback;

    switch (dbName) {
        case 'Books':
            data = await handler.getBooks();
            filename = 'books.csv';
            header = 'isbn,title,author,genre,note\n';
            lineCallback = (key, book) => {
                return `${key},${book.name},${book.author},${book.genre},${book.note}\n`;
            };

            break;
        case 'People':
            data = await handler.getPeople();
            filename = 'people.csv';
            header = 'id,name,class,email\n';
            lineCallback = (key, person) => {
                return `${key},${person.name},${person.pClass},${person.email}\n`;
            };

            break;
        case 'Checkouts':
            data = await handler.getCheckouts();
            filename = 'checkouts.csv';
            header = 'isbn,personID,dueDate,personName,bookName,checkoutDate\n';
            lineCallback = (key, checkout) => {
                return `${key},${checkout.personID},${checkout.dueDate},${checkout.personName},${checkout.bookName},${checkout.checkoutDate}`;
            };

            break;
        default:
            res.send({ success: false, err: 'Database does\'t exist' });
            return;
    }

    const path = `public/${filename}`;
    await writeDBExport(path, data, header, lineCallback);

    const outsidePath = `${process.env.SERVING_URL}/${filename}`;
    res.send({ success: true, path: outsidePath });
});

// TODO: Cleanup import functions

router.post('/auth/import-db-books', upload.single('dbImport'), async (req, res, next) => {
    const file = String(req.file.buffer);
    const parsed = papa.parse(file, { header: false });

    // check for parsing errors
    if (parsed.errors != undefined && parsed.errors.length > 0) {
        res.send({ success: false, msg: 'Invalid CSV file' });
        return;
    }
    
    // also have to remove headers
    const data = parsed.data;
    data.splice(0, 1);

    const dbEntries = [];
    const referencesIsbns = [];
    for (const book of data) {
        if ((book.length != 4 && book.length != 5) || book[0] == '' || book[0] == undefined) {
            continue;
        }

        const isbn = book[0];
        const entry = {
            isbn: book[0],
            title: book[1],
            author: book[2],
            genre: book[3],
        };

        if (book.length == 5)
            entry.note = book[4];

        referencesIsbns.push(isbn);
        dbEntries.push(entry);
    }

    const toRemove = handler.differentiateCheckouts(referencedIDs, dbEntry);
    await handler.addBooks(dbEntries, false, toRemove.length == 0 ? undefined : toRemove);
    res.send({ success: true });
});

router.post('/auth/import-db-people', upload.single('dbImport'), async (req, res, next) => {
    const file = String(req.file.buffer);
    const parsed = papa.parse(file, { header: false });

    // check for parsing errors
    if (parsed.errors != undefined && parsed.errors.length > 0) {
        res.send({ success: false, msg: 'Invalid CSV file' });
        return;
    }
    
    // also have to remove headers
    const data = parsed.data;
    data.splice(0, 1);

    const dbEntries = [];
    const referencedIDs = [];
    for (const person of data) {
        if (person.length != 4 || person[0] == '') {
            continue;
        }

        const id = person[0];
        dbEntries.push({
            id: id,
            name: person[1],
            pClass: person[2],
            mail: person[3]
        });

        referencedIDs.push(id);
    }

    const toRemove = handler.differentiateCheckouts(referencedIDs, dbEntries);
    await handler.addPeople(dbEntries, toRemove);
    res.send({ success: true });
});

router.post('/auth/import-db-checkouts', upload.single('dbImport'), async (req, res, next) => {
    const file = String(req.file.buffer);
    const parsed = papa.parse(file, { header: false });

    // check for parsing errors
    if (parsed.errors != undefined && parsed.errors.length > 0) {
        res.send({ success: false, msg: 'Invalid CSV file' });
        return;
    }
    
    // also have to remove headers
    const data = parsed.data;
    data.splice(0, 1);

    let dbEntries = {};
    const referencedIDs = [];
    for (const checkout of data) {
        if (checkout.length != 6 || checkout[0] == '') {
            continue;
        }

        const key = checkout[0];
        dbEntries[key] = {
            personID: checkout[1],
            dueDate: checkout[2],
            personName: checkout[3],
            bookName: checkout[4],
            checkoutDate: checkout[5],
        };

        referencedIDs.push(key);
    }

    handler.differentiateCheckouts(referencedIDs, dbEntries);
    await handler.changeCheckouts(dbEntries);
    res.send({ success: true });
});

router.post('/auth/purge-db', async (req, res, next) => {
    const db = red.body.databaseName;
    switch (db) {
        case 'Books':
            await handler.purgeBooks();
            break;
        case 'People':
            await handler.purgePeople();
            break;
        case 'Checkouts':
            await handler.purgeCheckouts();
            break;
    }

    res.send({ success: true });
});

router.get('/book-by-isbn', async (req, res, next) => {
    const isbn = req.query.isbn;
    const book = await getBookByISBN(isbn);

    res.send({ success: true, book: book })
    return;
});

router.get('/book-image', async (req, res, next) => {
    const isbn = req.query.isbn;
    const path = `public/images/${isbn}.png`;
    const outsidePath = `${process.env.SERVING_URL}/images/${isbn}.png`;

    let exists = fsSync.existsSync(path);
    if (exists) {
        res.send({ success: true, image: outsidePath });
        return;
    }

    // downlaod image
    const book = await getBookByISBN(isbn);
    if (book == undefined) {
        res.send({ success: false });
        return;
    }

    const image = book.image;
    if (!image) {
        res.send({ success: false });
        return;
    }

    let downloadSuccess = true;
    const resp = await axios.get(image, { responseType: 'stream' });
    await fs.writeFile(path, resp.data, (err) => {
        if (err) {
            downloadSuccess = false;
            res.send({ success: false });
        }
    });

    if (!downloadSuccess)
        return;

    res.send({ success: true, image: outsidePath });
});

module.exports = router;