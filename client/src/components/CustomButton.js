import 'assets/CustomButton.css'

const CustomButton = ({ msg, onClick, paddingHeight = 11, paddingWidth = 30, width = undefined }) => {

    let style = {
        paddingTop: `${paddingHeight}px`,
        paddingBottom: `${paddingHeight}px`,
        paddingLeft: `${paddingWidth}px`,
        paddingRight: `${paddingWidth}px`,
    };

    if (width != undefined) {
        width = `${width}px`;
        style['width'] = width;
    }

    return (
        <div className='Custom-Button' style={style} onClick={onClick}>

            <p1 className='Custom-Button-Text'>{msg}</p1>
        </div>
    )
}

export default CustomButton;