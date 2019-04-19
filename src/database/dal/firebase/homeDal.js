import dbFactory from '../../dbFactory';

export const getBannerFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("banner")
    .where("page", "==", "home")
    .get()
 
}

export const getCurriculumFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("curriculum").get()        
}

export const getTeacherFromDB = () => {
    const db = dbFactory.create('firebase');
   return db.firestore().collection("userProfiles")
    .where("role", "==", "Teacher")
    .get();           
}
