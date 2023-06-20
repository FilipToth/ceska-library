import 'assets/SearchPage.css'
import BookView from './BookView';
import BookSearchBar from 'components/BookSearchBar';

const SearchPage = () => {
    return (
        <div className='Search-Page-App-Container'>
            <BookSearchBar renderSuggestBtn={false} paddingTop={1.5} paddingBottom={4} />
            <BookView />
        </div>
    )
}

export default SearchPage;