import './SearchBar.css'
import SearchSuggestion from '../SearchSuggestion';
import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, Hits } from 'react-instantsearch-dom';
import SearchButton from '../SearchButton';
import ContentEditable from 'react-contenteditable'

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

                <div className='Suggestions-Div'>
                    <Hits hitComponent={SearchSuggestion}/>
                </div>
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