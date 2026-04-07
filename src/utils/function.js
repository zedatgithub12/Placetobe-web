import { useTheme } from '@mui/material';

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

export const formatNumber = (passednum) => {
    const number = Math.abs(passednum);
    if (passednum < 0) {
        if (number >= 1000000) {
            return -(number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return -(number / 1000).toFixed(1) + 'K';
        } else {
            return -number.toString();
        }
    } else {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return number.toString();
        }
    }
};

// get number of days in month
//use current month and year as initial inputs
export const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based

    return new Date(year, month, 0).getDate();
};

export const calculatePercentage = (numerator, denominator) => {
    if (denominator === 0) {
        return 0;
    }
    const percentage = (numerator / denominator) * 100;
    return percentage.toFixed(2); // Limiting the result to 2 decimal places
};

export const DateFormatter = (soldat) => {
    var year = soldat.slice(0, 4);
    var month = soldat.slice(5, 7);
    var day = soldat.slice(8, 10);
    const date = day + '-' + month + '-' + year;
    return date;
};

export const Achievement = (revenue, target) => {
    let status;
    if (revenue >= target) {
        status = 'achieved';
        return status;
    } else {
        status = 'in-progress';
        return status;
    }
};

export const formatDate = (createdAt) => {
    const date = new Date(createdAt);

    // Get the month name
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = monthNames[date.getMonth()];

    // Get the day and pad it with leading zeros if necessary
    const day = String(date.getDate()).padStart(2, '0');

    // Get the year
    const year = date.getFullYear();

    // Format the date as DDMMYYYY
    const formattedDate = `${day}-${month.slice(0, 3)}-${year}`;

    return {
        monthName: month.slice(0, 3),
        formattedDate: formattedDate
    };
};

export function isDateEqualToToday(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Extract year, month, and day from input date
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();

    // Extract year, month, and day from today's date
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Compare the date components
    if (inputYear === currentYear && inputMonth === currentMonth && inputDay === currentDay) {
        return true;
    }

    return false;
}

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

export const TicketColor = (iconname) => {
    let Color;

    switch (iconname) {
        case 'Early Bird':
            Color = '#ff24da';
            break;

        case 'Regular':
            Color = '#00a2ff';

            break;

        case 'VIP':
            Color = '#ffc800';

            break;

        case 'VVIP':
            Color = '#ffb300';

            break;

        case 'Student':
            Color = '#00c4de';

            break;

        case 'Kids':
            Color = '#ff3686';

            break;

        case 'Adult':
            Color = '#ff551c';

            break;

        case 'Member':
            Color = '#5fcc41';

            break;

        default:
            Color = '#ffbb00';
    }
    return Color;
};

export const StatusText = (textColor) => {
    let StatusColor;
    const theme = useTheme();

    switch (textColor) {
        case 0:
            StatusColor = '#007500';
            break;

        case 1:
            StatusColor = '#0075FF';
            break;

        case 'active':
            StatusColor = theme.palette.success[200];
            break;

        case 'used':
            StatusColor = theme.palette.secondary[200];
            break;

        case 'cancelled':
            StatusColor = theme.palette.error.light;
            break;

        case 2:
            StatusColor = '#ff3d4d';
            break;

        case 3:
            StatusColor = '#787878';
            break;

        default:
            StatusColor = '#787878';
    }
    return StatusColor;
};
