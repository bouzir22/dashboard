import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);
// todo:lazy
const routes = [
    

    
    {
        exact: true,
        path: '/public/application/register',
        component: lazy(() => import('./views/auth/signup/RestRegister copy'))
    },
    {
        exact: true,
        path: '/public/user/data',
        component: lazy(() => import('./views/extra/update-user-data'))
    },
    {
        exact: true,
        path: '/public/job/apply',
        component: lazy(() => import('./views/extra/application'))
    },
    {
        exact: true,
        path: '/public/job/list',
        component: lazy(() => import('./views/extra/job-list'))
    },
    {
        exact: true,
       
        path: '/auth/signin',
        component: lazy(() => import('./views/auth/signin/SignIn1'))
    },
    {
        exact: true,
        path: '/auth/signup',
        component: lazy(() => import('./views/auth/signup/SignUp1'))
    },
    
        {
            exact: true,
            path: '/public/register',
            component: lazy(() => import('./views/extra/register'))
            },
        
    
 
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
            {
                exact: true,
                 
                path: '/app/dashboard/default',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },
            {
                exact: true,
                path: '/app/application/preview/:id',
                component: lazy(() => import('./views/extra/application-preview'))
            },
            {
                exact: true,
                 
                path: '/users/applications',
                component: lazy(() => import('./views/dashboard/DashDefault/usersApplications'))
            },
            {
                exact: true,
                path: '/app/applicants',
                component: lazy(() => import('./views/extra/applicants'))
            },
            {
                exact: true,
                path: '/app/sortedapplicants/:accepted',
                component: lazy(() => import('./views/extra/sortedapplicants'))
            },
            
            {
                exact: true,
                path: '/basic/button',
                component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
            },
            {
                exact: true,
                path: '/basic/badges',
                component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
            },
            {
                exact: true,
                path: '/basic/breadcrumb',
                component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
            },
            {
                exact: true,
                path: '/basic/collapse',
                component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
            },
            {
                exact: true,
                path: '/basic/tabs-pills',
                component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
            },
            {
                exact: true,
                path: '/basic/typography',
                component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
            },

            {
                exact: true,
                path: '/forms/form-basic',
                component: lazy(() => import('./views/forms/FormsElements'))
            },
            {
                exact: true,
                path: '/tables/bootstrap',
                component: lazy(() => import('./views/tables/BootstrapTable'))
            },

            {
                exact: true,
                path: '/charts/nvd3',
                component: lazy(() => import('./views/charts/nvd3-chart'))
            },
            

            {
                exact: true,
                path: '/sample-page',
                component: lazy(() => import('./views/extra/sortedapplicants'))
            },
            {
                exact: true,
                path: '/jobs',
                component: lazy(() => import('./views/extra/Jobs'))
            },
            {
                exact: true,
                path: '/opportunity/update',
                component: lazy(() => import('./views/extra/opportunity-update'))
            },   
            {
                exact: true,
                path: '/opportunity/add',
                component: lazy(() => import('./views/extra/Opportunity'))
            },    {
                exact: true,
                path: '/opportunity/preview/:id', // Include a dynamic parameter ':id'
                component: lazy(() => import('./views/extra/opportunity-preview')),
              },
               
          {
            exact: true,
            path: '/opportunity/preview',
            component: lazy(() => import('./views/extra/opportunity-preview'))
           },
           {
            exact: true,
            path: '/users/list',
            component: lazy(() => import('./views/extra/users'))
           },
           {
            exact: true,
            path: '/user/details',
            component: lazy(() => import('./views/extra/user-details'))
        },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to={BASE_URL} />
            }
        ]
    }
];

export default routes;