import 'assets/NavBar.css';
import React from 'react';
import NavBarLink from './NavBarLink';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        
        console.log(props);
        this.style = {
            position: props.useRelativePosition ? 'relative' : 'absolute',
            top: props.useRelativePosition ? 'auto' : '2vh',
            width: props.fitContent ? 'fit-content' : '93%'
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
        
        let spacer = <div className='Spacer'></div>
        let leftWrapperStyle = {
            flexGrow: 0,
        }

        
        if (this.props.rightChildren == undefined || this.props.rightChildren.length == 0) {
            spacer = <></>
            leftWrapperStyle.flexGrow = 1;
        }

        return (
            <div className='Nav-Bar' style={this.style}>
                <div className='Left-Wrapper' style={leftWrapperStyle}>
                    {this.props.leftChildren}
                </div>
                {spacer}
                {this.props.rightChildren}
            </div>
        )
    }
}

export default NavBar;