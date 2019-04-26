
import { rejectNotificationFromDB, saveNotificationAcceptedFromDB } from "../../database/dal/firebase/notificationdal";


export const rejectNotification = (rejectNotification) => {
    return (dispatch) => {
        rejectNotificationFromDB(dispatch, rejectNotification);
    }
}


export const openModalForAcceptNotification = () => {
    return { type: "OPEN_MODAL_FOR_ACCEPT"};
  };


  export const  setKeyForNotificationPage = (notificationDetails) => {
    return { type: "GO_BACK_TO_NOTIFICATION", payload : notificationDetails};
  }

  export const saveAcceptedNotification = (acceptedNotificationData) => {
    return (dispatch) => {
        saveNotificationAcceptedFromDB(dispatch, acceptedNotificationData);
    }
}