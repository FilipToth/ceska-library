import 'assets/TextBoxField.css'

const TextBoxField = ({ onChange, placeholder, text, id='', currentRefinementAsValue = undefined, isPassword = false, addSearchButton = false, searchButtonOnClick = undefined, paddingHeight = 0.25, paddingWidth = 0.25, width = 340, height = 29 }) => {
    let searchButton = <></>;
    if (addSearchButton) {
        searchButton = (
            <div className='Text-Field-Search-Button-Wrapper' onClick={searchButtonOnClick}>
                <img className='Text-Field-Search-Button-Image' src='images/Search-Icon.png'></img>
            </div>
        )
    }

    const wrapperStyle = {
        paddingTop: `${paddingHeight}vh`,
        paddingBottom: `${paddingHeight}vh`,
        paddingLeft: `${paddingWidth}vw`,
        paddingRight: `${paddingWidth}vw`,
        width: `${width}px`,
        height: `${height}px`
    };

    const type = isPassword ? 'password' : 'text';
    return (
        <div className='Field-Wrapper'>
            <p1 className='Field-Text'>{text}</p1>
            <div className='Text-Box-Wrapper' style={wrapperStyle}>
                <input className='Text-Box-Input' value={currentRefinementAsValue} id={id} placeholder={placeholder} onChange={onChange} type={type} />
                {searchButton}
            </div>
        </div>
    )
}

export default TextBoxField;