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
            <Avatar style={{ background: '#fff', color: '#007bc2' }}>
                <IconMusic />
            </Avatar>
        ),
        title: 'Entertainment'
    },
    {
        id: 2,
        icon: (
            <Avatar style={{ background: '#fff', color: '#0c790c' }}>
                <IconAerialLift />
            </Avatar>
        ),
        title: 'Travelling'
    },
    {
        id: 3,
        icon: (
            <Avatar style={{ background: '#fff', color: '#ff3700' }}>
                <IconHeartHandshake />
            </Avatar>
        ),
        title: 'Community'
    },
    {
        id: 4,
        icon: (
            <Avatar style={{ background: '#fff', color: '#58b000' }}>
                <IconMovie />
            </Avatar>
        ),
        title: 'Cinema & Theater'
    },
    {
        id: 5,
        icon: (
            <Avatar style={{ background: '#fff', color: '#5e3d08' }}>
                <IconMoonStars />
            </Avatar>
        ),
        title: 'Nightlife'
    },
    {
        id: 6,
        icon: (
            <Avatar style={{ background: '#fff', color: '#f57a00' }}>
                <IconAffiliate />
            </Avatar>
        ),
        title: 'Trade Fairs & Expo'
    },
    {
        id: 7,
        icon: (
            <Avatar style={{ background: '#fff', color: '#2c2e27' }}>
                <IconBriefcase />
            </Avatar>
        ),
        title: 'Professional'
    },
    {
        id: 8,
        icon: (
            <Avatar style={{ background: '#fff', color: '#9306c2' }}>
                <IconShoppingCart />
            </Avatar>
        ),
        title: 'Shopping'
    },

    {
        id: 9,
        icon: (
            <Avatar style={{ background: '#fff', color: '#ff0571' }}>
                <IconSoccerField />
            </Avatar>
        ),
        title: 'sports'
    },
    {
        id: 10,
        icon: (
            <Avatar style={{ background: '#fff', color: '#00ba8f' }}>
                <IconCategory2 />
            </Avatar>
        ),
        title: 'Others'
    }
];

export default categories;
