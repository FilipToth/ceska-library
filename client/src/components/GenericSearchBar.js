import 'assets/GenericSearchBar.css'

const GenericSearchBar = ({ currentRefinement, changeFunc, renderBtn, btnClick }) => {
    return (
        <div className='Lower-Search-Container'>
            <div className='Search-Div'>
                <input type="text" placeholder='Search books!' value={currentRefinement} onChange={changeFunc} ></input>
                {renderBtn &&
                    <div className='Button-Div' onClick={btnClick}>
                        <img className='Image' src='images/Search-Icon.png'></img>
                    </div>
                }
            </div>
        </div>
    );
};

export default GenericSearchBar;
