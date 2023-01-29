import './SearchBar.css'
import SearchSuggestion from '../SearchSuggestion';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, Hits, connectHits } from 'react-instantsearch-dom';
import SearchButton from '../SearchButton';
import SuggestBtn from '../SuggestBtn'
import { useState } from 'react';

const searchClient = algoliasearch('99PSKVXAQJ', '26781912edacd5f1ba0ccb248375d828');

const SearchBar = ({ query, renderSuggestBtn, renderInitialHits }) => {
    // const [renderHits, setRenderHits] = useState(false)
    var renderHits = false;

    const MySearchBox = connectSearchBox(({currentRefinement, refine}) => {
        if (query != undefined)
            currentRefinement = query;

        let suggestBtn = undefined;
        if (renderSuggestBtn)
        {
            suggestBtn = <SuggestBtn />;
        }
        
        const change = (e) => {
            refine(e.target.value);

            const trimmed = e.target.value.trim();
            if (renderHits == false)
                renderHits = true;

            if (trimmed == "")
                renderHits = false;
        };
        
        return (
            <div className='Search-Container'>
                {suggestBtn}
                <div className='Lower-Search-Container'>
                    <div className='Search-Div'>
                        <input type="text" placeholder='Search books!' value={currentRefinement} onChange={change} ></input>
                        <SearchButton />
                    </div>
                </div>

                {renderHits &&
                    <MyHits/>
                }
            </div>
        );
    });

    const MyHits = connectHits(({ hits }) => {
        return (
            <div className='Suggestions-Div'>
                {renderHits && hits.map(hit => (
                    <SearchSuggestion searchHit={hit}/>
                ))}
            </div>
        );
    });
    
    return (
        <InstantSearch searchClient={searchClient} indexName="books">
            <MySearchBox />
        </InstantSearch>
    )
}

export default SearchBar;