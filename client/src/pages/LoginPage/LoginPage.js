import 'assets/LoginPage.css'
import CustomButton from 'components/CustomButton';
import TextBoxField from 'components/TextBoxField';
import { useSignIn } from 'react-auth-kit';
import backend from 'services/backend';
import { useNavigate } from 'react-router-dom';
import RedirectionFooter from 'components/RedirectionFooter';

const LoginPage = () => {
    var username = '';
    var password = '';

    const navigate = useNavigate();
    const signIn = useSignIn();
    const login = () => {
        // get auth token from api
        backend.getAuthentication(username, password).then((data) => {
            if (data.success === false) {
                alert('Invalid credentials');
                return;
            }

            signIn({
                token: data.token,
                expiresIn: '3600',
                tokenType: 'Bearer',
                authState: { username: username }
            });

            navigate('/admin');
        });
    }

    const usernameChange = (e) => {
        username = e.target.value;
    }

    const passwordChange = (e) => {
        password = e.target.value;
    }

    return (
        <div className="Login-Page-App-Container">
            <div className='Login-Wrapper'>
                <p1 className='Login-Header-Text'>Login</p1>
                <div className='Fields-Wrapper'>
                    <TextBoxField text={'username'} placeholder={'...'} onChange={usernameChange} />
                    <TextBoxField text={'password'} placeholder={'...'} onChange={passwordChange} isPassword={true} />
                </div>
                <CustomButton msg={'Login me in!'} onClick={login} />
            </div>
            <RedirectionFooter message={'Go Back'} uri={'/'} />
        </div>
    );
}

export default LoginPage;
