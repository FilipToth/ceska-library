import axios from "axios";

class ISBNProvider {
    async getAuthor(authorID) {
        // example author id: /authors/OL34184A
        console.log(`https://openlibrary.org${authorID}.json`);
        const resp = await axios.get(`https://openlibrary.org${authorID}.json`);
        const data = resp.data;

        const author = {
            name: data.personal_name,
        };

        return author;
    }

    async getBook(isbn) {
        const resp = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
        const data = resp.data;

        if (data == undefined) {
            return undefined;
        }

        const author = await this.getAuthor(data.authors[0].key);
        const book = {
            name: data.title,
            author: author.name
        };

        return book;
    }
}

const isbnProvider = new ISBNProvider();
export default isbnProvider;