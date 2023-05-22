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
    IconMan
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
    IconMan
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    // cancelling title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'shops',
            title: 'Events',
            type: 'item',
            url: '/sample-page2',
            icon: icons.IconTimelineEvent,
            breadcrumbs: false
        },
        // {
        //     id: 'products',
        //     title: 'Products',
        //     type: 'collapse',
        //     url: '/sample-page',
        //     icon: icons.IconBox,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'listproduct',
        //             title: 'List Product',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'addproduct',
        //             title: 'Add Product',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'category',
        //     title: 'Category',
        //     type: 'collapse',
        //     url: '/sample-page',
        //     icon: icons.IconCategory,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'listcategory',
        //             title: 'List Category',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'addcategory',
        //             title: 'Add Category',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        {
            id: 'sales',
            title: 'Venue',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBuildingWarehouse,
            breadcrumbs: false
        },
        {
            id: 'customers',
            title: 'Blog',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconNews,
            breadcrumbs: false
        },
        {
            id: 'sales',
            title: 'Event Organizers',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconMan,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
