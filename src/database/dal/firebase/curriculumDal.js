import dbFactory from '../../dbFactory'

const db = dbFactory.create('firebase');

const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
};

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
        category: '',
        isPending: (user.role === 'Teacher') ? false : true,
        created: db.firestore.FieldValue.serverTimestamp()
    }
    if(type === 'metadata') {
        db.firestore().collection('curriculum').doc(doc).update(fields)
        .then(function(){
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

export const getCurriculumByTeacherId = (uid) => {
    return getDbRef('curriculum')
    .where('userId', '==', uid)
    .get();
}

export const getBannerFromDB = () => {
    return getDbRef("banner")
    .where("page", "==", "teacher")
    .get() 
}

export const getCurriculumFromDB = (uid) => {   
    return (uid) ? getDbRef("curriculum").where('userId', '==', uid) :  getDbRef("curriculum")
}
export const getReviewContentFromDB = (uid, status) => {
    return getDbRef("reviewVideo").where('tid', '==', uid).where('tStatus' , '==', status)
} 
export const getNotificationFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("notifications").get();       
}
