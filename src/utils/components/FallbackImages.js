import emptyBoard from 'assets/images/empty-board.svg';
import empty from 'assets/images/empty.svg';
import error from 'assets/images/error.svg';

const FallbackImages = (severity) => {
    switch (severity) {
        case 'empty':
            return empty;
            break;
        case 'error':
            return error;
            break;

        default:
            return emptyBoard;
    }
};
export default FallbackImages;
