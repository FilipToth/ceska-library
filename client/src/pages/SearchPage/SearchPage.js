import 'assets/SearchPage.css'
import SearchBar from 'components/SearchBar';

const SearchPage = () => {
    return (
        <div className='App-Container'>
            <SearchBar renderSuggestBtn={true} />
        </div>
    )
}

export default SearchPage;