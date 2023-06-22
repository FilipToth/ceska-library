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
        <div className="Form-Wrapper">
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Remove a Book</p1>
            </div>
            <div className='Inner-Form-Wrapper'>
                <div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key'>ISBN</p1>
                </div>
                <div className="Inner-Input-Wrapper">
                    <TextBoxField onChange={isbnChange} placeholder={'...'} text={''} />
                </div>
            </div>
            <CustomButton msg={'Remove'} paddingWidth={60} onClick={removeBook} />
        </div>
    )
}

export default RemoveBook;