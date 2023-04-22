const Connector = require('./connector');

class DatabaseHandler
{
    constructor() {
        this.connector = new Connector();
        this.bookColName = process.env.BOOKS_COL_NAME;
        this.bookColID = process.env.BOOKS_COL_ID;
    }

    query = async (name) => {

    }

    getBooks = async () => {
        const doc = await this.connector.getDoc(this.bookColName, this.bookColID);
        return doc.data;
    }

    searchBook = async (id) => {
        // TODO: Use fauna indexes...
        const books = await this.getBooks();
        const book = books[id];
        return book;
    }
}

module.exports = DatabaseHandler;