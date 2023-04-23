import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";

const AddBook = () => {
    return (
        <div className='Add-Book-Wrapper'>
            <div className='Add-Book-Header-Wrapper'>
                <p1 className='Add-Book-Header'>Add a Book</p1>
                <p1 className='Add-Book-Subheader'>Pro tip: Just search for the ISBN and we’ll fill the info in for you</p1>
            </div>
            <div className='Add-Book-Form-Wrapper'>
                <div className='Add-Book-Form-Key-Wrapper'>
                    <p1 className='Add-Book-Form-Key'>ISBN</p1>
                    <p1 className='Add-Book-Form-Key'>Title</p1>
                    <p1 className='Add-Book-Form-Key'>Author</p1>
                    <p1 className='Add-Book-Form-Key'>Library</p1>
                    <p1 className='Add-Book-Form-Key'>Row</p1>
                    <p1 className='Add-Book-Form-Key'>Column</p1>
                </div>
                <div className="Add-Book-Input-Wrapper">
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} addSearchButton={true} />
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} />
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} />
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} />
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} />
                    <TextBoxField onChange={undefined} placeholder={'...'} text={''} />
                </div>
            </div>
            <CustomButton msg={'Add'} paddingWidth={60} />
        </div>
    );
};

export default AddBook;