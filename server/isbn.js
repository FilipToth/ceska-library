const applyIsbnPadding = (unpadded) => {
    const length = unpadded.length;
    const isbnLength = 10;

    if (isbnLength <= length)
        return unpadded;

    const paddingLength = isbnLength - length;
    const padding = '0'.repeat(paddingLength);
    return `${padding}${unpadded}`;
};

module.exports = { applyIsbnPadding };