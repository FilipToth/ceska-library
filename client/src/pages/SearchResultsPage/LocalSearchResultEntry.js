import 'assets/SearchResultEntry.css';
import LocationInfo from './LocationInfo';
import { useEffect, useState } from 'react';
import CustomButton from 'components/CustomButton';
import isbnProvider from 'services/isbn';

const LocalSearchResultEntry = ({ bookName, authorName, id, locationOpenByDefault }) => {
    const [locationOpen, setLocationOpen] = useState(locationOpenByDefault);
    const [closedLocationWidget, setClosedLocationWidget] = useState(false);
    const [image, setImage] = useState('images/break_over.jpg');
    const showLocClick = () => {
        if (locationOpen == true) {
            setClosedLocationWidget(true);
        } else {
            setClosedLocationWidget(false);
        }

        setLocationOpen(!locationOpen);
    };

    let locationWidget = <></>;
    if (locationOpen) {
        locationWidget = <LocationInfo id={id} playClosingAnim={false} />;
    } else if (closedLocationWidget) {
        locationWidget = <LocationInfo id={id} playClosingAnim={true} />;
        
        // destroy location widget after animation
        setTimeout(() => {
            setClosedLocationWidget(false);
        }, 500);
    }

    useEffect(() => {
        const getImage = async () => {
            const book = await isbnProvider.getBook(id);
            setImage(book.image);
        }

        getImage();
    })

    const booknameFontSize = bookName.length > 30 ? '1.1rem' : '1.5rem';
    const booknameStyle = {
        fontSize: booknameFontSize
    }

    return (
        <div className='Entry-Wrapper'>
           <div className='Entry'>
                <img className='Book-Image' src={image}></img>
                <div className='Right-Wrapper'>
                    <div className='Info-Wrapper'>
                        <p1 className='Book-Name-Text' style={booknameStyle}>{bookName}</p1>
                        <p1 className='Author-Name-Text'>By {authorName}</p1>
                    </div>
                    <CustomButton msg='Check Location' onClick={showLocClick} paddingWidth={40} paddingHeight={10} width={130} />
                </div>
            </div>

            { locationWidget }
        </div>
    )
}

export default LocalSearchResultEntry;