import 'assets/GenericListEntry.css';
import CustomButton from './CustomButton';

const SortEntry = ({ exampleEntry }) => {

    // get widths of items inside the
    // example entry and set gap filler
    // styles based on that?
    
    const dummyEntryStyle = {
        flex: '1 0 0'
    };

    return (
        <div className='List-Entry-Wrapper'>
            <CustomButton msg='title' paddingHeight={4} paddingWidth={15} />
            <CustomButton msg='author' paddingHeight={4} paddingWidth={15} />
            <div style={dummyEntryStyle}></div>
            <CustomButton msg='genre' paddingHeight={4} paddingWidth={15} />
        </div>
    );
};

export default SortEntry;