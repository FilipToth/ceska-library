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
        <div>
            <p1>Welcome!</p1>
            <button onClick={signOutClick}>Sign Out</button>
        </div>
    )
}

export default AdminPage;