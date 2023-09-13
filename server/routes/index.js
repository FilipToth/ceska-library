var handler = require('../db/handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const papa = require('papaparse');
const axios = require('axios');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
        const genre = req.query.genre;
        const note = req.query.note;
        
        await handler.addBook(isbn, title, author, library, row, column, genre, note);
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

    const token = req.query.token;
    await jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (!checkAuth(err, decoded, res))
            return;

        const dbName = req.query.databaseName;
        let data;
        let filename;
        let header;
        let lineCallback;

        switch (dbName) {
            case 'Books':
                data = await handler.getBooks();
                filename = 'books.csv';
                header = 'isbn,title,author,genre\n';
                lineCallback = (key, book) => {
                    return `${key},${book.name},${book.author},${book.genre}\n`;
                };

                break;
            case 'People':
                data = await handler.getPeople();
                filename = 'people.csv';
                header = 'name,class,email\n';
                lineCallback = (key, person) => {
                    return `${key},${person.class},${person.email}`;
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

        const outsidePath = `http://127.0.0.1:8080/${filename}`;
        res.send({ success: true, path: outsidePath });
    });
});

// TODO: Cleanup import functions

router.post('/import-db-books', upload.single('dbImport'), (req, res, next) => {
    // TODO: JWT and security

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

    const dbEntry = {};
    for (const book of data) {
        if (book.length != 4 || book[0] == '') {
            continue;
        }

        const key = book[0];
        dbEntry[key] = {
            name: book[1],
            author: book[2],
            genre: book[3]
        };
    }

    handler.changeBooks(dbEntry);
    res.send({ success: true });
});

router.post('/import-db-people', upload.single('dbImport'), (req, res, next) => {
    // TODO: JWT and security

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

    const dbEntry = {};
    for (const person of data) {
        if (person.length != 3 || person[0] == '') {
            continue;
        }

        const key = person[0];
        dbEntry[key] = {
            class: person[1],
            email: person[2],
        };
    }

    handler.changePeople(dbEntry);
    res.send({ success: true });
});

router.post('/import-db-checkouts', upload.single('dbImport'), (req, res, next) => {
    // TODO: JWT and security

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

    const dbEntry = {};
    for (const checkout of data) {
        if (checkout.length != 6 || checkout[0] == '') {
            continue;
        }

        const key = checkout[0];
        dbEntry[key] = {
            personID: checkout[1],
            dueDate: checkout[2],
            personName: checkout[3],
            bookName: checkout[4],
            checkoutDate: checkout[5],
        };
    }

    handler.changeCheckouts(dbEntry);
    res.send({ success: true });
});

router.get('/book-by-isbn', async (req, res, next) => {
    const isbn = req.query.isbn;
    
    const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    const data = resp.data;

    if (data == undefined) {
        res.send({ success: false })
        return;
    }

    if (data.totalItems == 0) {
        res.send({ success: false })
        return;
    }

    const item = data.items[0];
    const volumeInfo = item.volumeInfo;

    const title = volumeInfo.title;
    const author = volumeInfo.authors[0];
    const image = volumeInfo.imageLinks.thumbnail;
    const descripton = volumeInfo.description;
    const publishingYear = volumeInfo.publishedDate;
    const pages = volumeInfo.pageCount;
    const genre = volumeInfo.categories[0];

    const book = {
        name: title,
        author: author,
        image: image,
        description:  descripton,
        publishingYear: publishingYear,
        pages: pages,
        genre: genre
    };

    res.send({ success: true, book: book })
    return;
});

router.get('/book-image', async (req, res, next) => {
    const isbn = req.query.isbn;
    const path = `public/images/${isbn}`;
    
    let exists = false;
    await fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            return;
        }

        exists = true;
    });

    if (exists) {
        const outsidePath = `http://127.0.0.1:8080/images/${filename}`;
        res.send({ success: true, image: `` });
    }
});

module.exports = router;