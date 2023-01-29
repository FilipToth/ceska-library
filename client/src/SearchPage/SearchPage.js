import './SearchPage.css'
import SearchBar from '../SearchBar';

const SearchPage = () => {
    return (
        <div className='App-Container'>
            <SearchBar renderSuggestBtn={true} />
        </div>
    )
}

export default SearchPage;