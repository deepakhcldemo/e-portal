import dbFactory from '../../dbFactory';

const getDbRef = () => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection('users');
  return ref;
};

export const saveRecord = userDetails => {
  return getDbRef()
    .doc(userDetails.userId)
    .set(userDetails);
};

export const fetchProviders = user => {
  const db = dbFactory.create('firebase');
  return db.auth().fetchSignInMethodsForEmail(user.username);
  // .then(providers => {
  //   console.log('providers', providers);
  //   if (providers.length === 0) {
  //     // create user
  //     return db
  //       .auth()
  //       .createUserWithEmailAndPassword(user.username, user.password);
  //   } else {
  //     //sign in user
  //     return db
  //       .auth()
  //       .signInWithEmailAndPassword(user.username, user.password);
  //   }
  // })
  // .then(userDetails => {
  //   console.log('user details password', userDetails);
  //   localStorage.setItem('user', JSON.stringify(userDetails));
  //   if (userDetails && userDetails.additionalUserInfo.isNewUser) {
  //     saveRecord({ username: user.username, userId: userDetails.user.uid });
  //   }
  // })
  // .catch(error => {
  //   console.log('error', error.message);
  // });
};

export const createUserWithEmail = user => {
  const db = dbFactory.create('firebase');
  return db.auth().createUserWithEmailAndPassword(user.username, user.password);
};

export const signInUserWithEmail = user => {
  const db = dbFactory.create('firebase');
  return db.auth().signInWithEmailAndPassword(user.username, user.password);
};

export const loginWithGoogle = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.GoogleAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const loginWithFacebook = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.FacebookAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const loginWithTwitter = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.TwitterAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const recoverPassword = email => {
  const db = dbFactory.create('firebase');
  let continueUrl = 'http://localhost:3000/?email=';
  if (process.env.NODE_ENV === 'production') {
    continueUrl = 'https://e-project-4e023.firebaseapp.com/?email=';
  }
  var actionCodeSettings = {
    url: continueUrl + email,
    handleCodeInApp: false
  };
  return db.auth().sendPasswordResetEmail(email, actionCodeSettings);
};
