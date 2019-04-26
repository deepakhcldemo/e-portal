import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const getBannerFromDB = () => {
  return getDbRef('banner').where('page', '==', 'home');
};

export const getCurriculumFromDB = () => {
  return getDbRef('curriculum');
};

export const getTeacherFromDB = () => {
  return getDbRef('userProfiles').where('role', '==', 'Teacher');
};

export const getFeedbackFromDB = () => {
  return getDbRef('feedback');
};

export const getUserProfileFromDB = userId => {
  return getDbRef('userProfiles').where('userId', '==', userId);
};
