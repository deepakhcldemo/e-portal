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
    /* db.storage.ref(uid).child(fileName).getDownloadURL().then(url => 
        dispatch({type: '', uid})
        ) */
        /* .storage()
        .ref(this.props.uid)
        .child(filename)
        .getDownloadURL()
        .then(url => console.log(url)); */
        
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