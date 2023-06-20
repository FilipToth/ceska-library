import 'assets/BookSearchBar.css'
import SearchSuggestion from 'components/SearchSuggestion';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { useNavigate } from "react-router-dom";
import CustomButton from 'components/CustomButton'
import algolia from 'services/algolia';
import GenericSearchBar from './GenericSearchBar';

const BookSearchBar = ({ query, renderSuggestBtn, paddingTop = 4, paddingBottom = 0 }) => {
    const navigate = useNavigate();

    let renderHits = false;
    let addInitialQuery = true;
    const MySearchBox = connectSearchBox(({currentRefinement, refine}) => {
        if (addInitialQuery && query != undefined)
            currentRefinement = query;

        let suggestBtn = undefined;
        if (renderSuggestBtn)
            suggestBtn = <CustomButton msg={'Suggest me a book!'} />;
        
        const change = (e) => {
            if (addInitialQuery)
                addInitialQuery = false;
            
            refine(e.target.value);

            if (renderHits == false)
                renderHits = true;

            const trimmed = e.target.value.trim();
            if (trimmed == "")
                renderHits = false;
        };

        const btnClick = async () => {
            navigate(`/results?search=${currentRefinement}`);
        }

        const containerStyle = {
            paddingTop: paddingTop + 'vh',
            paddingBottom: paddingBottom + 'vh'
        }
        
        return (
            <div className='Search-Container' style={containerStyle}>
                {suggestBtn}
                
                <GenericSearchBar currentRefinement={currentRefinement} changeFunc={change} renderBtn={true} btnClick={btnClick} />

                {renderHits &&
                    <MyHits/>
                }
            </div>
        );
    });

    const MyHits = connectHits(({ hits }) => {
        if (hits.length == 0)
            return undefined;

        return (
            <div className='Suggestions-Div'>
                {renderHits && hits.map(hit => (
                    <SearchSuggestion searchHit={hit}/>
                ))}
            </div>
        );
    });
    
    return (
        <InstantSearch searchClient={algolia.client} indexName="books">
            <MySearchBox />
        </InstantSearch>
    )
}

export default BookSearchBar;