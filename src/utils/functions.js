export const TimeFun = (eventTime) => {
    var time = eventTime;
    var result = time.slice(0, 2);
    var minute = time.slice(3, 5);
    var globalTime;
    var postMeridian;
    var separator = ':';
    if (result > 12) {
        postMeridian = result - 12;
        globalTime = 'PM';
    } else {
        postMeridian = result;
        globalTime = 'AM';
    }

    return postMeridian + separator + minute + ' ' + globalTime;
};
