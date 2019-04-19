class ElearningConst  {
    close = 'close'
}
export const CATEGORY = {
    HEADING: 'Category Management',
    SUBHEADING: 'Category',
    ACTIONS : {
        GET: 'GET',
        MANAGE: 'MANAGE',
        ERROR: 'ERROR'
    },
    TYPE: {
        ADD: 'ADD',
        EDIT: 'EDIT',
        DELETE: 'DELETE'
    },
    EMPTY_MSG: 'Please Enter Category Name',
    DELETE_MSG: 'Are You Sure You Want to Delete this Category?',
    DASHBOARD_TYPE: {
        STUDENT: 'STUDENT',
        TEACHER: 'TEACHER'
    }
}
export const TEACHER_DASHBOARD_LINKS = [
    {
        name: 'Video',
        link: '/teacher/videos',
        icon: 'fas fa-video home-header-icon--size',
        title: 'Video',
        style: {
            marginLeft: '5px'
        }
    },
    {
        name: 'Dashboard',
        link: '/teacher',        
        icon: 'fa fa-tachometer home-header-icon--size',
        title: 'Dashboard',
        style: {
            marginLeft: '5px'
        }
    },
]

export const STUDENT_DASHBOARD_LINKS = [
    {
        name: 'Notification',
        link: '/student/createNewNotification',
        icon: 'fas fa-bell home-header-icon--size',
        title: 'Notification',
        style: {
            marginLeft: '5px'
        }
    },
    {
        name: 'Teacher',
        link: '/student/teacher',        
        icon: 'fa fa-search home-header-icon--size',
        title: 'Teacher',
        style: {
            marginLeft: '5px'
        }
    },

    {
        name: 'Dashboard',
        link: '/student',        
        icon: 'fa fa-graduation-cap home-header-icon--size',
        title: 'Dashboard',
        style: {
            marginLeft: '5px'
        }
    },
]
export default ElearningConst;