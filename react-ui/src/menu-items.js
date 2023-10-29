const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/app/dashboard/default',
                    icon: 'feather icon-home'
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'applicant management',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'basic',
                    title: 'Applicants',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Applicants List',
                            type: 'item',
                            url: '/app/applicants'
                        },
                        {
                            id: 'button',
                            title: 'Accepted Applicants',
                            type: 'item',
                            url: '/app/sortedapplicants/1'
                        },
                        
                    ]
                }
            ]
        },
        {
            id: 'pages',
            title: 'Oppmortunity management',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Oppmortunities',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    children: [
                        {
                            id: 'signup-2',
                            title: 'Oppmortunities List',
                            type: 'item',
                            url: '/Jobs',
                            target: true,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-2',
                            title: 'Add Oppmortunity',
                            type: 'item',
                            url: '/auth/signin-2',
                            target: true,
                            breadcrumbs: false
                        }
                    ]
                },
                 
            ]
        },
        {
            id: 'chart-maps',
            title: 'Oppoertunities',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    url: '/charts/nvd3',
                    icon: 'feather icon-pie-chart'
                },
                {
                    id: 'maps',
                    title: 'Maps',
                    type: 'item',
                    url: '/maps/google-map',
                    icon: 'feather icon-map'
                }
            ]
        
        },
               
    ]
};

export default menuItems;
