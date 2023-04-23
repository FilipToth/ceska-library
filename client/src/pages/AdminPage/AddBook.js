import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";
import isbnProvider from "services/isbn";

const AddBook = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    let isbn = '';
    let title = '';
    let author = '';
    let library = '';
    let row = '';
    let column = '';

    const isbnChange = (e) => {
        isbn = e.target.value;
    }

    const titleChange = (e) => {
        title = e.target.value;
    };

    const authorChange = (e) => {
        author = e.target.value;
    };

    const libraryChange = (e) => {
        library = e.target.value;
    };

    const rowChange = (e) => {
        row = e.target.value;
    };

    const columnChange = (e) => {
        column = e.target.value;
    };


    const addBook = () => {
        if (isbn.trim() == '' || title.trim() == '' || author.trim() == '' || library.trim() == '' || row.trim() == '' || column.trim() == '') {
            popupFunction('Some fields are empty!', 2000, false);
            return;
        }

        const book = {
            isbn: isbn,
            title: title,
            author: author,
            library: library,
            row: row,
            column: column
        };

        backend.addBook(book, token);
        popupFunction('Book added!', 2000, false);
    };

    const searchIsbn = () => {
        isbnProvider.getBook(isbn).then((book) => {
            title = book.name;
            author = book.author;

            const titleField = document.getElementById('title');
            titleField.value = book.name;

            const authorField = document.getElementById('author');
            authorField.value = book.author;
        });
    };

    return (
        <div className='Add-Book-Wrapper'>
            <div className='Add-Book-Header-Wrapper'>
                <p1 className='Add-Book-Header'>Add a Book</p1>
                <p1 className='Add-Book-Subheader'>Pro tip: Just search for the ISBN and we’ll fill the info in for you</p1>
            </div>
            <div className='Add-Book-Form-Wrapper'>
                <div className='Add-Book-Form-Key-Wrapper'>
                    <p1 className='Add-Book-Form-Key'>ISBN</p1>
                    <p1 className='Add-Book-Form-Key'>Title</p1>
                    <p1 className='Add-Book-Form-Key'>Author</p1>
                    <p1 className='Add-Book-Form-Key'>Library</p1>
                    <p1 className='Add-Book-Form-Key'>Row</p1>
                    <p1 className='Add-Book-Form-Key'>Column</p1>
                </div>
                <div className="Add-Book-Input-Wrapper">
                    <TextBoxField onChange={isbnChange} placeholder={'...'} text={''} addSearchButton={true} searchButtonOnClick={searchIsbn} />
                    <TextBoxField onChange={titleChange} placeholder={'...'} text={''} id='title' />
                    <TextBoxField onChange={authorChange} placeholder={'...'} text={''} id='author' />
                    <TextBoxField onChange={libraryChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={rowChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={columnChange} placeholder={'...'} text={''} />
                </div>
            </div>
            <CustomButton msg={'Add'} paddingWidth={60} onClick={addBook} />
        </div>
    );
};

export default AddBook;