
import { rejectNotificationFromDB, saveNotificationAcceptedFromDB } from "../../database/dal/firebase/notificationdal";


export const rejectNotification = (rejectNotification) => {
    return (dispatch) => {
        rejectNotificationFromDB(dispatch, rejectNotification);
    }
}


export const openModalForAcceptNotification = () => {
    return { type: "OPEN_MODAL_FOR_ACCEPT"};
  };

  export const saveAcceptedNotification = (acceptedNotificationData) => {
    debugger
    return (dispatch) => {
        saveNotificationAcceptedFromDB(dispatch, acceptedNotificationData);
    }
}