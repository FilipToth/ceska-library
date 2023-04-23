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

    addBook = async (isbn, title, author, library, row, column) => {
        // add to algolia
        const algoliaObject = [{
            name: title,
            author: author,
            id: isbn,
        }];

        let success = true;
        const index = this.algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME);
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
        };

        locationData.data[isbn] = {
            library: library,
            row: row,
            column: column
        };

        await this.connector.updateDoc(this.bookColName, this.bookColID, bookData);
        await this.connector.updateDoc(this.locationsColName, this.locationsColID, locationData);
    }
}

const handler = new DatabaseHandler();
module.exports = handler;