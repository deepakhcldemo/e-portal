import dbFactory from '../../dbFactory'
const db = dbFactory.create('firebase');

/* export const getCurrentUserFromDB = dispatch => {
    db.auth().onAuthStateChanged( user => {
        if(user) {
            const uid = user.uid
            dispatch({type: 'GET_CURRENT_USER', uid})
        }
    });
} */

export const saveFileMetaDataFromDB = (dispatch, fileName, user, doc, fields, type) => {
    let actualFileName;
    if(type === 'video') {
        actualFileName = fileName.split(/\.(?=[^\.]+$)/);
    }
    const metaData = {
        userId: user.userId,
        src:'',    
        title: (type === 'video' ) ? actualFileName[0] : '',
        desc: '',
        tags: '',
        videoMetadata: [],
        thumb: '',
        status: true,
        subject: user.subject,
        isPending: (user.role === 'Teacher') ? true : false,
        created: db.firestore.FieldValue.serverTimestamp()
    }
    if(type === 'metadata') {
        console.log(doc,fields)
        db.firestore().collection('curriculum').doc(doc)
        db.firestore().collection('curriculum').doc(doc).update(fields)
        .then(function(){
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }else if(type === 'metadata') {
        db.storage().ref(user.userId).child(fileName).getDownloadURL().then(url => {
            if(type === 'video') {
                metaData.src = url
                db.firestore().collection('curriculum').add(metaData)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    dispatch({type: 'SET_DOC_REF', ref: docRef.id})
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            } else if(type === 'thumb') {
                db.firestore().collection('curriculum').doc(doc).update({
                    thumb: url
                }).then(function(){
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        })       
    }
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