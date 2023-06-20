import 'assets/BookList.css';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import BookListEntry from "./BookListEntry";
import CustomButton from 'components/CustomButton';
import GenericSearchBar from "components/GenericSearchBar";

const maxItemsPerLoad = 10;

const BookList = ({ popupFunction }) => {
    const [pageState, setPageState] = useState({
        books: [],
        numItemsToShow: maxItemsPerLoad,
        showMoreButton: <></>,
    });

    const showMoreClick = () => {
        setPageState((state) => {
            const toShow = state.numItemsToShow + maxItemsPerLoad;

            let button = <></>;
            if (state.books.length > toShow) {
                button = state.showMoreButton;
            }

            return {
                books: state.books,
                showMoreButton: button,
                numItemsToShow: toShow,
            };
        });
    };

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
            
            let button = <></>;
            if (res.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            setPageState((state) => {
                return {
                    books: res,
                    numItemsToShow: state.numItemsToShow,
                    showMoreButton: button,
                }
            });
        }

        getBooks();
    }, []);

    return (
        <div className='Book-List-Wrapper'>
            <div className='Search-Wrapper'>
                <GenericSearchBar />
            </div>

            <div className='Book-List-Entry-Layout-Container'>
                {pageState.books.slice(0, pageState.numItemsToShow).map((book) => (
                    <BookListEntry isbn={book.isbn} title={book.title} authorName={book.author} row={book.row} column={book.column} genre={book.genre} />
                ))}
            </div>

            {pageState.showMoreButton}
        </div>
    )
}

export default BookList;