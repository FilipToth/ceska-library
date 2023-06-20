import 'assets/BookListEntry.css';
import CustomButton from 'components/CustomButton';

const BookListEntry = () => {
    return (
        <div className='Book-List-Entry-Wrapper'>
            <p1>Book name</p1>
            <p1>Author name</p1>
            <p1>row:</p1>
            <input placeholder='Row' value={1}></input>
            <p1>column:</p1>
            <input placeholder='Column' value={1}></input>
            <p1>genre:</p1>
            <input placeholder='Genre' value={'Fiction'}></input>
            <CustomButton msg='Save Edits' paddingHeight={4} paddingWidth={20} />
        </div>
    );
}

export default BookListEntry;