import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import backend from "services/backend";

const GenreBar = ({ onChange }) => {
    // NavBar.getTabChildren(tabs, select, index),
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);

    const selected = (index) => {
        setIndex(index);

        const key = Object.keys(categories)[index];
        const entry = categories[key];
        onChange(entry);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            var books = await backend.getAllBooks();
            const cats = {
                'All Books': '*'
            };

            for (const [key, book] of Object.entries(books)) {
                const genre = book.genre;
                if (cats[genre] != undefined)
                    continue;

                cats[genre] = genre;
            }

            setCategories(cats);
        }

        fetchCategories();
    }, []);

    // inital load on genre 0
    useEffect(() => {
        selected(0);
    }, [categories]);

    let elements = [];
    if (categories.length != 0) {
        elements = NavBar.getTabChildren(categories, selected, index);
    }
    
    return (
        <NavBar useRelativePosition={true} leftChildren={elements} rightChildren={[]} fitContent={true} useCenterAlign={true} />
    );
};

export default GenreBar;