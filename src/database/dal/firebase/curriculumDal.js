import dbFactory from '../../dbFactory'
const db = dbFactory.create('firebase');

export const getCurrentUserFromDB = dispatch => {
    db.auth().onAuthStateChanged( user => {
        if(user) {
            const uid = user.uid
            dispatch({type: 'GET_CURRENT_USER', uid})
        }
    });
}
export const saveFileMetaDataFromDB = (dispatch, fileName, uid) => {
    const actualFileName = fileName.split(/\.(?=[^\.]+$)/);
    const metaData = {
        uid,
        src:'',    
        title: actualFileName[0],
        desc: '',
        tags: '',
        videoMetadata: [],
        thumb: '',
        status: false,
        isPending: false,
        created: db.firestore.FieldValue.serverTimestamp()
    }
    db.storage().ref(uid).child(fileName).getDownloadURL().then(url => {
        metaData.src = url
        db.firestore().collection('curriculum').add(metaData)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            dispatch({type: 'add'})
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    })       
}

/* export const getCurrentUserFromDB = dispatch => {
    const db = dbFactory.create('firebase')
    const currentUser = db.auth().currentUser;
    dispatch({type: 'CURRENT_USER', currentUser})
}
export const getStorageRef = (dispatch) => {
    const db = dbFactory.create('firebase')
    db.auth().onAuthStateChanged( user => {
        if (user) {            
            const uid = user.uid;
            const storageRef = db.storage().ref(uid)
            dispatch({type: 'GET_REF',storageRef})
        }
    });
}
 */