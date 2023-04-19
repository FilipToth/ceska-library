import 'assets/LocationInfo.css';
import getOrginal from 'utils/ordinal';

const LocationInfo = ({row, column}) => {
    const rowOrdinal = getOrginal(row);
    const columnOrdinal = getOrginal(column);

    return (
        <div className='Location-Info'>
            <div className='Header-Wrapper'>
                <p1 className='Head-To-Text'>Head down to</p1>
                <p1 className='Library-Name-Text'>“Ceska 10 2nd Floor Library”</p1>
            </div>
            <div className='Location-Wrapper'>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>{row}</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>{rowOrdinal}</p1>
                            <div className='Underline-Div'></div>
                        </div>
                    </div>
                    <p1 className='Row-Column-Text'>row</p1>
                </div>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>{column}</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>{columnOrdinal}</p1>
                            <div className='Underline-Div'></div>
                        </div>
                    </div>
                    <p1 className='Row-Column-Text'>column</p1>
                </div>
            </div>
        </div>
    )
}

export default LocationInfo;