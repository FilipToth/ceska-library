import 'assets/PeopleListEntry.css'
import CustomButton from 'components/CustomButton';

const PeopleListEntry = ({ name, className, email }) => {
    return (
        <div className="Person-List-Entry-Wrapper">
            <p1 className="Entry-Text">{name}</p1>
            <p1 className="Entry-Text">{className}</p1>
            <p1 className="Entry-Text">{email}</p1>
            <CustomButton msg={'Check History'} paddingHeight={4} paddingWidth={10} />
        </div>
    );
};

export default PeopleListEntry;