import {  getTeacherFromDB , getCurriculumFromDB} from '../../database/dal/firebase/homeDal';

import {getNotificationFromDB} from '../../database/dal/firebase/studentDal';

import {getNotificationsFromDB} from '../../database/dal/firebase/studentDal';
export const getCurriculum = () => {
    return (dispatch) => {
        getCurriculumFromDB(dispatch);
    }
}
export const getTeacher = () => {
    return (dispatch) => {
        getTeacherFromDB(dispatch);
    }
}


// export const getNotification = () => {
//     return (dispatch) => {
//         getNotificationFromDB(dispatch);
//     }
// }
export const getNotification = () => {
    return (dispatch) => {
        getNotificationsFromDB(dispatch);
    }
}