import axios from "axios";

class Backend {
    constructor() {
        this.base = process.env.REACT_APP_BACKEND_BASE_URL;
    }

    async getBookInfoByID(id) {
        const book = await axios.get(`${this.base}/id?id=${id}`);
        return book.data;
    }

    async getLocation(id) {
        const location = await axios.get(`${this.base}/loc?id=${id}`);
        return location.data;
    }

    async getAllLocations() {
        const locations = await axios.get(`${this.base}/loc`);
        return locations.data;
    }

    async getAllBooks() {
        const books = await axios.get(`${this.base}/books`);
        return books.data;
    }

    async getBooksByGenre(genre) {
        const books = await axios.get(`${this.base}/books?genre=${genre}`);
        return books.data;
    }

    async getAuthentication(username, password ) {
        const payload = {
            username: username,
            password: password
        };

        const auth = await axios.post(`${this.base}/authenticate-user`, payload);
        return auth.data;
    }

    async addBook(book, token) {
        const payload = {
            token: token,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            library: book.library,
            row: book.row,
            column: book.column,
            genre: book.genre,
            note: book.note
        };

        const resp = await axios.post(`${this.base}/auth/add-book`, payload);
        return resp.data;
    }

    async removeBook(isbn, token) {
        const resp = await axios.post(`${this.base}/auth/remove-book`, { token: token });
        return resp.data;
    }

    async changeBook(key, value, token) {
        const payload = {
            token: token,
            key: key,
            value: value
        };
        
        await axios.post(`${this.base}/auth/change-book`, payload);
    }

    async changeLocation(key, value, token) {
        const payload = {
            token: token,
            key: key,
            value: value
        };

        await axios.post(`${this.base}/auth/change-location`, payload);
    };

    async addPerson(person, token) {
        const payload = {
            token: token,
            name: person.name,
            pClass: person.pClass,
            mail: person.mail
        };

        await axios.post(`${this.base}/auth/add-person`, payload);
    };

    async getPeople(token) {
        const resp = await axios.post(`${this.base}/auth/get-people`, { token: token });
        console.log(resp);
        return resp.data;
    };

    async checkout(token, bookID, personID, personName, bookName, date) {
        const payload = {
            token: token,
            bookID: bookID,
            personID: personID,
            personName: personName,
            bookName: bookName,
            date: date
        };

        let response = {};
        await axios.post(`${this.base}/auth/checkout`, payload).then((resp) => {
            response = resp.data;
        });

        return response;
    };

    async getCheckouts(token) {
        const resp = await axios.post(`${this.base}/auth/checkouts`, { token: token });
        return resp.data;
    };

    async getPersonById(token, personID) {
        const payload = {
            token: token,
            id: personID    
        };

        const resp = await axios.post(`${this.base}/auth/checkouts`, payload);
        return resp.data;
    };

    async returnBook(token, bookID) {
        const payload = {
            token: token,
            id: bookID
        };

        const resp = await axios.post(`${this.base}/auth/return-book`, payload);
        return resp.data;
    }

    async exportDB(token, db) {
        const payload = {
            token: token,
            databaseName: db
        };

        const resp = await axios.post(`${this.base}/auth/export-db`, payload);
        return resp.data;
    }

    async uploadDBFile(token, file, dbName) {
        const formData = new FormData();
        formData.append('dbImport', file);

        const payload = {
            token: token
        };
        
        const resp = await axios.post(`${this.base}/auth/import-db-${dbName.toLowerCase()}`, formData, payload);
        return resp.data;
    }

    async getBookByISBN(isbn) {
        const resp = await axios.get(`${this.base}/book-by-isbn?isbn=${isbn}`);
        return resp.data.book;
    };

    async getBookImage(isbn) {
        const resp = await axios.get(`${this.base}/book-image?isbn=${isbn}`);
        if (!resp.data.success)
            return undefined;
        
        console.log(resp.data);
        return resp.data.image;
    }
}

const backend = new Backend();
export default backend;