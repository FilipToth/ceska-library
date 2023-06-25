import 'assets/SearchableListView.css';
import { useEffect, useState } from 'react';
import CustomButton from 'components/CustomButton';
import TextBoxField from "components/TextBoxField";

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
    }, []);

    return (
        <div className='List-View-Wrapper'>
            <div className='List-View-Search-Wrapper'>
                <TextBoxField placeholder='Search' onChange={searchQueryChanged} paddingHeight={0.75} paddingWidth={0.75} />
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