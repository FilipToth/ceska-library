import 'assets/RedirectionFooter.css'
import { useNavigate } from 'react-router-dom';
import CustomButton from 'components/CustomButton';

const RedirectionFooter = ({ message, uri }) => {
    const navigate = useNavigate();
    const redirectionClick = () => {
        navigate(uri);
    };

    return (
        <div className='Footer'>
            <CustomButton msg={message} paddingHeight={6} paddingWidth={8} onClick={redirectionClick} />
        </div>
    );
};

export default RedirectionFooter;