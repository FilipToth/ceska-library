import 'assets/SearchResultsPage.css'
import queryString from 'query-string'
import SearchBar from 'components/SearchBar'
import LocalResultEntry from './LocalSearchResultEntry'
import algolia from 'services/algolia';

const SearchResultsPage = () => {
    const queries = queryString.parse(window.location.href);
    const queryValues = Object.values(queries);
    const searchTerm = queryValues[0];

    let entries = <></>;
    const search = async () => {
        let res = await algolia.search(searchTerm);
        res.forEach((res) => {
            
        });
    }

    return (
        <div className='App-Container'>
            <SearchBar query={searchTerm} />
            <LocalResultEntry locationOpenByDefault={false} />
            <div className='Footer-Wrapper'>
                <img className='Footer-Image' src='images/icons8-wtf-100.png'></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;