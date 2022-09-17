import './SearchResultsPage.css'
import SearchResultEntry from '../SearchResultEntry'
import SearchBar from '../SearchBar'

const SearchResultsPage = () => {
    return (
        <div className='App-Container'>
            <SearchBar />
            <SearchResultEntry />
            <SearchResultEntry />
            <div className='Footer-Wrapper'>
                <img className='Footer-Image' src='images/icons8-wtf-100.png'></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;