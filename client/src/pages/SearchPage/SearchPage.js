import 'assets/SearchPage.css'
import CustomButton from 'components/CustomButton';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import { useState } from 'react';

const SearchPage = () => {
    const select = (index) => {
        let values = Object.values(tabs);
        setPageState({
            navBarChildren: NavBar.getTabChildren(tabs, select, index),
            subWidget: <div>{values[index]}</div>,
        });
    }
    
    const tabs = {
        'Fiction': <p1>Hello!</p1>,
        'Non-Fiction': <div></div>,
    };

    const [pageState, setPageState] = useState({
        navBarChildren: NavBar.getTabChildren(tabs, select, 0),
        subWidget: Object.values(tabs)[0]
    });

    return (
        <div className='Search-Page-App-Container'>
            <SearchBar renderSuggestBtn={false} />
            <div className='Book-List-Div'>
                <NavBar useRelativePosition={true} leftChildren={pageState.navBarChildren} rightChildren={
                    <CustomButton msg={'Sign Out'}></CustomButton>
                }>

                </NavBar>
                {pageState.subWidget}
            </div>
        </div>
    )
}

export default SearchPage;