// style in components/NavBar.css:
const NavBarLink = ({ onClick, text, selected, index }) => {
    let cssClass = 'Nav-Bar-Link';
    if (selected != undefined && selected == true) {
        cssClass += ' Nav-Bar-Link-Selected';
    }

    return (
        <div className={cssClass} onClick={() => { onClick(index) }}>
            <p1 className='Nav-Bar-Link-Text'>{text}{}</p1>
        </div>
    )
}

export default NavBarLink;