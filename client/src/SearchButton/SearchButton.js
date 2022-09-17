import './SearchButton.css';

function SearchButton() {

    function btnClick() {
        console.log('test');
    }

    return (
        <div className='Button-Div' onClick={btnClick}>
            <img className='Image' src='images/Search-Icon.png'></img>
        </div>
    )
}

export default SearchButton;