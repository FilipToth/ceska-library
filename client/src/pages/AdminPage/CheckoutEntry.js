import 'assets/GenericListEntry.css'
import backend from 'services/backend';
import CustomButton from 'components/CustomButton';

const CheckoutEntry = ({ name, dueDateStr, checkoutDateStr, personName, bookID, token, popupFunction, updateFunction }) => {
    const dueDate = new Date(dueDateStr);
    const checkoutDate = new Date(checkoutDateStr);

    const locale = 'en-US';
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const returnBook = async () => {
        const resp = await backend.returnBook(token, bookID);
        if (!resp.success) {
            popupFunction('Could not return book!');
        } else {
            popupFunction('Book returned!');
        }

        updateFunction();
    };

    const overdue = dueDate < new Date();
    return (
        <div className="List-Entry-Wrapper">
            {
                overdue && <p1 className="Overdue-Text" style={{ color: 'red' }}>Overdue</p1>
            }
            <p1 className="Entry-Text">{name}</p1>
            <p1 className="Entry-Text">{personName}</p1>
            <p1 className="Entry-Text">{dueDate.toLocaleDateString(locale, options)}</p1>
            <p1 className="Entry-Text">{checkoutDate.toLocaleString(locale, options)}</p1>
            <CustomButton msg={'Return'} paddingHeight={6} paddingWidth={16} onClick={returnBook} />
        </div>
    );
};

export default CheckoutEntry;