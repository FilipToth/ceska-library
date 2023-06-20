import 'assets/BookList.css';
import BookListEntry from "./BookListEntry";
import GenericSearchBar from "components/GenericSearchBar";

const BookList = ({ popupFunction }) => {
    return (
        <div className='Book-List-Wrapper'>
            <div className='Search-Wrapper'>
                <GenericSearchBar />
            </div>

            <div className='Book-List-Entry-Layout-Container'>
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
                <BookListEntry />
            </div>
        </div>
    )
}

export default BookList;