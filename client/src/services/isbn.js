import axios from "axios";

class ISBNProvider {
    async getBook(isbn) {
        const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = resp.data;

        if (data == undefined) {
            return undefined;
        }

        if (data.totalItems == 0) {
            return undefined;
        }

        const item = data.items[0];
        const volumeInfo = item.volumeInfo;

        const title = volumeInfo.title;
        const author = volumeInfo.authors[0];
        const image = volumeInfo.imageLinks.thumbnail;

        const book = {
            name: title,
            author: author,
            image: image,
        };

        return book;
    }
}

const isbnProvider = new ISBNProvider();
export default isbnProvider;