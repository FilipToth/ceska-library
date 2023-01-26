import './SearchSuggestion.css'

const SearchSuggestion = ({ hit }) => {
    return (
        <div className='Suggestion'>
            <p1 className='Suggestion-Text'>{hit.name}</p1>
        </div>
    )
}

export default SearchSuggestion;