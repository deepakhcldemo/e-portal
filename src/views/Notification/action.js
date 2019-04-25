import { getNotificationsFromDB } from '../../database/dal/firebase/studentDal';

export const getNotifications = () => {
    return (dispatch) => {
        getNotificationsFromDB(dispatch);
    }
}


export const setNotificationDetails = (details) => {
    return { type: "NOTIFICATIONS_DETAILS", payload: details };
}

