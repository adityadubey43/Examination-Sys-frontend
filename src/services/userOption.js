export const TRAINER_PERMISSIONS=[
    {
        display : 'Welcome',
        icon : 'home',
        link : '/user/home'
    },
    {
        display : 'All Tests',
        icon : 'copy',
        link : '/user/listtests'
    },
    {
        display : 'Conduct Test',
        icon : 'edit',
        link : '/user/conducttest'
    }
]

export const ADMIN_PERMISSIONS=[
    ...TRAINER_PERMISSIONS,
    {
        display : 'All Trainers',
        icon : 'user',
        link : '/user/listtrainers'
    },
    {
        display : 'All Courses',
        icon : 'book',
        link : '/user/listsubjects' 
    },
    {
        display : 'All Questions',
        icon : 'form',
        link : '/user/listquestions'
    },
    {
        display : 'New Test',
        icon : 'edit',
        link : '/user/newtest'
    }
]   