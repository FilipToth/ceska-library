import 'assets/SearchPage.css'
import { useState } from 'react';
import BookView from './BookView';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';

const SearchPage = () => {
    const select = (index) => {
        let values = Object.values(tabs);
        setPageState({
            navBarChildren: NavBar.getTabChildren(tabs, select, index),
            subWidget: values[index],
        });
    }
    
    const tabs = {
        'All Books': <BookView genre='All Books' />,
        'Fiction': <BookView genre='Fiction' />,
        'Science Fiction': <BookView genre='Science Fiction' />,
        'Non-Fiction': <BookView genre='Non-Fiction' />,
        'Thriller': <BookView genre='Thriller' />
    };

    const [pageState, setPageState] = useState({
        navBarChildren: NavBar.getTabChildren(tabs, select, 0),
        subWidget: Object.values(tabs)[0]
    });

    return (
        <div className='Search-Page-App-Container'>
            <SearchBar renderSuggestBtn={false} paddingTop={0} paddingBottom={4} />
            <div className='Book-List-Div'>
                <NavBar useRelativePosition={true} leftChildren={pageState.navBarChildren} rightChildren={[]} fitContent={true} />
                {pageState.subWidget}
            </div>
        </div>
    )
}

export default SearchPage;