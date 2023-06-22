import 'assets/SearchResultsPage.css'
import queryString from 'query-string'
import BookSearchBar from 'components/BookSearchBar'
import algolia from 'services/algolia';
import backend from 'services/backend';
import LocalSearchResultEntry from './LocalSearchResultEntry';
import { useState, useEffect } from 'react';

const SearchResultsPage = () => {
    const queries = queryString.parse(window.location.search);
    const searchTerm = queries['search'];
    const searchID = queries['id'];
    
    let [entryDiv, setEntryDiv] = useState(<></>);
    useEffect(() => {
        // use search apis
        const getEntryById = async (id, openByDefault) => {
            let book = await backend.getBookInfoByID(id);
            const entry = <LocalSearchResultEntry bookName={book.name} authorName={book.author} id={id} locationOpenByDefault={openByDefault} />
            return entry;
        }

        const search = async () => {  
            let entries = [];
            const res = await algolia.searchBooks(searchTerm);

            for (let i = 0; i < res.length; i++) {
                const id = res[i].objectID;
                const entry = await getEntryById(id, false);
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

        const searchByID = async () => {
            const entry = await getEntryById(searchID, true);
            setEntryDiv((
                <div className='Results-Wrapper'>
                    {entry}
                </div>
            ));
        }

        if (searchTerm != undefined) {
            search();
        } else {
            searchByID();
        }
    }, []);

    return (
        <div className='Search-Results-Page-App-Container'>
            <BookSearchBar query={searchTerm} />
            {entryDiv}
            <div className='Footer-Wrapper'>
                <img className='Footer-Image' src='images/icons8-wtf-100.png'></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;