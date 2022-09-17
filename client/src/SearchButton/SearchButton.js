import './SearchButton.css';
import { useHistory } from "react-router-dom";

const SearchButton = () => {

    const history = useHistory();
    const btnClick = () => {
        history.push(`/results?search=${'Lorem Ipsum'}`);
    }

    return (
        <div className='Button-Div' onClick={btnClick}>
            <img className='Image' src='images/Search-Icon.png'></img>
        </div>
    )
}

export default SearchButton;