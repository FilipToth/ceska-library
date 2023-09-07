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
        console.log("update")
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

    return (
        <SearchableListView ref={listRef} getItems={handleGetItems} renderItemEntry={handleRenderItemEntry} databaseName={'Checkouts'} renderSearch={false} />
    )
};

export default CheckoutsList;