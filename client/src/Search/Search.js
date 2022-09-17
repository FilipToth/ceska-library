import './Search.css'
import SearchButton from '../SearchButton';
import SearchSuggestion from '../SearchSuggestion';

function Search() {
    return (
        <div className='Search-Container'>
            <div className='Suggest-Book-Div-Button'>
                <p1 className='Suggest-Book-Text'>Suggest me a book!</p1>
            </div>
            
            <div className='Lower-Search-Container'>
                <div className='Search-Div'>
                    <p1 className='Search-Books-Text'>Search Books...</p1>
                    <SearchButton />
                </div>
            </div>

            <div className='Suggestions-Div'>
                <SearchSuggestion />
                <SearchSuggestion />
                <SearchSuggestion />
                <SearchSuggestion />
            </div>
        </div>
    )
}

export default Search;