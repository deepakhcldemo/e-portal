import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};


export const getTeacherDetailFromDB = (userId) => {
    return getDbRef('userProfiles')
    .where('userId', '==', userId)
    .get();
}

export const getTotalRating = (collection, userId) => {
  return getDbRef(collection)
    .where('userId', '==', userId)
    .get();
}
