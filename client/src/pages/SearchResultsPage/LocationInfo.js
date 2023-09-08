import 'assets/LocationInfo.css';
import getOrginal from 'utils/ordinal';
import { useEffect, useState } from 'react';
import backend from 'services/backend';

// TODO: Change css file to proper name
// TODO: Change animation class to proper name

const LocationInfo = ({id, playClosingAnim}) => {
    let locationInfoClassName = 'Location-Info';
    if (playClosingAnim) {
        locationInfoClassName = 'Location-Info-Closing';
    }

    const [location, setLocation] = useState({});
    useEffect(() => {
        // get location
        const setLocationFromAPI = async () => {
            const res = await backend.getLocation(id);
            setLocation(res);
        };

        setLocationFromAPI();
    }, []);

    const rowOrdinal = getOrginal(location.row);
    const columnOrdinal = getOrginal(location.column);

    /* return (
        <div className={locationInfoClassName}>
            <div className='Header-Wrapper'>
                <p1 className='Head-To-Text'>Head down to</p1>
                <p1 className='Library-Name-Text'>“Ceska 10 2nd Floor Library”</p1>
            </div>
            <div className='Location-Wrapper'>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>{location.row}</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>{rowOrdinal}</p1>
                            <div className='Underline-Div'></div>
                        </div>
                    </div>
                    <p1 className='Row-Column-Text'>row</p1>
                </div>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>{location.column}</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>{columnOrdinal}</p1>
                            <div className='Underline-Div'></div>
                        </div>
                    </div>
                    <p1 className='Row-Column-Text'>column</p1>
                </div>
            </div>
        </div>
    ) */

    return (
        <div className={locationInfoClassName}>
            <div className='Header-Wrapper'>
                
            </div>
        </div>
    );
}

export default LocationInfo;