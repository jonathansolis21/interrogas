import { lazy } from 'react';

const References = lazy(() => import('../components/references/References'));
const ReferenceForm = lazy(() => import('../components/references/ReferenceForm'));
const ReferenceUpdate = lazy(() => import('../components/references/ReferenceUpdate'));


const references = [
    {
        path: '/references',
        name: 'References',
        exact: true,
        element: References,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/references/new',
        name: 'ReferenceForm',
        exact: true,
        element: ReferenceForm,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/references/update/:id',
        name: 'ReferenceUpdate',
        exact: true,
        element: ReferenceUpdate,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const allRoutes = [
    ...references,
];

export default allRoutes;
