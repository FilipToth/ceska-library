import 'assets/SearchPage.css'
import BookView from './BookView';
import BookSearchBar from 'components/BookSearchBar';
import CustomButton from 'components/CustomButton';
import RedirectionFooter from 'components/RedirectionFooter';

const SearchPage = () => {
    return (
        <div className='Search-Page-App-Container'>
            <BookSearchBar renderSuggestBtn={false} paddingTop={1.5} paddingBottom={4} />
            <BookView />
            <RedirectionFooter message={'Admin'} uri={'admin/'} />
        </div>
    )
}

export default SearchPage;