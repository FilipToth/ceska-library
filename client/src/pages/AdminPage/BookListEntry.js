import { useState } from 'react';
import 'assets/BookListEntry.css';
import CustomButton from 'components/CustomButton';

const BookListEntry = ({ isbn, title, authorName, row, column, genre}) => {
    const buttonPaddingHeight = 4;
    const buttonPaddingWidth = 10;

    const [state, setState] = useState({
        row: row,
        column: column,
        genre: genre,
    });

    const changeRow = (event) => {
        setState((state) => {
            return {
                row: event.target.value,
                column: state.column,
                genre: state.genre,
            };
        });
    };

    const changeColumn = (event) => {
        setState((state) => {
            return {
                row: state.row,
                column: event.target.value,
                genre: state.genre,
            };
        });
    };

    const changeGenre = (event) => {
        setState((state) => {
            return {
                row: state.row,
                column: state.column,
                genre: event.target.value,
            };
        });
    };
    
    return (
        <div className='Book-List-Entry-Wrapper'>
            <p1 className='Entry-Text'>{title}</p1>
            <p1 className='Entry-Text'>{authorName}</p1>
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
                <input value={state.genre} size={10} onChange={changeGenre} />
            </div>
            <CustomButton msg={'Save Edits'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} />
            <CustomButton msg={'Check History'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} />
            <CustomButton msg={'Checkout'} paddingHeight={buttonPaddingHeight} paddingWidth={buttonPaddingWidth} />
        </div>
    );
}

export default BookListEntry;