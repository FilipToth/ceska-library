import 'assets/BookDetails.css';
import { useEffect, useState } from 'react';
import backend from 'services/backend';

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
        </div>
    );
}

export default BookDetails;