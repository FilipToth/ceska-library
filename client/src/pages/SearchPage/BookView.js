import LocalSearchResultEntry from "pages/SearchResultsPage/LocalSearchResultEntry";

const BookView = ({ genre }) => {

    return (
        <div className='Book-View-Wrapper'>
            <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
            <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
            <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
            <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
            <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
        </div>
    );
}

export default BookView;