import 'assets/GenericSearchBar.css'
import SearchSuggestion from 'components/SearchSuggestion';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { useNavigate } from "react-router-dom";
import algolia from 'services/algolia';
import TextBoxField from './TextBoxField';

const GenericSearchBar = ({ indexName, suggestionFunction, query, renderSearchButton = false, searchButtonClick = undefined, renderTopBtn = false, topButtonFunc = undefined, paddingTop = 4, paddingBottom = 0 }) => {
    const navigate = useNavigate();

    let renderHits = false;
    let addInitialQuery = true;
    const MySearchBox = connectSearchBox(({currentRefinement, refine}) => {
        if (addInitialQuery && query != undefined)
            currentRefinement = query;

        let suggestBtn = undefined;
        if (renderTopBtn && topButtonFunc != undefined)
            suggestBtn = topButtonFunc();
        
        const change = (e) => {
            if (addInitialQuery)
                addInitialQuery = false;
            
            refine(e.target.value);

            if (renderHits == false)
                renderHits = true;

            const trimmed = e.target.value.trim();
            if (trimmed == "")
                renderHits = false;
        };

        const containerStyle = {
            paddingTop: paddingTop + 'vh',
            paddingBottom: paddingBottom + 'vh'
        }
        
        return (
            <div className='Search-Container' style={containerStyle}>
                {suggestBtn}
                
                <div style={ {'paddingTop': '3vh'} }>
                    <TextBoxField placeholder='Search books!' onChange={change} paddingHeight={0.2} paddingWidth={0.3} width={540} height={45} addSearchButton={renderSearchButton} searchButtonOnClick={() => {
                        searchButtonClick(currentRefinement);
                    }} />
                </div>

                {renderHits &&
                    <MyHits/>
                }
            </div>
        );
    });

    const MyHits = connectHits(({ hits }) => {
        if (hits.length == 0)
            return undefined;

        return (
            <div className='Suggestions-Div'>
                {renderHits && hits.map(hit => {
                    if (suggestionFunction != undefined)
                        return suggestionFunction(hit);
                    
                    return <SearchSuggestion searchHit={hit}/>
                })}
            </div>
        );
    });
    
    return (
        <InstantSearch searchClient={algolia.client} indexName={indexName}>
            <MySearchBox />
        </InstantSearch>
    )
}

export default GenericSearchBar;