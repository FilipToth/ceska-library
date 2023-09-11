const Connector = require('./connector');
const algoliasearch = require('algoliasearch');

class DatabaseHandler
{
    constructor() {
        this.connector = new Connector();
        this.bookColName = process.env.BOOKS_COL_NAME;
        this.bookColID = process.env.BOOKS_COL_ID;
        this.locationsColName = process.env.LOCATIONS_COL_NAME;
        this.locationsColID = process.env.LOCATIONS_COL_ID;
        this.usersColName = process.env.USERS_COL_NAME;
        this.usersColId = process.env.USERS_COL_ID;
        this.peopleColName = process.env.PEOPLE_COL_NAME;
        this.peopleColID = process.env.PEOPLE_COL_ID;
        this.checkoutsColName = process.env.CHECKOUTS_COL_NAME;
        this.checkoutsColID = process.env.CHECKOUTS_COL_ID;

        this.algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    }

    getBooks = async () => {
        const doc = await this.connector.getDoc(this.bookColName, this.bookColID);
        return doc.data;
    }

    getLocations = async () => {
        const doc = await this.connector.getDoc(this.locationsColName, this.locationsColID);
        return doc.data;
    }

    getUsers = async () => {
        const doc = await this.connector.getDoc(this.usersColName, this.usersColId);
        return doc.data;
    }

    searchBook = async (id) => {
        // TODO: Use fauna indexes...
        const books = await this.getBooks();
        const book = books[id];
        return book;
    }

    getLocation = async (id) => {
        const locations = await this.getLocations();
        const location = locations[id];
        return location;
    }

    addBook = async (isbn, title, author, library, row, column, genre) => {
        // add to algolia
        const algoliaObject = [{
            name: title,
            author: author,
            objectID: isbn,
        }];

        let success = true;
        const index = this.algoliaClient.initIndex(process.env.ALGOLIA_BOOK_INDEX_NAME);
        await index.saveObjects(algoliaObject, { autoGenerateObjectIDIfNotExist: true }).catch((err) => {
            success = false;
            console.log(err);
        });

        if (!success)
            return;
        
        // add to faunadb
        const bookData = {
            data: { }
        };

        const locationData = {
            data: { }
        };

        bookData.data[isbn] = {
            name: title,
            author: author,
            genre: genre
        };

        locationData.data[isbn] = {
            library: library,
            row: row,
            column: column
        };

        await this.connector.updateDoc(this.bookColName, this.bookColID, bookData);
        await this.connector.updateDoc(this.locationsColName, this.locationsColID, locationData);
    }

    changeBook = async (isbn, value) => {
        const bookData = {
            data: { }
        };

        bookData.data[isbn] = value;
        await this.connector.updateDoc(this.bookColName, this.bookColID, bookData);
    };

    changeBooks = async (books) => {
        const bookData = {
            data: books
        };

        this.connector.updateDoc(this.bookColName, this.bookColID, bookData)
    };

    changeLocation = async (isbn, value) => {
        const locationData = {
            data: { }
        };

        locationData.data[isbn] = value;
        await this.connector.updateDoc(this.locationsColName, this.locationsColID, locationData);
    };

    changePeople = async (people) => {
        const peopleData = {
            data: people
        };

        this.connector.updateDoc(this.peopleColName, this.peopleColID, peopleData)
    };


    changeCheckouts = async (checkouts) => {
        const checkoutsData = {
            data: checkouts
        };

        this.connector.updateDoc(this.checkoutsColName, this.checkoutsColID, checkoutsData)
    };


    removeBook = async (isbn) => {
        // remove from algolia
        let success = true;
        const index = this.algoliaClient.initIndex(process.env.ALGOLIA_BOOK_INDEX_NAME);
        await index.deleteObject(isbn).catch((err) => {
            success = false;
            console.log(err);
        });

        if (!success)
            return;

        // remove from faunadb
        const bookData = {
            data: { }
        };

        const locationData = {
            data: { }
        };

        bookData.data[isbn] = null;
        locationData.data[isbn] = null;

        await this.connector.updateDoc(this.bookColName, this.bookColID, bookData);
        await this.connector.updateDoc(this.locationsColName, this.locationsColID, locationData);
    };

    addPerson = async (name, pClass, mail) => {
        // add to algolia
        const algoliaObject = [{
            name: name,
            'class': pClass,
            email: mail
        }];

        let objectID = '';
        let success = true;
        const index = this.algoliaClient.initIndex(process.env.ALGOLIA_PEOPLE_INDEX_NAME);
        await index.saveObjects(algoliaObject, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
            objectID = objectIDs[0];
            console.log(objectIDs);
        }).catch((err) => {
            success = false;
        });

        if (!success)
            return;

        // add to faunadb
        const personData = {
            data: { }
        };

        personData.data[objectID] = {
            name: name,
            'class': pClass,
            email: mail
        };

        await this.connector.updateDoc(this.peopleColName, this.peopleColID, personData);
    };

    getPeople = async () => {
        const doc = await this.connector.getDoc(this.peopleColName, this.peopleColID);
        return doc.data;
    };

    getPersonById = async (id) => {
        const people = await this.getPeople();
        const person = people[id];
        return person;
    };

    checkout = async (bookID, personID, personName, bookName, date) => {
        const { data } = await this.connector.getDoc(this.checkoutsColName, this.checkoutsColID);
        
        const checkForBookAlreadyCheckedOut = () => {
            if (data == undefined)
                return false;

            const checkouts = data.checkouts;
            for (const [key, value] of Object.entries(data)) {
                if (value.bookID === bookID)
                    return true;
            };

            return false;
        };

        if (checkForBookAlreadyCheckedOut()) {
            return { failed: true, resp: 'Already checked out' };
        }
        
        // add the book to checkouts
        const checkoutData = {
            data: { }
        };

        checkoutData.data[bookID] = {
            personID: personID,
            dueDate: date,
            personName: personName,
            bookName: bookName,
            checkoutDate: new Date().toISOString()
        };

        await this.connector.updateDoc(this.checkoutsColName, this.checkoutsColID, checkoutData);
        return { failed: false, resp: 'success' };
    };

    getCheckouts = async () => {
        const doc = await this.connector.getDoc(this.checkoutsColName, this.checkoutsColID);
        return doc.data;
    };

    returnBook = async (bookID) => {
        const checkoutData = {
            data: { }
        };

        checkoutData.data[bookID] = null;
        await this.connector.updateDoc(this.checkoutsColName, this.checkoutsColID, checkoutData);
    };
}

const handler = new DatabaseHandler();
module.exports = handler;