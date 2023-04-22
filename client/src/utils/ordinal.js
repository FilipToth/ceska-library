const getOrginal = (num) => {
    if (num == undefined) {
        return '';
    }
    
    if ((num % 100) >= 11 && (num % 100) <= 13) {
        return "th";
    } else {
        switch (num % 10) {
            case 0:
                return "th";
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
}

export default getOrginal;