import CustomButton from "components/CustomButton";
import NavBar from "components/NavBar";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const signOutClick = () => {
        signOut();
        navigate('/login');
    };

    return (
        <div className="App-Container">
            <NavBar leftChildren={[
                <CustomButton msg={'test'} />,
                <CustomButton msg={'test'} />
            ]} rightChildren={[
                <CustomButton msg={'Sign Out'} /> 
            ]}>
            </NavBar>
            <p1>Welcome!</p1>
            <button onClick={signOutClick}>Sign Out</button>
        </div>
    )
}

export default AdminPage;