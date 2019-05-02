import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const getAllCategory = () => {
  return getDbRef('subject')
    .doc('B95MoOWUo1V7rCNbN7hn')
    .get();
};

export const createSubjects = subjects => {
  return getDbRef('subject')
    .doc('B95MoOWUo1V7rCNbN7hn')
    .set(subjects);
};
