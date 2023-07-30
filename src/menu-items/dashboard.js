// assets
import {
    IconDashboard,
    IconHome,
    IconTimelineEvent,
    IconBrandChrome,
    IconBox,
    IconCategory,
    IconBuildingStore,
    IconTimeline,
    IconUsers,
    IconBuildingWarehouse,
    IconNews,
    IconMan,
    IconNotification,
    IconCalendarEvent
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconHome,
    IconTimelineEvent,
    IconBrandChrome,
    IconBox,
    IconCategory,
    IconBuildingStore,
    IconTimeline,
    IconUsers,
    IconBuildingWarehouse,
    IconNews,
    IconMan,
    IconNotification,
    IconCalendarEvent
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'home',
    // cancelling title: 'Dashboard',
    type: 'group',
    children: [
        // {
        // //     id: 'default',
        // //     title: 'Events',
        // //     type: 'item',
        // //     url: '/events',
        // //     icon: icons.IconHome,
        // //     breadcrumbs: false
        // // },
        {
            id: 'events',
            title: 'Events',
            type: 'item',
            url: '/events',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        },
        {
            id: 'calendar',
            title: 'Calendar',
            type: 'item',
            url: '/event-calendar',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        },
        {
            id: 'ticket-detail',
            title: 'Ticket Detail',
            type: 'item',
            url: '/ticket-detail',
            icon: icons.IconTimelineEvent,
            breadcrumbs: false
        },
        {
            id: 'faq',
            title: 'FAQ',
            type: 'item',
            url: '/faq',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
