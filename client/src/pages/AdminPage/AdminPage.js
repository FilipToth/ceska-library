import CustomButton from "components/CustomButton";
import NavBar from "components/NavBar";
import NavBarLink from "components/NavBarLink";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminPage = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const signOutClick = () => {
        signOut();
        navigate('/login');
    };

    const select = (index) => {
        setAppState({
            navBarChildren: getTabChildren(tabs, index),
            subWidget: <div>{index}</div>
        });
    }

    const getTabChildren = (tabs, selectedIndex = 0) => {
        let children = [];
        for (let i = 0; i < tabs.length; i++) {
            let selected = false;
            if (i == selectedIndex) {
                selected = true;
            }

            children.push(
                <NavBarLink text={tabs[i]} onClick={select} selected={selected} index={i} />
            );
        }

        return children;
    }

    const tabs = ['Book Management', 'Library Management'];
    const [appState, setAppState] = useState({
        navBarChildren: getTabChildren(tabs),
        subWidget: <div>0</div>
    });

    return (
        <div className="App-Container">
            <NavBar leftChildren={appState.navBarChildren} rightChildren={[
                <CustomButton msg={'Sign Out'} onClick={signOutClick} /> 
            ]}>
            </NavBar>
            {appState.subWidget}
        </div>
    )
}

export default AdminPage;