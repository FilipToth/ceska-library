import 'assets/IsbnVerificationStatus.css'

const IsbnVerificationStatus = ({ valid, bogusISBN }) => {
    let statusText = 'Bogus ISBN';
    let statusClass = 'isbn-verification-status-bogus';

    if (!bogusISBN && valid) {
        statusText = 'Valid ISBN';
        statusClass = 'isbn-verification-status-valid';
    } else if (!bogusISBN && !valid) {
        statusText = 'Invalid ISBN';
        statusClass = 'isbn-verification-status-invalid';
    }

    return (
        <div class={`isbn-verification-status ${statusClass}`}>
            <p1 class='reduced-size'>{statusText}</p1>
        </div>
    );
};

export default IsbnVerificationStatus;