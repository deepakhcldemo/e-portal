

import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
  };
  

export const saveNotification = notificationDetails => {
  debugger
    return getDbRef('notifications')
      .doc(notificationDetails.loggedInUserId)
      .set({...notificationDetails});
  };


  export const getVideoUrl = (id, name) => {
    const studentDetails = JSON.parse(localStorage.getItem('userProfile'));
    const db = dbFactory.create('firebase');
   return db.storage().ref("notification" + "/" + studentDetails.userId).child('movie.mp4').getDownloadURL()
  }