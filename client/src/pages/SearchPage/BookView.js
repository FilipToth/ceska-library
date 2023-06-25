import 'assets/BookView.css'
import NavBar from 'components/NavBar';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import CustomButton from "components/CustomButton";
import LocalSearchResultEntry from "pages/SearchResultsPage/LocalSearchResultEntry";

const BookView = () => {
    // calculate max items
    const windowWidth = window.innerWidth;
    const itemWidth = 526;
    const gap = 32;

    const numItemsPerRow = Math.floor((windowWidth - gap) / (itemWidth + gap));
    const maxHeight = 3;
    const maxItems = numItemsPerRow * maxHeight;

    const tabs = {
        'All Books': '*',
        'Fiction': 'Fiction',
        'Science Fiction': 'Science Fiction',
        'Non-Fiction': 'Non-Fiction',
        'Thriller': 'Thriller'
    };

    const select = (index) => {
        let genre = Object.values(tabs)[index];
        setPageState({
            navBarChildren: NavBar.getTabChildren(tabs, select, index),
            genre: genre,
        });
    };

    const [pageState, setPageState] = useState({
        navBarChildren: NavBar.getTabChildren(tabs, select, 0),
        genre: Object.values(tabs)[0],
    });
    
    const [bookResult, setBookResult] = useState({
        bookEntries: [],
        showMoreButton: <></>,
        numItemsToShow: maxItems,
    });

    const showMoreClick = () => {
        setBookResult((state) => {
            const toShow = state.numItemsToShow + maxItems;

            let button = <></>;
            if (state.bookEntries.length > toShow) {
                button = state.showMoreButton;
            }

            return {
                ...state,
                showMoreButton: button,
                numItemsToShow: toShow,
            };
        });
    };

    useEffect(() => {
        const addResultingBooks = async () => {
            const res = [];
            const books = await backend.getBooksByGenre(pageState.genre);
            for (const [key, book] of Object.entries(books)) {
                const title = book.name;
                const author = book.author;
                
                res.push({
                    isbn: key,
                    title: title,
                    author: author
                })
            }

            let showMoreButton = <></>;
            if (res.length > maxItems) {
                showMoreButton = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            setBookResult({
                bookEntries: res,
                showMoreButton: showMoreButton,
                numItemsToShow: maxItems,
            });
        }

        addResultingBooks();
    }, [pageState]);

    return (
        <div className='Book-List-Div'>
            <NavBar useRelativePosition={true} leftChildren={pageState.navBarChildren} rightChildren={[]} fitContent={true} useCenterAlign={true} />
            <div className='Book-View-Wrapper'>
                <div className='Book-View-Result-Wrapper'>
                    {bookResult.bookEntries.slice(0, bookResult.numItemsToShow).map((book) => (
                        <LocalSearchResultEntry bookName={book.title} authorName={book.author} locationOpenByDefault={false} id={book.isbn} />
                    ))}
                </div>
                { bookResult.showMoreButton }
            </div>
        </div> 
    );
}

export default BookView;