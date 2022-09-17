import './SearchBar.css'
import SearchButton from '../SearchButton';
import SearchSuggestion from '../SearchSuggestion';

const SearchBar = (props) => {
    let searchQuery = props.searchQuery;
    if (searchQuery == undefined)
        searchQuery = "Search Books...";
    
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
    
    return (
        <div className='Search-Container'>
            <div className='Suggest-Book-Div-Button'>
                <p1 className='Suggest-Book-Text'>Suggest me a book!</p1>
            </div>
            
            <div className='Lower-Search-Container'>
                <div className='Search-Div'>
                    <p1 className='Search-Books-Text'>{searchQuery}</p1>
                    <SearchButton />
                </div>
            </div>

            {suggestionsJSX}
        </div>
    )
}

export default SearchBar;