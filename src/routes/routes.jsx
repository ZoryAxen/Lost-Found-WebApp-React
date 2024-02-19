import { lazy } from 'react';
import Loadable from '../components/Loadable';

const HomePage = Loadable(lazy(() => import ('../pages/Home')));
const ItemPage = Loadable(lazy(() => import ('../pages/Items')));
const ReportPage = Loadable(lazy(() => import ('../pages/Report')));

const routes = () => [
    {
        path: '/',
        children: [
            { path: '', element: <HomePage /> },
            { path: '/items', element: <ItemPage /> },
            { path: '/report', element: <ReportPage />},
        ]
    }
]

export default routes;