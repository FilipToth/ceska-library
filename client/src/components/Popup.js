import 'assets/Popup.css'
import { useState } from "react";

const Popup = ({ text, waitTime, waitCallback }) => {
    const [wrapperClassName, setWrapperClassName] = useState("Popup-Wrapper");

    setTimeout(() => {
        setWrapperClassName("Popup-Wrapper-Closing");
    }, waitTime + 500);

    setTimeout(() => {
        waitCallback();
    }, waitTime + 1000);

    return (
        <div className='Popup-Horizontal-Wrapper'>
            <div className={wrapperClassName}>
                <p1 className="Popup-Text">{text}</p1>
            </div>
        </div>
    )
}

export default Popup;