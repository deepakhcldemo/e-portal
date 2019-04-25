import {saveNotificationAcceptedFromDB} from '../../../database/dal/firebase/notificationdal'

export const closePopModalForNotification = () => {
    return {
      type: 'CLOSE_NOTIFICATION_POP'
    };
  };


  export const saveAcceptedNotification = (rejectNotification) => {
    return (dispatch) => {
        saveNotificationAcceptedFromDB(dispatch, rejectNotification);
    }
}
  