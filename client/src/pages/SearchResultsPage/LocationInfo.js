import 'assets/LocationInfo.css';

const LocationInfo = () => {
    return (
        <div className='Location-Info'>
            <div className='Header-Wrapper'>
                <p1 className='Head-To-Text'>Head down to</p1>
                <p1 className='Library-Name-Text'>“Ceska 10 2nd Floor Library”</p1>
            </div>
            <div className='Location-Wrapper'>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>3</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>rd</p1>
                            <div className='Underline-Div'></div>
                        </div>
                    </div>
                    <p1 className='Row-Column-Text'>row</p1>
                </div>
                <div className='Column-Row-Wrapper'>
                    <div className='Number-Wrapper'>
                        <p1 className='Number-Text'>2</p1>
                        <div className='Ordinal-Wrapper'>
                            <p1 className='Ordinal-Suffix-Text'>nd</p1>
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