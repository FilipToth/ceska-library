import 'assets/GenericListEntry.css';
import { useState } from 'react';
import { SortState } from 'utils/sort';
import CustomButton from './CustomButton';

const SortEntry = ({ entries }) => {

    // get widths of items inside the
    // example entry and set gap filler
    // styles based on that?
    // TODO: Implement

    const initialButtonMessages = {};
    for (const entry of entries) {
        initialButtonMessages[entry.msg] = SortState.Uninitialized;
    }

    const [buttonStates, setSortStates] = useState(initialButtonMessages);

    const getButtonText = (entry) => {
        const state = buttonStates[entry.msg];
        const message = `${entry.msg} ${state}`;
        return message;
    };

    const buttonClick = (entry) => {
        const newState = {};
        for (const key in buttonStates) {
            newState[key] = SortState.Uninitialized;
        }

        let toAssign = undefined;
        const oldVal = buttonStates[entry.msg];
        if (oldVal == SortState.Ascending) {
            toAssign = SortState.Descending;
        } else {
            toAssign = SortState.Ascending;
        }

        newState[entry.msg] = toAssign;

        setSortStates(newState);
        entry.callback(toAssign);
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