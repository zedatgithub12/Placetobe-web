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
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/home/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'events',
            title: 'Events',
            type: 'item',
            url: '/events',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        }

        // {
        //     id: 'sales',
        //     title: 'Venue',
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconBuildingWarehouse,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'customers',
        //     title: 'Blog',
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconNews,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'sales',
        //     title: 'Event Organizers',
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconMan,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
