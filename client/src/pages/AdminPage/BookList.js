import 'assets/BookList.css';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import BookListEntry from "./BookListEntry";
import GenericSearchBar from "components/GenericSearchBar";

const BookList = ({ popupFunction }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const books = await backend.getAllBooks();
            const locations = await backend.getAllLocations();

            const res = [];
            for (const [isbn, book] of Object.entries(books)) {
                const location = locations[isbn];

                res.push({
                    isbn: isbn,
                    title: book.name,
                    author: book.author,
                    genre: book.genre,
                    row: location.row,
                    column: location.column,
                });
            }

            setBooks(res);
        }

        getBooks();
    }, []);

    return (
        <div className='Book-List-Wrapper'>
            <div className='Search-Wrapper'>
                <GenericSearchBar />
            </div>

            <div className='Book-List-Entry-Layout-Container'>
                {books.map((book) => (
                    <BookListEntry isbn={book.isbn} title={book.title} authorName={book.author} row={book.row} column={book.column} genre={book.genre} />
                ))}
            </div>
        </div>
    )
}

export default BookList;