import './SearchResultsPage.css'
import ForeignSearchResultEntry from '../SearchResultEntries'
import SearchBar from '../SearchBar'
import queryString from 'query-string'

const SearchResultsPage = () => {
   const queries = queryString.parse(window.location.href);
   const queryValues = Object.values(queries);
   const searchTerm = queryValues[0];

    return (
        <div className='App-Container'>
            <SearchBar query={searchTerm} />
            <ForeignSearchResultEntry />
            <div className='Footer-Wrapper'>
                <img className='Footer-Image' src='images/icons8-wtf-100.png'></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;