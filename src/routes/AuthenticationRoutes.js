import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const Forgot_Password = Loadable(lazy(() => import('views/pages/authentication/forgot-password')));
const Reset_Password = Loadable(lazy(() => import('views/pages/authentication/reset-password')));

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/signin',
            element: <AuthLogin3 />
        },
        {
            path: '/signup',
            element: <AuthRegister3 />
        },
        {
            path: '/forgot-password',
            element: <Forgot_Password />
        },
        {
            path: '/reset-password/:token',
            element: <Reset_Password />
        }
    ]
};

export default AuthenticationRoutes;
