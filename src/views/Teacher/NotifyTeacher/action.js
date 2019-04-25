import { getNotificationsFromDB } from '../../../database/dal/firebase/studentDal';

export const getNotifications = () => {
    return (dispatch) => {
        getNotificationsFromDB(dispatch);
    }
}

