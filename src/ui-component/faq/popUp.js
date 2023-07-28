import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <CloseIcon sx={{ position: 'absolute', top: '3%', right: '3%', cursor: 'pointer' }} onClick={() => setOpenPopup(false)} />
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
