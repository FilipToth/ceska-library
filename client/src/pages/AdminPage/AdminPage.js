import 'assets/AdminPage.css';
import CustomButton from "components/CustomButton";
import NavBar from "components/NavBar";
import Popup from 'components/Popup';
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddBook from './AddBook';
import RemoveBook from './RemoveBook';
import BookList from './BookList';
import AddPerson from './AddPerson';
import PeopleList from './PeopleList';
import BookCheckout from './BookCheckout';

const AdminPage = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const signOutClick = () => {
        signOut();
        navigate('/login');
    };

    const select = (index) => {
        let values = Object.values(tabs);
        setAppState({
            navBarChildren: NavBar.getTabChildren(tabs, select, index),
            subWidget: <div>{values[index]}</div>,
            popup: appState.popup
        });
    }

    const showPopup = (text, waitTime = 2000, red = true) => {
        const waitCallback = () => {
            setPopup(<></>);
        };

        setPopup(<Popup text={text} waitTime={waitTime} waitCallback={waitCallback} red={red} />);
    }

    const tabs = {
        'Add Books': <AddBook popupFunction={showPopup} />,
        'Remove Books': <RemoveBook popupFunction={showPopup} />,
        'List Books': <BookList popupFunction={showPopup} />,
        'Add Person': <AddPerson popupFunction={showPopup} />,
        'List People': <PeopleList popupFunction={showPopup} />,
        'Checkout': <BookCheckout popupFunction={showPopup} />
    };

    const [popup, setPopup] = useState(<></>);
    const [appState, setAppState] = useState({
        navBarChildren: NavBar.getTabChildren(tabs, select, 0),
        subWidget: Object.values(tabs)[0],
        popup: <></>
    });

    return (
        <div className="Admin-Panel-App-Container">
            {popup}
            <div className='Nav-Bar-Wrapper'>
                <NavBar leftChildren={appState.navBarChildren} useRelativePosition={true} rightChildren={[
                    <CustomButton msg={'Sign Out'} onClick={signOutClick} paddingHeight={7} paddingWidth={30} /> 
                ]} />
            </div>
            <div className='Admin-Widget-Wrapper'>
                {appState.subWidget}
            </div>
        </div>
    )
}

export default AdminPage;