import 'assets/CustomButton.css'

const CustomButton = (props) => {

    let padHeight = props.paddingHeight == undefined ? 11 : props.paddingHeight;
    let padWidth = props.paddingWidth == undefined ? 30 : props.paddingWidth;

    let style = {
        paddingTop: `${padHeight}px`,
        paddingBottom: `${padHeight}px`,
        paddingLeft: `${padWidth}px`,
        paddingRight: `${padWidth}px`,
    };

    if (props.width != undefined) {
        let width = `${props.width}px`;
        style['width'] = width;
    }

    return (
        <div className='Custom-Button' style={style} onClick={props.onClick} ref={props.ref}>
            <p1>{props.msg}</p1>
            {props.children}
        </div>
    )
}

export default CustomButton;