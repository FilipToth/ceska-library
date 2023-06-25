import { useNavigate } from "react-router-dom";
import GenericSearchBar from './GenericSearchBar';
import CustomButton from 'components/CustomButton'
import SearchSuggestion from 'components/SearchSuggestion';

const BookSearchBar = ({ query, renderSuggestBtn, paddingTop = 4, paddingBottom = 4, suggestionFunction = undefined }) => {
    const navigate = useNavigate()
    console.log(query)

    const btnClick = async (currRefinement) => {
        navigate(`/results?search=${currRefinement}`);
    }

    const searchHit = (hit) => {
        return <SearchSuggestion searchHit={hit}/>;
    };

    const topButton = () => {
        return <CustomButton msg={'Suggest me a book!'} />;
    };

    let suggestFunc = searchHit;
    if (suggestionFunction != undefined)
        suggestFunc = suggestionFunction;

    return (
        <GenericSearchBar 
            indexName={'books'}
            query={query}
            suggestionFunction={suggestFunc}
            renderSearchButton={true}
            searchButtonClick={btnClick}
            renderTopBtn={renderSuggestBtn}
            topButtonFunc={topButton}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
        />
    );
}

export default BookSearchBar;