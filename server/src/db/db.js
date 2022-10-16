import Connector from "./connector";

class Database
{
    constructor() {
        this.connector = new Connector();
        this.bookColName = process.env.BOOKS_COL_NAME;
        this.bookColID = process.env.BOOKS_COL_ID;
    }

    query = async (name) => {

    }

    getBooks = async () => {
        const doc = this.connector.getDoc(this.bookColName, this.bookColID);
        console.log(doc);
    }
}

export default Database;