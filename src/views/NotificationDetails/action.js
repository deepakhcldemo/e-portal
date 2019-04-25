
import { rejectNotificationFromDB } from "../../database/dal/firebase/notificationdal";


export const rejectNotification = (rejectNotification) => {
    return (dispatch) => {
        rejectNotificationFromDB(dispatch, rejectNotification);
    }
}


export const openModalForAcceptNotification = () => {
    return { type: "OPEN_MODAL_FOR_ACCEPT"};
  };