import 'assets/BookView.css'
import NavBar from 'components/NavBar';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import CustomButton from "components/CustomButton";
import LocalSearchResultEntry from "pages/SearchResultsPage/LocalSearchResultEntry";

const BookView = () => {
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
    
    const [resultingBooks, setResultingBooks] = useState(<></>);
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

            setResultingBooks(<div className='Book-View-Result-Wrapper'>
                {res.map((book) => (
                    <LocalSearchResultEntry bookName={book.title} authorName={book.author} locationOpenByDefault={false} id={book.isbn} />
                ))}
            </div>);
        }

        addResultingBooks();
    }, [pageState]);

    return (
        <div className='Book-List-Div'>
            <NavBar useRelativePosition={true} leftChildren={pageState.navBarChildren} rightChildren={[]} fitContent={true} />
            <div className='Book-View-Wrapper'>
                {resultingBooks
                }
                <CustomButton msg='Show me more!' width={130} />
            </div>
        </div> 
    );
}

export default BookView;