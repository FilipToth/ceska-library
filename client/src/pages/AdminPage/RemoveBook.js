import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";
import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";

const RemoveBook = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    let isbn = '';
    const isbnChange = (e) => {
        isbn = e.target.value;
    };

    const removeBook = () => {
        if (isbn.trim() == '') {
            popupFunction('ISBN cannot be empty!', 2000, false);
            return;
        }

        backend.removeBook(isbn, token);
        popupFunction('Book removed!', 2000, false);
    };

    return (
        <div className="Remove-Book-Wrapper">
            <div className='Add-Book-Header-Wrapper'>
                <p1 className='Add-Book-Header'>Remove a Book</p1>
            </div>
            <div className='Remove-Book-Form-Wrapper'>
                <div className='Remove-Book-Form-Key-Wrapper'>
                    <p1 className='Add-Book-Form-Key'>ISBN</p1>
                </div>
                <div className="Remove-Book-Input-Wrapper">
                    <TextBoxField onChange={isbnChange} placeholder={'...'} text={''} />
                </div>
            </div>
            <CustomButton msg={'Remove'} paddingWidth={60} onClick={removeBook} />
        </div>
    )
}

export default RemoveBook;