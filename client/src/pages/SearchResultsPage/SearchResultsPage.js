import 'assets/SearchResultsPage.css'
import queryString from 'query-string'
import BookSearchBar from 'components/BookSearchBar'
import algolia from 'services/algolia';
import backend from 'services/backend';
import LocalSearchResultEntry from './LocalSearchResultEntry';
import { useState, useEffect, useRef } from 'react';

const SearchResultsPage = () => {
    const queries = queryString.parse(window.location.search);
    const searchTerm = queries['search'];
    const searchID = queries['id'];
    
    let [entryDiv, setEntryDiv] = useState(<></>);
    useEffect(() => {
        // use search apis
        const getEntryById = async (id, openByDefault, bogusISBN) => {
            let book = await backend.getBookInfoByID(id);
            const entry = <LocalSearchResultEntry bookName={book.name} authorName={book.author} id={id} locationOpenByDefault={openByDefault} />
            return entry;
        }

        const search = async () => {  
            let entries = [];
            const results = await algolia.searchBooks(searchTerm);

            for (let i = 0; i < results.length; i++) {
                const searchObj = results[i];
                const id = searchObj.objectID;
                const bogusISBN = searchObj.bogusISBN;

                const entry = await getEntryById(id, false, bogusISBN);
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
            const book = backend.getBookByISBN(searchID);
            if (book == undefined)
                return;
            
            const bogusISBN = book.bogusISBN;
            const entry = await getEntryById(searchID, true, bogusISBN);
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
                <img className='Footer-Image' src={`${process.env.PUBLIC_URL}/images/icons8-wtf-100.png`}></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;