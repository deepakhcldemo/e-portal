import dbFactory from '../../dbFactory';

export const getTeachersFromDBBasedOnCategory = (dispatch, CategoryValue) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("userProfiles")
    //.where('firstName', '==', 'Avinash')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            data.push(doc.data())
        })
        dispatch({type:'GET_TEACHERS', Teachers: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}



export const getNotificationFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("notifications")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data(), 'getNotification');
            data.push(doc.data())
        })
        dispatch({type:'GET_NOTIFICATION', NotificationData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}



export const getBannerFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("banner")
    .where("page", "==", "home")
    .get()
 
}



