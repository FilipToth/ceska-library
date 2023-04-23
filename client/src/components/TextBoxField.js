import 'assets/TextBoxField.css'

const TextBoxField = ({ onChange, placeholder, text, isPassword = false, addSearchButton = false, searchButtonOnClick = undefined}) => {

    let searchButton = <></>;
    if (addSearchButton) {
        searchButton = (
            <div className='Text-Field-Search-Button-Wrapper' onClick={searchButtonOnClick}>
                <img className='Text-Field-Search-Button-Image' src='images/Search-Icon.png'></img>
            </div>
        )
    }

    const type = isPassword ? 'password' : 'text';
    return (
        <div className='Field-Wrapper'>
            <p1 className='Field-Text'>{text}</p1>
            <div className='Text-Box-Wrapper'>
                <input className='Text-Box-Input' placeholder={placeholder} onChange={onChange} type={type} />
                {searchButton}
            </div>
        </div>
    )
}

export default TextBoxField;