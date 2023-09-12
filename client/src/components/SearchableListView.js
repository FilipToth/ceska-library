import 'assets/SearchableListView.css';
import { useEffect, useState, useReducer, forwardRef, useImperativeHandle } from 'react';
import CustomButton from 'components/CustomButton';
import TextBoxField from "components/TextBoxField";
import DatabaseControlBar from './DatabaseControlBar';
import SortEntry from './SortEntry';

const maxItemsPerLoad = 10;

const SearchableListView = forwardRef(({ searchFunction, getItems, renderItemEntry, databaseName, renderSearch = true, renderDatabaseControls = true, popupFunction = undefined }, ref) => {
    const [updateState, forceUpdate] = useReducer(x => x + 1, 0);
    const [pageState, setPageState] = useState({
        items: [],
        itemsToRender: [],
        numItemsToShow: maxItemsPerLoad,
        showMoreButton: <></>,
        searchQuery: ''
    });

    useImperativeHandle(ref, () => ({
        update() {
            forceUpdate();
        }
    }));

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

    useEffect(() => {
        const initLoadItems = async () => {
            const items = await getItems();

            let button = <></>;
            if (items.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            setPageState((state) => {
                return {
                    ...state,
                    items: items,
                    itemsToRender: items,
                    showMoreButton: button,
                }
            });
        }

        initLoadItems();
    }, [updateState]);

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
                <SortEntry />
                {pageState.itemsToRender.slice(0, pageState.numItemsToShow).map((item) => (
                    renderItemEntry(item)
                ))}
            </div>

            {pageState.showMoreButton}
        </div>
    )
});

export default SearchableListView;