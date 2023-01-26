import './SearchSuggestion.css'

const SearchSuggestion = ({ searchHit }) => {
    return (
        <div className='Suggestion'>
            <p1 className='Suggestion-Text'>{searchHit.name}</p1>
        </div>
    )
}

export default SearchSuggestion;