import 'assets/SearchSuggestion.css'
import { useNavigate } from "react-router-dom";

const SearchSuggestion = ({ searchHit, clickFunc = undefined }) => {
    const navigate = useNavigate();
    const click = () => {
        navigate(`/results?id=${searchHit.objectID}`);
    };

    const clickFunction = click;
    if (clickFunc != undefined)
        clickFunction = clickFunc;

    return (
        <div className='Suggestion' onClick={clickFunction}>
            <p1 className='Suggestion-Text'>{searchHit.name}</p1>
        </div>
    )
}

export default SearchSuggestion;