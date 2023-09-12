import 'assets/SearchableListView.css';
import { useEffect, useState, forwardRef } from 'react';
import CustomButton from 'components/CustomButton';
import TextBoxField from "components/TextBoxField";
import DatabaseControlBar from './DatabaseControlBar';
import SortEntry from './SortEntry';
import { SortState } from 'utils/sort';

const maxItemsPerLoad = 10;

const SearchableListView = forwardRef(({ searchFunction, getItems, renderItemEntry, databaseName, renderSearch = true, renderDatabaseControls = true, popupFunction = undefined }, ref) => {
    const [pageState, setPageState] = useState({
        items: [],
        itemsToRender: [],
        numItemsToShow: maxItemsPerLoad,
        showMoreButton: <></>,
        searchQuery: ''
    });

    const [sortStates, setSortStates] = useState({
        sortState: SortState.Uninitialized
    });

    const searchQueryChanged = async (event) => {
        const query = event.target.value;
        const searchItems = await searchFunction(query, pageState.items);

        setPageState((state) => {
            let button = <></>;
            if (searchItems.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            return {
                ...state,
                itemsToRender: searchItems,
                numItemsToShow: maxItemsPerLoad,
                showMoreButton: button,
            };
        });
    };

    const showMoreClick = () => {
        setPageState((state) => {
            const toShow = state.numItemsToShow + maxItemsPerLoad;

            let button = <></>;
            if (state.itemsToRender.length > toShow) {
                button = state.showMoreButton;
            }

            return {
                ...state,
                showMoreButton: button,
                numItemsToShow: toShow,
            };
        });
    };

    const getComparativeItemFromEntry = (item) => {
        return item.title;
    };

    useEffect(() => {
        const initLoadItems = async () => {
            const items = await getItems();

            let button = <></>;
            if (items.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            console.log(items);
            items.sort((a, b) => {
                const aVal = getComparativeItemFromEntry(a);
                const bVal = getComparativeItemFromEntry(b);

                if (aVal > bVal) {
                    if (sortStates.sortState == SortState.Ascending)
                        return 1;
                    else
                        return -1;
                } else if (aVal < bVal) {
                    if (sortStates.sortState == SortState.Ascending)
                        return -1;
                    else
                        return 1;
                }

                return 0;
            });

            setPageState((state) => {
                return {
                    ...state,
                    items: items,
                    itemsToRender: items,
                    showMoreButton: button,
                };
            });
        }

        initLoadItems();
    }, [sortStates]);

    const sortEntries = [
        {
            msg: 'title',
            callback: (sortState) => {
                setSortStates((state) => {
                    return {
                        ...state,
                        sortState: sortState
                    };
                });
            }
        },
        {
            msg: 'author',
            callback: undefined
        },
        {
            msg: 'genre',
            callback: undefined
        },
    ];

    return (
        <div className='List-View-Wrapper'>
            <div className='List-View-Header'>
                {renderSearch &&
                    <div className='List-View-Search-Wrapper'>
                        <TextBoxField placeholder='Search' onChange={searchQueryChanged} paddingHeight={0.75} paddingWidth={0.75} />
                    </div>
                }
                {renderDatabaseControls &&
                    <DatabaseControlBar popupFunction={popupFunction} databaseName={databaseName} />
                }
            </div>

            <div className='List-View-Entry-Layout-Container'>
                <SortEntry entries={sortEntries} />
                {pageState.itemsToRender.slice(0, pageState.numItemsToShow).map((item) => (
                    renderItemEntry(item)
                ))}
            </div>

            {pageState.showMoreButton}
        </div>
    )
});

export default SearchableListView;