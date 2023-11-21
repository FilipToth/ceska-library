import 'assets/SearchResultsPage.css'
import queryString from 'query-string'
import BookSearchBar from 'components/BookSearchBar'
import algolia from 'services/algolia';
import backend from 'services/backend';
import LocalSearchResultEntry from './LocalSearchResultEntry';
import { useState, useEffect } from 'react';

// giving up on the traditional
// way of getting query arguments
// from react router, just stopped
// working when switched to
// hash routing...

const getID = (href) => {
    const idQuery = '?id=';
    const idIndex = href.indexOf(idQuery);

    if (idIndex == -1)
        return undefined;

    const startIndex = idIndex + idQuery.length;
    const id = href.substring(startIndex, href.length);

    return id;
};

const getSearchTerm = (href) => {
    const termQuery = '?search=';
    const termIndex = href.indexOf(termQuery);

    if (termIndex == -1)
        return undefined;

    const startIndex = termIndex + termQuery.length;
    const term = href.substring(startIndex, href.length);

    return term;
};

const SearchResultsPage = (props) => {
    // const queries = queryString.parse(window.location.search);
    const searchTerm = getSearchTerm(window.location.href); // queries['search'];
    const searchID = getID(window.location.href); // queries['id'];

    console.log(searchID);
    
    let [entryDiv, setEntryDiv] = useState(<></>);
    useEffect(() => {
        // use search apis
        const getEntryById = async (id, openByDefault) => {
            let book = await backend.getBookInfoByID(id);
            const entry = <LocalSearchResultEntry bookName={book.name} authorName={book.author} id={id} locationOpenByDefault={openByDefault} bogusISBN={book.bogusISBN} publicNote={book.publicNote} />
            return entry;
        }

        const search = async () => {  
            let entries = [];
            const results = await algolia.searchBooks(searchTerm);

            for (let i = 0; i < results.length; i++) {
                const searchObj = results[i];
                const id = searchObj.objectID;

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
                <img className='Footer-Image' src={`${process.env.PUBLIC_URL}/images/icons8-wtf-100.png`}></img>
                <p1 className='Footer-Text'>That would be it for the search results, I guess...</p1>
            </div>
        </div>
    )
}

export default SearchResultsPage;