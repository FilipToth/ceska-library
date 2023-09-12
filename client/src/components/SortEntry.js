import 'assets/GenericListEntry.css';
import { useState } from 'react';
import CustomButton from './CustomButton';

const SortEntry = ({ entries }) => {

    // get widths of items inside the
    // example entry and set gap filler
    // styles based on that?
    // TODO: Implement

    const ButtonState = {
        Uninitialized: '',
        Ascending: 'ascending',
        Descending: 'descending'
    };

    const initialButtonMessages = {};
    for (const entry of entries) {
        initialButtonMessages[entry.msg] = ButtonState.Uninitialized;
    }

    const [buttonStates, setButtonStates] = useState(initialButtonMessages);

    const getButtonText = (entry) => {
        const state = buttonStates[entry.msg];
        const message = `${entry.msg} ${state}`;
        return message;
    };

    const buttonClick = (entry) => {
        const newState = {};
        for (const key of Object.keys(buttonStates)) {
            newState[key] = ButtonState.Uninitialized;
        }

        const oldVal = buttonStates[entry.msg];
        if (oldVal == ButtonState.Ascending) {
            newState[entry.msg] = ButtonState.Descending;
        } else {
            newState[entry.msg] = ButtonState.Ascending;
        }

        setButtonStates(newState);
        entry.callback();
    };

    return (
        <div className='List-Entry-Wrapper'>
            {entries.map((entry) => (
                <CustomButton msg={getButtonText(entry)} paddingHeight={4} paddingWidth={15} onClick={() => buttonClick(entry)} />
            ))}
        </div>
    );
};

export default SortEntry;