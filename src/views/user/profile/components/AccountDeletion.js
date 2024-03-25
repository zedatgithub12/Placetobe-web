import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteAccount = ({ open, handleClose, onDelete, isDeleting }) => {
    const theme = useTheme();
    return (
        <div>
            <Dialog open={open} onClose={handleClose} sx={{ padding: 2 }}>
                <DialogTitle variant="h4">Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete your account? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button onClick={handleClose} sx={{ color: theme.palette.grey[500] }}>
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="contained" color="error" sx={{ paddingX: 4 }}>
                        {isDeleting ? <CircularProgress size={16} sx={{ color: theme.palette.background.default }} /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

DeleteAccount.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onDelete: PropTypes.func,
    isDeleting: PropTypes.bool
};

export default DeleteAccount;
