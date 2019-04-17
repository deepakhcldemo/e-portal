import dbFactory from '../../dbFactory';

const getDb = () => {
  return dbFactory.create('firebase');
};

export const changePassword = newPassword => {
  const user = getDb().auth().currentUser;

  user
    .updatePassword(newPassword)
    .then(function() {
      // Update successful.
    })
    .catch(function(error) {
      // An error happened.
    });
};
