import 'assets/AdminPage.css';
import CustomButton from "components/CustomButton";
import NavBar from "components/NavBar";
import NavBarLink from "components/NavBarLink";
import Popup from 'components/Popup';
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddBook from './AddBook';

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
            navBarChildren: getTabChildren(tabs, index),
            subWidget: <div>{values[index]}</div>,
            popup: appState.popup
        });
    }

    const getTabChildren = (tabs, selectedIndex = 0) => {
        let children = [];
        let keys = Object.keys(tabs);
        for (let i = 0; i < keys.length; i++) {
            let selected = false;
            if (i == selectedIndex) {
                selected = true;
            }

            const text = keys[i];
            children.push(
                <NavBarLink text={text} onClick={select} selected={selected} index={i} />
            );
        }

        return children;
    }

    const showPopup = (text, waitTime = 2000, red = true) => {
        const waitCallback = () => {
            setPopup(<></>);
        };

        setPopup(<Popup text={text} waitTime={waitTime} waitCallback={waitCallback} red={red} />);
    }

    const tabs = { 'Book Management': <div>1</div>, 'Add Books': <AddBook popupFunction={showPopup} />, 'Library Management': <div>3</div> };
    const [popup, setPopup] = useState(<></>);
    const [appState, setAppState] = useState({
        navBarChildren: getTabChildren(tabs),
        subWidget: <div>1</div>,
        popup: <></>
    });

    return (
        <div className="Admin-Panel-App-Container">
            {popup}
            <NavBar leftChildren={appState.navBarChildren} rightChildren={[
                <CustomButton msg={'Sign Out'} onClick={signOutClick} paddingHeight={7} paddingWidth={30} /> 
            ]}>
            </NavBar>
            {appState.subWidget}
        </div>
    )
}

export default AdminPage;