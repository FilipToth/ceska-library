import 'assets/BookInfo.css'
import LocationBtn from './LocationBtn';

const BookInfo = () => {
    return (
        <div className='Info-Container'>
            <div className='Info-Subframe'>
                <p1 className='Availability-Text'>Yeey! Available at 6 locations!</p1>
                <div className='Main-Info-Frame'>
                    <div className='Locations-Frame'>
                        <LocationBtn />
                        <LocationBtn />
                        <LocationBtn />
                        <LocationBtn />
                    </div>
                    <div className='Map-Frame'>

                    </div>
                </div>
            </div>
            <div className='Star-Frame'>

            </div>
        </div>
    );
}

export default BookInfo;