import * as firebase from 'firebase';
// import firestore from 'firebase/firestore';

//const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: 'AIzaSyBGyM_1RrGVm3y0pNSLiz7ZbMLii9HfcEw',
  authDomain: 'e-project-4e023.firebaseapp.com',
  databaseURL: 'https://e-project-4e023.firebaseio.com',
  projectId: 'e-project-4e023',
  storageBucket: 'gs://e-project-4e023.appspot.com/',
  messagingSenderId: '994953111174'
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
