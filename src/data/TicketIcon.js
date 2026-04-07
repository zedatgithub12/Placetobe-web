import { IconAward, IconIdBadge2, IconMoodKid, IconSchool, IconStar, IconTicket, IconTrophy, IconUser, IconVip } from '@tabler/icons';

export const TicketName = ({ iconname, sx }) => {
    switch (iconname) {
        case 'Early Bird':
            return <IconTrophy size={50} style={{ ...sx }} />;
            break;

        case 'Regular':
            return <IconTicket size={50} style={{ ...sx }} />;
            break;

        case 'VIP':
            return <IconVip size={50} style={{ ...sx }} />;
            break;

        case 'VVIP':
            return <IconAward size={50} style={{ ...sx }} />;
            break;

        case 'Student':
            return <IconSchool size={50} style={{ ...sx }} />;
            break;

        case 'Kids':
            return <IconMoodKid size={50} style={{ ...sx }} />;
            break;

        case 'Adult':
            return <IconUser size={50} style={{ ...sx }} />;
            break;

        case 'Member':
            return <IconIdBadge2 size={50} style={{ ...sx }} />;
            break;

        default:
            return <IconTicket size={50} style={{ ...sx }} />;
    }
};
