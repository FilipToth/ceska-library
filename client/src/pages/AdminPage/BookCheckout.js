import 'assets/BookCheckout.css'
import 'assets/SearchSuggestion.css'
import 'react-datepicker/dist/react-datepicker.css';
import backend from 'services/backend';
import { useAuthHeader } from "react-auth-kit";
import CustomButton from "components/CustomButton";
import GenericSearchBar from "components/GenericSearchBar";
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';

const getDateMonthFromNow = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
};

const BookCheckout = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const [pageState, setPageState] = useState({
        book: undefined,
        person: undefined,
        date: getDateMonthFromNow()
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
                    ...state,
                    book: hit,
                }
            });
        };

        return getSuggestionWidget(hit, click);
    };

    const personSuggestFunc = (hit) => {
        const click = () => {
            setPageState((state) => {
                return {
                    ...state,
                    person: hit,
                }
            });
        };

        return getSuggestionWidget(hit, click);
    };

    const dateChanged = (date) => {
        setPageState((state) => {
            return {
                ...state,
                date: date
            }
        });
    };

    const checkout = async () => {
        if (pageState.book == undefined || pageState.person == undefined) {
            popupFunction('Some fields are empty!', 2000, false);
            return;
        }

        const isbn = pageState.book.objectID;
        const personID = pageState.person.objectID;
        const date = pageState.date;

        const resp = await backend.checkout(token, isbn, personID, date);
        if (resp.success == false) {
            popupFunction(resp.err, 2000, false);
        } else {
            popupFunction('Book checked out!', 2000, true);
        }
    };

    const DateInput = forwardRef(({ value, onClick }, ref) => {
        return (
            <div className='Date-Picker-Wrapper'>
                <CustomButton onClick={onClick} ref={ref} paddingHeight={10} paddingWidth={138}>
                    {value}
                </CustomButton>
            </div>
        );
    });

    const formKeyStyle = {
        innerHeight: 'auto',
        display: 'unset',
        height: 'auto',
        textAlign: 'center'
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
                lowerBoxTopPadidng={0}
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
                lowerBoxTopPadidng={0}
                width={400}
            />

            <div className='Inner-Form-Wrapper'>
                <div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key' style={formKeyStyle}>Due:</p1>
                </div>
                <div className="Inner-Input-Wrapper">
                    <DatePicker
                        selected={pageState.date}
                        onChange={dateChanged}
                        customInput={<DateInput />}
                    />
                </div>
            </div>

            <CustomButton
                msg='Checkout'
                onClick={checkout}
            />
        </div>
    );
};

export default BookCheckout;