import 'assets/TextBoxField.css'

const TextBoxField = ({ onChange, value, placeholder, text }) => {
    return (
        <div className='Field-Wrapper'>
            <p1 className='Field-Text'>{text}</p1>
            <div className='Text-Box-Wrapper'>
                <input className='Text-Box-Input' placeholder={placeholder} onChange={onChange} value={value} />
            </div>
        </div>
    )
}

export default TextBoxField;