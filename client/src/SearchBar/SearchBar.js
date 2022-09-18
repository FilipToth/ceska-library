import './SearchBar.css'
import SearchButton from '../SearchButton';
import SearchSuggestion from '../SearchSuggestion';
import ContentEditable from 'react-contenteditable'
import { useState } from 'react';

const SearchBar = (props) => {
    let searchQuery = props.searchQuery;
    const searchPlaceholder = "Search Books..."
    if (searchQuery == undefined)
        searchQuery = searchPlaceholder;

    const [search, setSearch] = useState({ html: `${searchQuery}`});
    
    let suggestionsJSX;
    const renderSuggestions = false;
    if (renderSuggestions)
    {
        suggestionsJSX = (
            <div className='Suggestions-Div'>
                <SearchSuggestion />
                <SearchSuggestion />
                <SearchSuggestion />
                <SearchSuggestion />
            </div>
        )
    }

    const searchFieldSelected = () => {
        if (search.html == searchQuery)
            setSearch({ html: '' });
    };

    const searchFieldChanged = (ev) => {
        setSearch({ html: ev.target.value } );
    }
    
    return (
        <div className='Search-Container'>
            <div className='Suggest-Book-Div-Button'>
                <p1 className='Suggest-Book-Text'>Suggest me a book!</p1>-
            </div>
            
            <div className='Lower-Search-Container'>
                <div className='Search-Div'>
                    <ContentEditable html={search.html} onChange={searchFieldChanged} className='Search-Books-Text' onSelect={searchFieldSelected} />
                    <SearchButton />
                </div>
            </div>

            {suggestionsJSX}
        </div>
    )
}

export default SearchBar;