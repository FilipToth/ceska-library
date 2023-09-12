import algolia from 'services/algolia';
import backend from 'services/backend';
import BookListEntry from "./BookListEntry";
import SearchableListView from 'components/SearchableListView';

const BookList = ({ popupFunction }) => {
    const handleSearch = async (query, allEntries) => {
        const hits = await algolia.searchBooks(query);
        const bookHits = hits.map((hit) => {
            for (const item of allEntries) {
                if (item.isbn === hit.objectID) {
                    return item;
                }
            }
        });

        return bookHits;
    };

    const handleGetItems = async () => {
        const books = await backend.getAllBooks();
        const locations = await backend.getAllLocations();

        const items = [];
        for (const [isbn, book] of Object.entries(books)) {
            const location = locations[isbn];

            items.push({
                isbn: isbn,
                title: book.name,
                author: book.author,
                genre: book.genre,
                note: book.note,
                row: location.row,
                column: location.column
            });
        }

        return items;
    };

    const sortOptions = [
        {
            msg: 'title',
            getSortableElement: (dbItem) => {
                return dbItem.title;
            }
        },
        {
            msg: 'author',
            getSortableElement: (dbItem) => {
                return dbItem.author;
            }
        },
        {
            msg: 'genre',
            getSortableElement: (dbItem) => {
                return dbItem.genre;
            }
        }
    ];

    const handleRenderItemEntry = (item) => {
        return (
            <BookListEntry popupFunction={popupFunction} isbn={item.isbn} title={item.title} authorName={item.author} row={item.row} column={item.column} genre={item.genre} note={item.note} />
        );
    };

    return (
        <SearchableListView searchFunction={handleSearch} getItems={handleGetItems} renderItemEntry={handleRenderItemEntry} databaseName={'Books'} popupFunction={popupFunction} sortOptions={sortOptions} />
    )
}

export default BookList;