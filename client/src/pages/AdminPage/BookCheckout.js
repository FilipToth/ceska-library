import { useAuthHeader } from "react-auth-kit";
import CustomButton from "components/CustomButton";
import TextBoxField from "components/TextBoxField";

const BookCheckout = () => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    return (
        <div className="Form-Wrapper">
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Add a Person</p1>
            </div>
            <div className='Inner-Form-Wrapper'>
                <div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key'>Name</p1>
                    <p1 className='Inner-Form-Key'>Class</p1>
                    <p1 className='Inner-Form-Key'>Mail</p1>
                </div>
                <div className="Inner-Input-Wrapper">
                </div>

                <div className="Form-Element">

                </div>
            </div>
        </div>
    );
};

export default BookCheckout;