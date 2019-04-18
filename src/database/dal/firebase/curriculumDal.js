import dbFactory from '../../dbFactory'
import {closeModal} from './../../../views/Category/action'

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
        isPending: (user.role === 'Teacher') ? false : true,
        created: db.firestore.FieldValue.serverTimestamp()
    }
    if(type === 'metadata') {
        db.firestore().collection('curriculum').doc(doc).update(fields)
        .then(function(){
            dispatch(closeModal())            
        })
        .catch(function(err) {
            dispatch({type: 'ERROR', err})
        });
    }else if(type !== 'metadata') {
        db.storage().ref(user.userId).child(fileName).getDownloadURL().then(url => {
            if(type === 'video') {
                metaData.src = url
                db.firestore().collection('curriculum').add(metaData)
                .then(function(docRef) {
                    dispatch({type: 'SET_DOC_REF', ref: docRef.id})
                })
                .catch(function(err) {
                    dispatch({type: 'ERROR', err})
                });
            } else if(type === 'thumb') {
                db.firestore().collection('curriculum').doc(doc).update({
                    thumb: url
                }).then(function(){
                })
                .catch(function(err) {
                    dispatch({type: 'ERROR', err})
                });
            }
        })       
    }
}


export const getContentFromDB = (dispatch, uid) => {
    db.firestore().collection("curriculum").where("userId", "==", uid)
    .onSnapshot(function(querySnapshot) {
        let content = [];
        querySnapshot.forEach(function(doc) {
            content.push(doc.data());
        });
        dispatch({type: 'GET_CONTENT',content})
    });
}
