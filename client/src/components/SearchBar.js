import 'assets/SearchBar.css'
import SearchSuggestion from 'components/SearchSuggestion';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, Hits, connectHits } from 'react-instantsearch-dom';
import { useHistory } from "react-router-dom";
import SuggestBtn from 'components/SuggestBtn'
import algolia from 'services/algolia';

const SearchBar = ({ query, renderSuggestBtn }) => {
    const history = useHistory();

    var renderHits = false;
    var addInitialQuery = true;
    const MySearchBox = connectSearchBox(({currentRefinement, refine}) => {
        if (addInitialQuery && query != undefined)
            currentRefinement = query;

        let suggestBtn = undefined;
        if (renderSuggestBtn)
            suggestBtn = <SuggestBtn />;
        
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
            history.push(`/results?search=${currentRefinement}`);
        }
        
        return (
            <div className='Search-Container'>
                {suggestBtn}
                <div className='Lower-Search-Container'>
                    <div className='Search-Div'>
                        <input type="text" placeholder='Search books!' value={currentRefinement} onChange={change} ></input>
                        <div className='Button-Div' onClick={btnClick}>
                            <img className='Image' src='images/Search-Icon.png'></img>
                        </div>
                    </div>
                </div>

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

export default SearchBar;