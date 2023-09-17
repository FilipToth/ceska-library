import { useRef } from "react";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";
import SearchableListView from "components/SearchableListView";
import CheckoutEntry from "./CheckoutEntry";

const CheckoutsList = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const listRef = useRef(null);

    const handleGetItems = async () => {
        const checkouts = await backend.getCheckouts(token);

        const items = [];
        for (const [id, checkout] of Object.entries(checkouts)) {
            items.push({
                bookID: id,
                personID: checkout.personID,
                personName: checkout.personName,
                bookName: checkout.bookName,
                dueDate: checkout.dueDate,
                checkoutDate: checkout.checkoutDate
            });
        }

        return items;
    };

    const update = () => {
        listRef.current.update();
    }

    const handleRenderItemEntry = (item) => {
        return (
            <CheckoutEntry
                name={item.bookName}
                dueDateStr={item.dueDate}
                checkoutDateStr={item.checkoutDate}
                personName={item.personName}
                bookID={item.bookID}
                token={token}
                popupFunction={popupFunction}
                updateFunction={update}
            />
        );
    };

    const sortOptions = [
        {
            msg: 'book name',
            getSortableElement: (dbItem) => {
                return dbItem.bookName;
            }
        },
        {
            msg: 'person',
            getSortableElement: (dbItem) => {
                return dbItem.personName;
            }
        },
        {
            msg: 'due',
            getSortableElement: (dbItem) => {
                return dbItem.dueDate;
            }
        },
        {
            msg: 'checkout date',
            getSortableElement: (dbItem) => {
                return dbItem.checkoutDate;
            }
        }
    ];

    return (
        <SearchableListView ref={listRef} getItems={handleGetItems} renderItemEntry={handleRenderItemEntry} databaseName={'Checkouts'} renderSearch={false} popupFunction={popupFunction} sortOptions={sortOptions} />
    )
};

export default CheckoutsList;