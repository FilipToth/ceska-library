import 'assets/BookView.css'
import backend from 'services/backend';
import { createRef, useEffect, useRef, useState } from 'react';
import CustomButton from "components/CustomButton";
import LocalSearchResultEntry from "pages/SearchResultsPage/LocalSearchResultEntry";
import GenreBar from './GenreBar';

const BookView = () => {
    // calculate max items
    const windowWidth = window.innerWidth;
    const itemWidth = 526;
    const gap = 32;

    const numItemsPerRow = Math.floor((windowWidth - gap) / (itemWidth + gap));
    const maxHeight = 3;
    const maxItems = numItemsPerRow * maxHeight;

    const [selectedGenre, setSelectedGenre] = useState({
        genre: undefined,
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
            if (selectedGenre.genre == undefined)
                return;
            
            const res = [];
            const books = await backend.getBooksByGenre(selectedGenre.genre);
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
    }, [selectedGenre]);

    const resultRefs = useRef([]);
    const genreChanged = (selection) => {
        resultRefs.current.forEach((ref) => {
            if (ref == null)
                return;
            
            ref.clearDetails();
        });

        resultRefs.current = [];
        setSelectedGenre({
            genre: selection
        });
    };

    return (
        <div className='Book-List-Div'>
            <GenreBar onChange={genreChanged} />
            <div className='Book-View-Wrapper'>
                <div className='Book-View-Result-Wrapper'>
                    {bookResult.bookEntries.slice(0, bookResult.numItemsToShow).map((book, index) => (
                        <LocalSearchResultEntry
                            ref={(e) => { resultRefs.current[index] = e }}
                            bookName={book.title}
                            authorName={book.author}
                            locationOpenByDefault={false}
                            id={book.isbn}
                        />
                    ))}
                </div>
                { bookResult.showMoreButton }
            </div>
        </div> 
    );
}

export default BookView;