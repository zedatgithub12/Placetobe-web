import {
    IconMusic,
    IconAerialLift,
    IconHeartHandshake,
    IconMoonStars,
    IconMovie,
    IconAffiliate,
    IconBriefcase,
    IconShoppingCart,
    IconSoccerField,
    IconCategory2
} from '@tabler/icons';

import { Avatar } from '@mui/material';

const categories = [
    {
        id: 1,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#007bc2', width: '24px', height: '24px' }}>
                <IconMusic size={14} />
            </Avatar>
        ),
        title: 'Entertainment'
    },
    {
        id: 2,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#0c790c', width: '24px', height: '24px' }}>
                <IconAerialLift size={14} />
            </Avatar>
        ),
        title: 'Travelling'
    },
    {
        id: 3,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#ff3700', width: '24px', height: '24px' }}>
                <IconHeartHandshake size={14} />
            </Avatar>
        ),
        title: 'Community'
    },
    {
        id: 4,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#58b000', width: '24px', height: '24px' }}>
                <IconMovie size={14} />
            </Avatar>
        ),
        title: 'Cinema & Theater'
    },
    {
        id: 5,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#5e3d08', width: '24px', height: '24px' }}>
                <IconMoonStars size={14} />
            </Avatar>
        ),
        title: 'Nightlife'
    },
    {
        id: 6,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#f57a00', width: '24px', height: '24px' }}>
                <IconAffiliate size={14} />
            </Avatar>
        ),
        title: 'Trade Fairs & Expo'
    },
    {
        id: 7,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#2c2e27', width: '24px', height: '24px' }}>
                <IconBriefcase size={14} />
            </Avatar>
        ),
        title: 'Professional'
    },
    {
        id: 8,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#9306c2', width: '24px', height: '24px' }}>
                <IconShoppingCart size={14} />
            </Avatar>
        ),
        title: 'Shopping'
    },

    {
        id: 9,
        icon: (
            <Avatar style={{ background: '#f3f3f3', color: '#ff0571', width: '24px', height: '24px' }}>
                <IconSoccerField size={14} />
            </Avatar>
        ),
        title: 'sports'
    },
    {
        id: 10,
        icon: (
            <Avatar sx={{ background: '#f3f3f3', color: '#00ba8f', width: '24px', height: '24px' }}>
                <IconCategory2 size={14} />
            </Avatar>
        ),
        title: 'Others'
    }
];

export default categories;
