import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";

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
    let genre = '';
    let note = '';
    let bogusISBN = false;

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

    const genreChange = (e) => {
        genre = e.target.value;
    };

    const noteChange = (e) => {
        note = e.target.value;
    };

    const bogusChange = (e) => {
        bogusISBN = e.target.checked;
    };

    const addBook = () => {
        if (isbn.trim() == '' || title.trim() == '' || author.trim() == '' || library.trim() == '' || row.trim() == '' || column.trim() == '' || genre.trim() == '') {
            popupFunction('Some fields are empty!', 2000, false);
            return;
        }

        const book = {
            isbn: isbn,
            title: title,
            author: author,
            library: library,
            row: row,
            column: column,
            genre: genre,
            note: note,
            bogusISBN: bogusISBN,
        };

        backend.addBook(book, token);
        popupFunction('Book added!', 2000, false);
    };

    const searchIsbn = async () => {
        const book = await backend.getBookByISBN(isbn);
        if (book === undefined) {
            popupFunction("Can't get book information");
            return;
        }
        
        title = book.name;
        author = book.author;

        const titleField = document.getElementById('title');
        titleField.value = book.name;
        title = book.name;

        const authorField = document.getElementById('author');
        authorField.value = book.author;
        author = book.author;

        const genreField = document.getElementById('genre');
        genreField.value = book.genre;
        genre = book.genre;
    };

    return (
        <div className='Form-Wrapper'>
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Add a Book</p1>
                <p1 className='Add-Book-Subheader'>Pro tip: Just search for the ISBN and we’ll fill the info in for you</p1>
            </div>
            <div className='Inner-Form-Wrapper'>
                <div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key'>ISBN</p1>
                    <p1 className='Inner-Form-Key'>Title</p1>
                    <p1 className='Inner-Form-Key'>Author</p1>
                    <p1 className='Inner-Form-Key'>Library</p1>
                    <p1 className='Inner-Form-Key'>Row</p1>
                    <p1 className='Inner-Form-Key'>Column</p1>
                    <p1 className='Inner-Form-Key'>Genre</p1>
                    <p1 className='Inner-Form-Key'>Note</p1>
                    <p1 className='Inner-Form-Key'>Bogus ISBN?</p1>
                </div>
                <div className='Inner-Input-Wrapper'>
                    <TextBoxField onChange={isbnChange} placeholder={'...'} text={''} addSearchButton={true} searchButtonOnClick={searchIsbn} />
                    <TextBoxField onChange={titleChange} placeholder={'...'} text={''} id='title' />
                    <TextBoxField onChange={authorChange} placeholder={'...'} text={''} id='author' />
                    <TextBoxField onChange={libraryChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={rowChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={columnChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={genreChange} placeholder={'...'} text={''} id='genre' />
                    <TextBoxField onChange={noteChange} placeholder={'...'} text={''} />
                    <input type='checkbox' onChange={bogusChange}></input>
                </div>
            </div>
            <CustomButton msg={'Add'} paddingWidth={60} onClick={addBook} />
        </div>
    );
};

export default AddBook;