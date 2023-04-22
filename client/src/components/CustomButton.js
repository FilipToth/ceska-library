import 'assets/CustomButton.css'

const CustomButton = ({ msg, onClick }) => {
    return (
        <div className='Custom-Button' onClick={onClick}>
            <p1 className='Custom-Button-Text'>{msg}</p1>
        </div>
    )
}

export default CustomButton;