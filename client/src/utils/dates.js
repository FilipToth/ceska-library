export const getDateMonthFromNow = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
};

export const sterilizeDate = (date) => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
};