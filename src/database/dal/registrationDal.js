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
      if (userDetails && userDetails.additionalUserInfo.isNewUser) {
        getDbRef()
          .doc(userDetails.user.uid)
          .set({ username: user.username, userId: userDetails.user.uid });
      }
    })
    .catch(error => {
      console.log('error', error.message);
    });
};

export const recoverPassword = () => {
  const db = dbFactory.create('firebase');
  var actionCodeSettings = {
    url: 'http://localhost:3000/?email=EMAIL',

    handleCodeInApp: false
  };
  db.auth()
    .sendPasswordResetEmail('EMAIL', actionCodeSettings)
    .then(function() {
      // Password reset email sent.
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
    });
};
