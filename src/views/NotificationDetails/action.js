
import { rejectNotificationFromDB } from "../../database/dal/firebase/notificationdal";


export const rejectNotification = (rejectNotification) => {
    return (dispatch) => {
        rejectNotificationFromDB(dispatch, rejectNotification);
    }
}