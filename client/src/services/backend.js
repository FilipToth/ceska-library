import axios from "axios";

class Backend {
    async getBookInfoByID(id) {
        const book = await axios.get(`http://127.0.0.1:8080/id?id=${id}`);
        return book.data;
    }

    async getLocation(id) {
        const location = await axios.get(`http://127.0.0.1:8080/loc?id=${id}`);
        return location.data;
    }

    async getAllLocations() {
        const locations = await axios.get(`http://127.0.0.1:8080/loc`);
        return locations.data;
    }

    async getAllBooks() {
        const books = await axios.get(`http://127.0.0.1:8080/books`);
        return books.data;
    }

    async getBooksByGenre(genre) {
        const books = await axios.get(`http://127.0.0.1:8080/books?genre=${genre}`);
        return books.data;
    }

    async getAuthentication(username, password ) {
        const auth = await axios.get(`http://127.0.0.1:8080/auth?username=${username}&password=${password}`);
        return auth.data;
    }

    async addBook(book, token) {
        const resp = await axios.get(`http://127.0.0.1:8080/add-book?token=${token}&isbn=${book.isbn}&title=${book.title}&author=${book.author}&library=${book.library}&row=${book.row}&column=${book.column}`);
        return resp.data;
    }

    async removeBook(isbn, token) {
        const resp = await axios.get(`http://127.0.0.1:8080/remove-book?token=${token}&id=${isbn}`);
        return resp.data;
    }

    async changeBook(key, value, token) {
        const payload = {
            token: token,
            key: key,
            value: value
        };
        
        await axios.post(`http://127.0.0.1:8080/change-book`, payload);
    }

    async changeLocation(key, value, token) {
        const payload = {
            token: token,
            key: key,
            value: value
        };

        await axios.post(`http://127.0.0.1:8080/change-location`, payload);
    };

    async addPerson(person, token) {
        const payload = {
            token: token,
            name: person.name,
            class: person.class,
            mail: person.mail
        };

        await axios.post(`http://127.0.0.1:8080/add-person`, payload);
    };

    async getPeople(token) {
        const resp = await axios.get(`http://127.0.0.1:8080/get-people?token=${token}`);
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
        await axios.post(`http://127.0.0.1:8080/checkout`, payload).then((resp) => {
            response = resp.data;
        });

        return response;
    };

    async getCheckouts(token) {
        const resp = await axios.get(`http://127.0.0.1:8080/checkouts?token=${token}`);
        return resp.data;
    };

    async getPersonById(token, personID) {
        const resp = await axios.get(`http://127.0.0.1:8080/checkouts?token=${token}&id=${personID}`);
        return resp.data;
    };

    async returnBook(token, bookID) {
        const payload = {
            token: token,
            id: bookID
        };

        const resp = await axios.post(`http://127.0.0.1:8080/return-book`, payload);
        return resp.data;
    }

    async exportDB(token, db) {
        const resp = await axios.get(`http://127.0.0.1:8080/export-db?token=${token}&databaseName=${db}`);
        return resp.data;
    }
}

const backend = new Backend();
export default backend;