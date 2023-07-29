import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar } from '@mui/material';

const faqFooter = [
    {
        id: 1,
        icon: (
            <Avatar style={{ background: '#FDB910', color: 'black', width: 60, height: 60 }}>
                <PhoneIcon />
            </Avatar>
        ),
        title: 'Phone',
        description: ['+251-992 758 586', '+251-911 287 546']
    },
    {
        id: 2,
        icon: (
            <Avatar style={{ background: '#FDB910', color: 'black', width: 60, height: 60 }}>
                <MailIcon />
            </Avatar>
        ),
        title: 'Mail Us',
        description: ['P2bethiopia@gmail.com']
    },
    {
        id: 3,
        icon: (
            <Avatar style={{ background: '#FDB910', color: 'black', width: 60, height: 60 }}>
                <LocationOnIcon />
            </Avatar>
        ),
        title: 'Visit Us',
        description: ['Husen Building,2nd Floor,Bole 24,Addis Ababa Ethiopia']
    }
];

export default faqFooter;
