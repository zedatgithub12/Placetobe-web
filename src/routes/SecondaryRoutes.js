import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

//A route for a pages that are expected to be displayed outside of the main routing
const Profile = Loadable(lazy(() => import('views/user/profile')));
const EditProfile = Loadable(lazy(() => import('views/user/profile/edit')));

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
        }
    ]
};

export default SecondaryRoutes;
