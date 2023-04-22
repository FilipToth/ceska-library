const Connector = require('./connector');

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
}

const handler = new DatabaseHandler();
module.exports = handler;