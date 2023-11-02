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
                        {
                            id: 'button',
                            title: 'Rejected Applicants',
                            type: 'item',
                            url: '/app/sortedapplicants/2'
                        },
                        
                    ]
                }
            ]
        },
        {
            id: 'pages',
            title: 'Opportunity management',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Opportunities',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    children: [
                        {
                            id: 'signup-2',
                            title: 'Opportunities List',
                            type: 'item',
                            url: '/Jobs',
                        
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-2',
                            title: 'Add Oppmortunity',
                            type: 'item',
                            url: '/opportunity/add',
                            
                            breadcrumbs: false
                        }
                    ]
                },
                 
            ]
        },
        {
            id: 'chart-maps',
            title: 'Applications',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Recent Applications',
                    type: 'item',
                    url: '/users/applications',
                    icon: 'feather icon-pie-chart'
                },
                
            ]
        
        },
               
    ]
};

export default menuItems;
