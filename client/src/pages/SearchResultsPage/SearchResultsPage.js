import 'assets/SearchResultsPage.css'
import queryString from 'query-string'
import SearchBar from 'components/SearchBar'
import algolia from 'services/algolia';
import backend from 'services/backend';
import LocalSearchResultEntry from './LocalSearchResultEntry';
import { useState, useEffect } from 'react';

const SearchResultsPage = () => {
    const queries = queryString.parse(window.location.href);
    const queryValues = Object.values(queries);
    const searchTerm = queryValues[0];
    
    let [entryDiv, setEntryDiv] = useState(<></>);
    useEffect(() => {
        // use search apis
        const search = async () => {  
            let entries = [];
            const res = await algolia.search(searchTerm);

            for (let i = 0; i < res.length; i++) {
                let book = await backend.getNameAndImage(res[i]);
                const entry = <LocalSearchResultEntry bookName={book.name} authorName={book.author} locationOpenByDefault={false} />
                entries.push(entry);
            }
    
            setEntryDiv((
                <div className='Results-Wrapper'>
                    {entries.map((v) => {
                        return v;
                    })}
                </div>
            ));
        }

        if (searchTerm != undefined) {
            search();
        }
    }, []);

    return (
        <div className='App-Container'>
            <SearchBar query={searchTerm} />
            {entryDiv}
            <div className='Footer-Wrapper'>
                <img className='Footer-Image' src='images/icons8-wtf-100.png'></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;