import 'assets/SearchSuggestion.css'
import { useNavigate } from "react-router-dom";

const SearchSuggestion = ({ searchHit }) => {
    const navigate = useNavigate();
    const click = () => {
        navigate(`/results?id=${searchHit.objectID}`);
    };

    return (
        <div className='Suggestion' onClick={click}>
            <p1 className='Suggestion-Text'>{searchHit.name}</p1>
        </div>
    )
}

export default SearchSuggestion;