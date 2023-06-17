import 'assets/NavBar.css';
import React from 'react';
import NavBarLink from './NavBarLink';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        
        console.log(props);
        this.style = {
            position: props.useRelativePosition ? 'relative' : 'absolute'
        }
    }

    static getTabChildren = (tabs, select, selectedIndex = 0) => {
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

    render() {
        return (
            <div className='Nav-Bar' style={this.style}>
                <div className='Left-Wrapper'>
                    {this.props.leftChildren}
                </div>
                <div className='Spacer'></div>
                {this.props.rightChildren}
            </div>
        )
    }
}

export default NavBar;