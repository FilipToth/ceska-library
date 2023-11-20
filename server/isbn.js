const applyIsbnPadding = (unpadded) => {
    const length = unpadded.length;
    const isbnLength = 10;

    if (isbnLength <= length)
        return unpadded;

    const paddingLength = isbnLength - length;
    const padding = '0'.repeat(paddingLength);
    return `${padding}${unpadded}`;
};

const verifyIsbn = (isbn) => {
    const containsLettersRegex = /[a-zA-Z]/g;
    if (containsLettersRegex.test(isbn))
        return false;

    isbn = isbn.replaceAll('-', '');
    isbn = isbn.replaceAll(' ', '');

    if (isbn.length == 10)
        return verifyIsbn10Checksum(isbn);
    
    return verifyIsbn13Checksum(isbn);
};

const verifyIsbn10Checksum = (isbn) => {
    isbn = isbn.split('')
               .reverse();
    
    let checksum = 0;
    for (let i = 0; i < isbn.length; i++) {
        const element = isbn[i];
        const num = parseInt(element);

        checksum += num * (i + 1);
    }

    if (checksum % 11 == 0)
        return true;
    
    return false;
};

const verifyIsbn13Checksum = (isbn) => {
    isbn = isbn.split('')
               .reverse();

    let checksum = 0;
    for (let i = 1; i < isbn.length + 1; i++) {
        const element = isbn[i - 1];
        const num = parseInt(element);

        if (i % 2 == 0)
            checksum += num * 3;
        else
            checksum += num;
    }

    console.log(`${isbn}: ${checksum}`);
    if (checksum % 10 == 0)
        return true;

    return false;
};

module.exports = { applyIsbnPadding, verifyIsbn };