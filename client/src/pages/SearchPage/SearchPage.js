import 'assets/SearchPage.css'
import BookView from './BookView';
import SearchBar from 'components/SearchBar';

const SearchPage = () => {
    return (
        <div className='Search-Page-App-Container'>
            <SearchBar renderSuggestBtn={false} paddingTop={1.5} paddingBottom={4} />
            <BookView />
        </div>
    )
}

export default SearchPage;