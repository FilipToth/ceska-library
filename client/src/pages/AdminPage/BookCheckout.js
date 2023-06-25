import 'assets/SearchSuggestion.css'
import { useAuthHeader } from "react-auth-kit";
import CustomButton from "components/CustomButton";
import GenericSearchBar from "components/GenericSearchBar";
import { useState } from 'react';

const BookCheckout = () => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const [pageState, setPageState] = useState({
        book: undefined,
        person: undefined,
    });

    const getSuggestionWidget = (hit, click) => {
        return (
            <div className='Suggestion' onClick={click}>
                <p1 className='Suggestion-Text'>{hit.name}</p1>
            </div>
        )
    };

    const bookSuggestFunc = (hit) => {
        const click = () => {
            setPageState((state) => {
                return {
                    book: hit,
                    person: state.person,
                }
            });
        };

        return getSuggestionWidget(hit, click);
    };

    const personSuggestFunc = (hit) => {
        const click = () => {
            setPageState((state) => {
                return {
                    book: state.book,
                    person: hit,
                }
            });
        };

        return getSuggestionWidget(hit, click);
    };

    return (
        <div className="Form-Wrapper">
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Book Checkout</p1>
            </div>

            <GenericSearchBar
                placeholder='Search for the book you want to check out'
                indexName={'books'}
                query={pageState.book == undefined ? undefined : pageState.book.name}
                addInitialQuery={pageState.book != undefined}
                suggestionFunction={bookSuggestFunc}
                paddingTop={0}
                paddingBottom={0}
                width={400}
            />

            <GenericSearchBar
                placeholder='Search for the person checking the book out'
                indexName={'people'}
                query={pageState.person == undefined ? undefined : pageState.person.name}
                addInitialQuery={pageState.person != undefined}
                suggestionFunction={personSuggestFunc}
                paddingTop={0}
                paddingBottom={0}
                width={400}
            />

            <CustomButton msg='Checkout' />
        </div>
    );
};

export default BookCheckout;