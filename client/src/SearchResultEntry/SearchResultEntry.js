import './SearchResultEntry.css'
import BookInfo from '../BookInfo';

const SearchResultEntry = () => {
    return (
        <div className='Entry-Wrapper'>
            <div className='Entry'>
                <img className='Book-Image' src='images/break_over.jpg'></img>
                <div className='Right-Wrapper'>
                    <div className='Info-Wrapper'>
                        <p1 className='Book-Name-Text'>Lorem Ipsum Book</p1>
                        <p1 className='Author-Name-Text'>By Dolor Sit Amet</p1>
                    </div>
                    <div className='Availability-Button'>
                        <p1 className='Availability-Text'>Check Availability</p1>
                    </div>
                </div>
            </div>
            <BookInfo />
        </div>
    )
}

export default SearchResultEntry;