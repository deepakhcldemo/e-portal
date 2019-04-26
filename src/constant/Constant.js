class ElearningConst {
  close = "close";
}
export const CATEGORY = {
  HEADING: "Category Management",
  SUBHEADING: "Category",
  ACTIONS: {
    GET: "GET",
    MANAGE: "MANAGE",
    ERROR: "ERROR"
  },
  TYPE: {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
  },
  EMPTY_MSG: "Please Enter Category Name",
  DELETE_MSG: "Are You Sure You Want to Delete this Category?",
  DASHBOARD_TYPE: {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER"
  }
};
export const TEACHER_DASHBOARD_LINKS = [
    {
        name: 'Dashboard',
        link: '/teacher',        
        icon: 'fa fa-tachometer',
        title: 'Dashboard',
        style: {
            marginLeft: '5px'
        }
    },
    {
        name: 'Video',
        link: '/videos',
        icon: 'fa fa-video',
        title: 'Video',
        style: {
            marginLeft: '5px'
        }
    },
    {
        name: 'Notification',
        link: '/notification',
        icon: 'fa fa-bell',
        title: 'Notification',
        style: {
            marginLeft: '5px'
        }
    }
];

export const STUDENT_DASHBOARD_LINKS = [
  {
    name: "Dashboard",
    link: "/student",
    icon: "fa fa-graduation-cap",
    title: "Dashboard",
    style: {
      marginLeft: "5px"
    }
  },
  {
    name: "Teacher",
    link: "/student/teacher",
    icon: "fa fa-search",
    title: "Teacher",
    style: {
      marginLeft: "5px"
    }
  },
  {
    name: "Notification",
    link: "/notification",
    icon: "fa fa-bell",
    title: "Notification",
    style: {
      marginLeft: "5px"
    }
  }
]
export const VIDEO_TABS = {
    teacher: [
        {
            id: 'pendingreview',
            name: 'Pending For Review'
        },
        
        {
            id: 'reviewed',
            name: 'Reviewed'
        },
        {
            id: 'myvideo',
            name: 'My Video'
        }
    ],
    student: [
        {
            id: 'pendingreview',
            name: 'Pending For Review'
        },
        {
            id: 'reviewed',
            name: 'Reviewed'
        },
        {
            id: 'rejected',
            name: 'Rejected'
        }
    ]
}
export default ElearningConst;
