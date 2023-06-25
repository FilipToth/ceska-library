import backend from "services/backend";
import algolia from "services/algolia";
import { useAuthHeader } from "react-auth-kit";
import SearchableListView from "components/SearchableListView";
import CheckoutEntry from "./CheckoutEntry";

const CheckoutsList = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

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

    const handleRenderItemEntry = (item) => {
        return (
            <CheckoutEntry name={item.bookName} dueDateStr={item.dueDate} checkoutDateStr={item.checkoutDate} personName={item.personName} personID={item.personID} />
        );
    };

    return (
        <SearchableListView getItems={handleGetItems} renderItemEntry={handleRenderItemEntry} renderSearch={false} />
    )
};

export default CheckoutsList;