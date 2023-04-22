import 'assets/LoginPage.css'
import CustomButton from 'components/CustomButton';
import TextBoxField from 'components/TextBoxField';

const LoginPage = () => {
    return (
        <div className="App-Container">
            <div className='Login-Wrapper'>
                <p1 className='Login-Header-Text'>Login</p1>
                <div className='Fields-Wrapper'>
                    <TextBoxField text={'username'} placeholder={'...'} />
                    <TextBoxField text={'password'} placeholder={'...'} />
                </div>
                <CustomButton msg={'Login me in!'} />
            </div>
        </div>
    );
}

export default LoginPage;
