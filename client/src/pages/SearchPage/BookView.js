import 'assets/BookView.css'
import CustomButton from "components/CustomButton";
import LocalSearchResultEntry from "pages/SearchResultsPage/LocalSearchResultEntry";

const BookView = ({ genre }) => {

    return (
        <div className='Book-View-Wrapper'>
            <div className='Book-View-Result-Wrapper'>
                <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
                <LocalSearchResultEntry bookName={'Test'} authorName={'Fuck'} locationOpenByDefault={false} />
            </div>
            <CustomButton msg='Show me more!' width={130} />
        </div>
    );
}

export default BookView;