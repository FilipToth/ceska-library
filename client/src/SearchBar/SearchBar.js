import './SearchBar.css'
import SearchSuggestion from '../SearchSuggestion';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, Hits, connectHits } from 'react-instantsearch-dom';
import SearchButton from '../SearchButton';

const searchClient = algoliasearch('99PSKVXAQJ', '26781912edacd5f1ba0ccb248375d828');

const SearchBar = (props) => {
    let searchQuery = props.searchQuery;
    const searchPlaceholder = "Search Books..."
    if (searchQuery == undefined)
        searchQuery = searchPlaceholder;

    const MySearchBox = connectSearchBox(({currentRefinement, refine}) => {
        return (
            <div className='Search-Container'>
                <div className='Suggest-Book-Div-Button'>
                    <p1 className='Suggest-Book-Text'>Suggest me a book!</p1>
                </div>

                <div className='Lower-Search-Container'>
                    <div className='Search-Div'>
                        <input type="text" placeholder='Search books!' value={currentRefinement} onFocus={() => props.onFocus()} onBlur={() => props.onBlur()} onChange={(e) => {refine(e.target.value)}} ></input>
                        <SearchButton />
                    </div>
                </div>

                <MyHits/>
            </div>
        );
    });

    const MyHits = connectHits(({ hits }) => {
        console.log(hits)
        return (
            <div className='Suggestions-Div'>
                {hits.map(hit => (
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