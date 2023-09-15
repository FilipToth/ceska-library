const axios = require('axios');

const getBookByISBN = async (isbn) => {
    const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    console.log(resp.data);
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
    const descripton = volumeInfo.description;
    const publishingYear = volumeInfo.publishedDate;
    const pages = volumeInfo.pageCount;
    const genre = volumeInfo.categories[0];

    const book = {
        name: title,
        author: author,
        image: image,
        description:  descripton,
        publishingYear: publishingYear,
        pages: pages,
        genre: genre
    };

    return book;
};

module.exports = { getBookByISBN };