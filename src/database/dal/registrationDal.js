import dbFactory from '../dbFactory';

const getDbRef = user => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection('users');
  return ref;
};

export const createUser = user => {
  const db = dbFactory.create('firebase');
  db.auth()
    .fetchProvidersForEmail(user.username)
    .then(providers => {
      if (providers.length === 0) {
        // create user
        return db
          .auth()
          .createUserWithEmailAndPassword(user.username, user.password);
      } else {
        //sign in user
        return db
          .auth()
          .signInWithEmailAndPassword(user.username, user.password);
      }
    })
    .then(userDetails => {
      if (userDetails.additionalUserInfo.isNewUser) {
        getDbRef()
          .doc(userDetails.user.uid)
          .set({ username: user.username, userId: userDetails.user.uid });
      }
    })
    .catch(error => {
      console.log('error', error.message);
    });
};
