import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

//A route for a pages that are expected to be displayed outside of the main routing
const Profile = Loadable(lazy(() => import('views/user/profile')));
const EditProfile = Loadable(lazy(() => import('views/user/profile/edit')));
const PrivacyPolicy = Loadable(lazy(() => import('views/agreements/privacy')));
const Terms = Loadable(lazy(() => import('views/agreements/terms')));
const Refunding = Loadable(lazy(() => import('views/agreements/refunding')));
// ==============================|| SECONDARY ROUTING ||============================== //

const SecondaryRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/user/profile',
            element: <Profile />
        },
        {
            path: '/user/profile/edit',
            element: <EditProfile />
        },
        {
            path: '/privacy-policy',
            element: <PrivacyPolicy />
        },
        {
            path: '/terms-of-agreement',
            element: <Terms />
        },
        {
            path: '/refunding-policy',
            element: <Refunding />
        }
    ]
};

export default SecondaryRoutes;
