import 'assets/TextBoxField.css'

const TextBoxField = ({ onChange, value, placeholder, text, isPassword }) => {
    const type = isPassword ? 'password' : 'text';
    return (
        <div className='Field-Wrapper'>
            <p1 className='Field-Text'>{text}</p1>
            <div className='Text-Box-Wrapper'>
                <input className='Text-Box-Input' placeholder={placeholder} onChange={onChange} value={value} type={type} />
            </div>
        </div>
    )
}

export default TextBoxField;