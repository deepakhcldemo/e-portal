import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
};

export const saveCommentDetails = commentDetails => {
    return getDbRef('feedback').doc().set(commentDetails);
};