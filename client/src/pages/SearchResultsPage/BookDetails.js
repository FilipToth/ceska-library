import 'assets/BookDetails.css';
import backend from 'services/backend';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getMonthName } from 'utils/dates';
import { getNumberOrdinal } from 'utils/ordinal';
import IsbnVerificationStatus from 'components/IsbnVerificationStatus';

const BookDetails = ({id, playClosingAnim}) => {
    let detailsWrapperClassname = 'Book-Details-Wrapper';
    if (playClosingAnim) {
        detailsWrapperClassname = 'Book-Details-Wrapper-Closing';
    }

    const [book, setBook] = useState({});
    useEffect(() => {
        // get location
        const setLocationFromAPI = async () => {
            const res = await backend.getBookByISBN(id);
            if (res.pages == 0)
                res.pages = 'unknown';

            const date = res.publishingYear;
            if (date.split('-').length != 1)
            {
                const dateObj = moment(date);
                const month = getMonthName(dateObj.month());
                const day = dateObj.day();

                const formatted = `${month} ${day}${getNumberOrdinal(day)} ${dateObj.year()}`;
                res.publishingYear = formatted;
            }
            
            setBook(res);
        };

        setLocationFromAPI();
    }, []);

    return (
        <div className={detailsWrapperClassname}>
            <div className='Header-Wrapper'>
                <div className='Header-Key-Value-Wrapper'>
                    <p1 className='Header-Key'>released:</p1>
                    <p1 className='Header-Value'>{book.publishingYear}</p1>
                </div>
                <div className='Header-Key-Value-Wrapper'>
                    <p1 className='Header-Key'>pages:</p1>
                    <p1 className='Header-Value'>{book.pages}</p1>
                </div>
            </div>
            <p1 className='Book-Description'>{book.description}</p1>
            <div className='Header-Key-Value-Wrapper'>
                <p1 className='Header-Key'>isbn:</p1>
                <p1 className='Header-Value'>{id}</p1>
                <IsbnVerificationStatus bogusISBN={true} valid={false} />
            </div>
        </div>
    );
}

export default BookDetails;