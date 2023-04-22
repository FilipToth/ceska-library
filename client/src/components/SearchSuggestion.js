import 'assets/SearchSuggestion.css'
import { useHistory } from "react-router-dom";

const SearchSuggestion = ({ searchHit }) => {
    const history = useHistory();
    const click = () => {
        history.push(`/results?id=${searchHit.id}`);
    };

    return (
        <div className='Suggestion' onClick={click}>
            <p1 className='Suggestion-Text'>{searchHit.name}</p1>
        </div>
    )
}

export default SearchSuggestion;