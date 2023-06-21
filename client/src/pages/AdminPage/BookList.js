import 'assets/BookList.css';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import BookListEntry from "./BookListEntry";
import CustomButton from 'components/CustomButton';
import GenericSearchBar from "components/GenericSearchBar";
import algolia from 'services/algolia';

const maxItemsPerLoad = 10;

const BookList = ({ popupFunction }) => {
    const [pageState, setPageState] = useState({
        books: [],
        booksToRender: [],
        numItemsToShow: maxItemsPerLoad,
        showMoreButton: <></>,
        searchQuery: ''
    });

    const searchQueryChanged = async (event) => {
        const query = event.target.value;
        const hits = await algolia.search(query);

        const bookHits = hits.map((isbn) => {
            for (const book of pageState.books) {
                if (book.isbn === isbn) {
                    return book;
                }
            }
        });

        setPageState((state) => {
            let button = <></>;
            if (bookHits.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            return {
                books: state.books,
                booksToRender: bookHits,
                numItemsToShow: maxItemsPerLoad,
                showMoreButton: button,
                searchQuery: state.searchQuery,
            };
        });
    };

    const showMoreClick = () => {
        setPageState((state) => {
            const toShow = state.numItemsToShow + maxItemsPerLoad;

            let button = <></>;
            if (state.booksToRender.length > toShow) {
                button = state.showMoreButton;
            }

            return {
                books: state.books,
                booksToRender: state.booksToRender,
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
                    booksToRender: res,
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
                <GenericSearchBar currentRefinement={pageState.searchQuery} changeFunc={searchQueryChanged} />
            </div>

            <div className='Book-List-Entry-Layout-Container'>
                {pageState.booksToRender.slice(0, pageState.numItemsToShow).map((book) => (
                    <BookListEntry isbn={book.isbn} title={book.title} authorName={book.author} row={book.row} column={book.column} genre={book.genre} />
                ))}
            </div>

            {pageState.showMoreButton}
        </div>
    )
}

export default BookList;