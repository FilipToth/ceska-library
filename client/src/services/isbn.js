import backend from "./backend";

// TODO: Do this on the backend due to
// security reasons

// TODO: Remove this and use backend abstraction

class ISBNProvider {
    async getBook(isbn) {
        const book = await backend.getBookByISBN(isbn);
        return book;
    }
}

const isbnProvider = new ISBNProvider();
export default isbnProvider;