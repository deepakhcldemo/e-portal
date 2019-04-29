import dbFactory from "../../dbFactory";

const getDbRef = collectionName => {
  const db = dbFactory.create("firebase");
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const saveNotification = notificationDetails => {
  return getDbRef("notifications").add({
    ...notificationDetails
  });
};

export const getNotificationFromDB = dispatch => {
  const db = dbFactory.create("firebase");
  let data = [];
  db.firestore()
    .collection("notifications")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data.push(doc.data());
        console.log("data in notification", data);
      });
      dispatch({ type: "GET_NOTIFICATIONS", notifications: data });
    })
    .catch(err => {
      dispatch({ type: "ERROR", err });
    });
};

export const rejectNotificationFromDB = (
  dispatch,
  rejectedNotificationsDetails
) => {
  let query = getDbRef("notifications")
    .doc(rejectedNotificationsDetails.id)
    .set(rejectedNotificationsDetails)
    .then(() => {
      dispatch({ type: "REJECT_NOTIFICATION" });
    });
};


export const deleteNotificationFromDB = (
  dispatch,
  deleteNotificationsDetails
) => {
  let query = getDbRef("notifications")
    .doc(deleteNotificationsDetails.id)
    .delete()
    .then(() => {
      dispatch({ type: "DELETE_NOTIFICATION" });
    });
};

export const saveNotificationAcceptedFromDB = (
  dispatch,
  acceptedNotificationsDetails
) => {
  let query = getDbRef("notifications")
    .doc(acceptedNotificationsDetails.id)
    .set(acceptedNotificationsDetails)
    .then(() => {
      dispatch({ type: "REJECT_NOTIFICATION" });
    });
};

export const getVideoUrl = (name, id) => {
  // let studentDetails = [];
  // const studentDetails = JSON.parse(localStorage.getItem("userProfile"));
  const db = dbFactory.create("firebase");
  return db
    .storage()
    .ref("notification/" + id)
    .child(name)
    .getDownloadURL();
};
