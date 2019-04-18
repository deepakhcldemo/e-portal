import dbFactory from '../../dbFactory';

export const getBannerFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("banner")
    .where("page", "==", "home")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data());
        })
        dispatch({type:'GET_BANNER', bannerCarouselData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}

export const getCurriculumFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("curriculum").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data())
        })
        dispatch({type:'GET_CURRICULUM', curriculumData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}

export const getTeacherFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("teacher").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data());
        })
        dispatch({type:'GET_TEACHER', teacherCurriculumData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}
