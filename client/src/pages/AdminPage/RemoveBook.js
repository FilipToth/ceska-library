import { useState } from "react";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";
import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";
import GenericSearchBar from "components/GenericSearchBar";

const RemoveBook = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];
    const [nameQueryBook, setNameQueryBook] = useState();

    let isbn = '';
    const isbnChange = (e) => {
        isbn = e.target.value;
    };

    const removeBook = () => {
        if (isbn.trim() == '' && nameQueryBook == undefined) {
            popupFunction('ISBN cannot be empty!', 2000, false);
            return;
        }

        if (nameQueryBook != undefined)
            isbn = nameQueryBook.isbn;

        backend.removeBook(isbn, token);
        popupFunction('Book removed!', 2000, false);
    };

    const getSuggestionWidget = (hit, click) => {
        return (
            <div className='Suggestion' onClick={click}>
                <p1 className='Suggestion-Text'>{hit.name}</p1>
            </div>
        )
    };

    const bookSuggestFunc = (hit) => {
        const click = () => {
            isbn = '';
            setNameQueryBook(hit);
        };

        return getSuggestionWidget(hit, click);
    };

    return (
        <div className="Form-Wrapper">
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Remove a Book</p1>
                <p1 className='Add-Book-Subheader'>Pro tip: You can search by the ISBN or the title.</p1>
                <p1 className='Add-Book-Subheader'>If you enter both the title and the isbn, we'll remove the book by title.</p1>
            </div>
            <div className='Inner-Form-Wrapper'>
                <div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key'>ISBN</p1>
                    <p1 className='Inner-Form-Key'>Title</p1>
                </div>
                <div className="Inner-Input-Wrapper">
                    <TextBoxField onChange={isbnChange} placeholder={'...'} text={''} />
                    <GenericSearchBar
                        placeholder='Search for the book you want to check out'
                        indexName={'books'}
                        query={nameQueryBook == undefined ? undefined : nameQueryBook.name}
                        addInitialQuery={nameQueryBook != undefined}
                        suggestionFunction={bookSuggestFunc}
                        paddingTop={0}
                        paddingBottom={0}
                        lowerBoxTopPadidng={0}
                        textBoxHeight={29}
                        width={340}
                    />
                </div>
            </div>
            <CustomButton msg={'Remove'} paddingWidth={60} onClick={removeBook} />
        </div>
    )
}

export default RemoveBook;