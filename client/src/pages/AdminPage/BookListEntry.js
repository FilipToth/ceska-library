import React, { useEffect, useState } from 'react';
import 'assets/BookListEntry.css';
import backend from 'services/backend';
import { useAuthHeader } from 'react-auth-kit';
import CustomButton from 'components/CustomButton';
import IsbnVerificationStatus from 'components/IsbnVerificationStatus';

const BookListEntry = ({ popupFunction, isbn, title, authorName, row, column, genre, note, publicNote, bogusISBN, validISBN }) => {
    const buttonPaddingHeight = 5;
    const buttonPaddingWidth = 7;

    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const [state, setState] = useState({
        row: row,
        column: column,
        genre: genre,
    });

    // this fixes an issue where the state.genre
    // would not match the genre prop because react
    // is trying to reuse the component
    
    useEffect(() => {
        setState({
            row: row,
            column: column,
            genre: genre
        });
    }, [row, column, genre]);

    const changeRow = (event) => {
        setState((state) => {
            return {
                ...state,
                row: event.target.value,
            };
        });
    };

    const changeColumn = (event) => {
        setState((state) => {
            return {
                ...state,
                column: event.target.value,
            };
        });
    };

    const changeGenre = (event) => {
        setState((state) => {
            return {
                ...state,
                genre: event.target.value,
            };
        });
    };

    const saveEdits = async () => {
        if (state.genre != genre) {
            // change main database
            const value = {
                genre: state.genre
            }

            // TODO: When genres implemented in algolia, change algolia database
            backend.changeBook(isbn, value, token);
        }

        if (state.row != row || state.column != column) {
            // change location database
            const value = { };
            if (state.row != row) {
                value['row'] = state.row;
            }

            if (state.column != column) {
                value['column'] = state.column;
            }

            backend.changeLocation(isbn, value, token);
        }

        popupFunction('Edits saved!', 2000, false);
    };
    
    console.log(note);
    return (
        <div className='Book-List-Entry-Wrapper'>
            <div className='Book-List-Entry-General-Wrapper'>
                <p1 className='Entry-Text'>{title}</p1>
                <p1 className='Entry-Text'>{authorName}</p1>
                <p1 className='Entry-Text'>{isbn}</p1>
                <IsbnVerificationStatus bogusISBN={bogusISBN} valid={validISBN} />
                <div className='Field-Group-Wrapper'>
                    <p1 className='Field-Text'>row:</p1>
                    <input value={state.row} size={2} onChange={changeRow} />
                </div>
                <div className='Field-Group-Wrapper'>
                    <p1 className='Field-Text'>column:</p1>
                    <input value={state.column} size={2} onChange={changeColumn} />
                </div>
                <div className='Field-Group-Wrapper'>
                    <p1 className='Field-Text'>genre:</p1>
                    <input value={state.genre} size={7} onChange={changeGenre} />
                </div>
                <CustomButton msg={'Save'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} onClick={saveEdits} />
                <CustomButton msg={'History'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} />
                <CustomButton msg={'Checkout'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} />
            </div>
            { (publicNote != '' || note != '') &&
                <div className='Book-List-Entry-Notes-Wrapper'>
                    { note != '' &&
                        <p1 className='Entry-Text Note-Text'>{note}</p1>
                    }
                    { publicNote != '' &&
                        <p1 className='Entry-Text Note-Text'>{publicNote}</p1>
                    }
                </div>
            }
        </div>
    );
}

export default BookListEntry;