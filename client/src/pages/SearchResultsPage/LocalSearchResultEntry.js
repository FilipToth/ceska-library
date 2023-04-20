import 'assets/SearchResultEntry.css';
import LocationInfo from './LocationInfo';
import { useState } from 'react';

const LocalSearchResultEntry = ({ locationOpenByDefault }) => {
    const [locationOpen, setLocationOpen] = useState(locationOpenByDefault);
    const [closedLocationWidget, setClosedLocationWidget] = useState(false);
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
        locationWidget = <LocationInfo row={2} column={3} playClosingAnim={false} />;
    } else if (closedLocationWidget) {
        locationWidget = <LocationInfo row={2} column={3} playClosingAnim={true} />;
        
        // destroy location widget after animation
        setTimeout(() => {
            setClosedLocationWidget(false);
        }, 500);
    }

    return (
        <div className='Entry-Wrapper'>
           <div className='Entry'>
                <img className='Book-Image' src='images/break_over.jpg'></img>
                <div className='Right-Wrapper'>
                    <div className='Info-Wrapper'>
                        <p1 className='Book-Name-Text'>Lorem Ipsum Book</p1>
                        <p1 className='Author-Name-Text'>By Dolor Sit Amet</p1>
                    </div>
                    <div className='Availability-Button' onClick={showLocClick}>
                        <p1 className='Availability-Text'>Check Location</p1>
                    </div>
                </div>
            </div>

            { locationWidget }
        </div>
    )
}

export default LocalSearchResultEntry;