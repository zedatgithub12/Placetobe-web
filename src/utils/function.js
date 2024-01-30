export const TimeFun = (eventTime) => {
    let time = eventTime;
    let result = time.slice(0, 2);
    let minute = time.slice(3, 5);
    let globalTime;
    let postMeridian;
    let separator = ':';
    if (result > 12) {
        postMeridian = result - 12;
        globalTime = 'PM';
    } else {
        postMeridian = result;
        globalTime = 'AM';
    }

    return postMeridian + separator + minute + ' ' + globalTime;
};
export const renderStatus = (startingDate, endingDate) => {
    var currentStatus;
    var Happening = 'Happening';
    var Upcoming = 'Upcoming';
    var Passed = 'Expired';

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    if (startingDate == today || (startingDate < today && endingDate >= today)) {
        currentStatus = Happening;
    } else if (startingDate > today) {
        currentStatus = Upcoming;
    } else {
        currentStatus = Passed;
    }

    return currentStatus;
};
