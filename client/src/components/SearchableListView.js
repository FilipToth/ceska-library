import 'assets/SearchableListView.css';
import { useEffect, useState } from 'react';
import CustomButton from 'components/CustomButton';
import GenericSearchBar from "components/GenericSearchBar";

const maxItemsPerLoad = 10;

const SearchableListView = ({ searchFunction, getItems, renderItemEntry }) => {
    const [pageState, setPageState] = useState({
        items: [],
        itemsToRender: [],
        numItemsToShow: maxItemsPerLoad,
        showMoreButton: <></>,
        searchQuery: ''
    });

    const searchQueryChanged = async (event) => {
        const query = event.target.value;
        const searchItems = await searchFunction(query, pageState.items);
        console.log(searchItems);

        setPageState((state) => {
            let button = <></>;
            if (searchItems.length > maxItemsPerLoad) {
                button = <CustomButton msg='Show me more!' onClick={showMoreClick} width={130} />;
            }

            return {
                items: state.items,
                itemsToRender: searchItems,
                numItemsToShow: maxItemsPerLoad,
                showMoreButton: button,
                searchQuery: state.searchQuery,
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
                items: state.items,
                itemsToRender: state.itemsToRender,
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
                    items: items,
                    itemsToRender: items,
                    numItemsToShow: state.numItemsToShow,
                    showMoreButton: button,
                }
            });
        }

        initLoadItems();
    }, []);

    return (
        <div className='List-View-Wrapper'>
            <div className='List-View-Search-Wrapper'>
                <GenericSearchBar currentRefinement={pageState.searchQuery} changeFunc={searchQueryChanged} />
            </div>

            <div className='List-View-Entry-Layout-Container'>
                {pageState.itemsToRender.slice(0, pageState.numItemsToShow).map((item) => (
                    renderItemEntry(item)
                ))}
            </div>

            {pageState.showMoreButton}
        </div>
    )
}

export default SearchableListView;