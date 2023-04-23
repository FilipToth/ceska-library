import 'assets/NavBar.css';

const NavBar = ({ leftChildren, rightChildren }) => {
    return (
        <div className='Nav-Bar'>
            <div className='Left-Wrapper'>
                {leftChildren}
            </div>
            <div className='Spacer'></div>
            {rightChildren}
        </div>
    )
}

export default NavBar;