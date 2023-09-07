import algolia from "services/algolia";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";
import SearchableListView from "components/SearchableListView";
import PeopleListEntry from "./PeopleListEntry";

const PeopleList = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const handleSearch = async (query, allEntries) => {
        const hits = await algolia.searchPeople(query);
        const personHits = hits.map((hit) => {
            for (const item of allEntries) {
                if (item.name === hit.name) {
                    return item;
                }
            }
        });

        return personHits;
    };

    const handleGetItems = async () => {
        const people = await backend.getPeople(token);
        
        const items = [];
        for (const [id, person] of Object.entries(people)) {
            items.push({
                id: id,
                name: person.name,
                class: person.class,
                email: person.email
            });
        };

        return items;
    };

    const handleRenderItemEntry = (item) => {
        return (
            <PeopleListEntry name={item.name} className={item.class} email={item.email} id={item.id} />
        );
    };

    return (
        <SearchableListView searchFunction={handleSearch} getItems={handleGetItems} renderItemEntry={handleRenderItemEntry} databaseName={'People'} />
    );
};

export default PeopleList;