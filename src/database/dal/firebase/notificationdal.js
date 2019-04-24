

import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};


export const saveNotification = notificationDetails => {
  return getDbRef('notifications')
    .add({
      ...notificationDetails
    });
};


export const getNotificationFromDB = (dispatch) => {
  const db = dbFactory.create('firebase');
  let data = [];
  db.firestore().collection("notifications").get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          data.push(doc.data())
          console.log('data in notification', data)
      })
      dispatch({type:'GET_NOTIFICATIONS', notifications: data})
  }) 
  .catch(err => {
      dispatch({type: 'ERROR', err})
  })              
}


export const getVideoUrl = (name) => {
  debugger
  const studentDetails = JSON.parse(localStorage.getItem('userProfile'));
  const db = dbFactory.create('firebase');
  return db.storage().ref(`notification/${studentDetails.userId}`).child(name).getDownloadURL()
}