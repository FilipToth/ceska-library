import backend from "services/backend";
import { useAuthHeader } from "react-auth-kit";
import TextBoxField from "components/TextBoxField";
import CustomButton from "components/CustomButton";

const AddPerson = ({ popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    let name = '';
    let pClass = '';
    let mail = '';

    const nameChange = (e) => {
        name = e.target.value;
    };

    const classChange = (e) => {
        pClass = e.target.value;
    };

    const mailChange = (e) => {
        mail = e.target.value;
    };

    const addPerson = async () => {
        if (name.trim() == '' || pClass.trim() == '' || mail.trim() == '') {
            popupFunction('Some fields are empty!', 2500, false);
            return;
        }

        const person = {
            name: name,
            pClass: pClass,
            mail: mail
        };

        backend.addPerson(person, token);
        popupFunction('Person added!', 2500, false);
    };

    return (
        <div className="Form-Wrapper">
            <div className='Form-Header-Wrapper'>
                <p1 className='Form-Book-Header'>Add a Person</p1>
            </div>
            <div className='Inner-Form-Wrapper'>
            <   div className='Inner-Form-Key-Wrapper'>
                    <p1 className='Inner-Form-Key'>Name</p1>
                    <p1 className='Inner-Form-Key'>Class</p1>
                    <p1 className='Inner-Form-Key'>Mail</p1>
                </div>
                <div className="Inner-Input-Wrapper">
                    <TextBoxField onChange={nameChange} placeholder={'...'} text={''} />
                    <TextBoxField onChange={classChange} placeholder={'...'} text={''} id='title' />
                    <TextBoxField onChange={mailChange} placeholder={'...'} text={''} />
                </div>
            </div>
            <CustomButton msg={'Add'} paddingWidth={30} onClick={addPerson} />
        </div>
    );
};

export default AddPerson;