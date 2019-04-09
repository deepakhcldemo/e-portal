import dbFactory from '../../dbFactory';
import firebase from 'firebase';
export const  getStudentFromDB = (dispatch) => {
    const student = [];
    const db = dbFactory.create('firebase');
    db.firestore().collection('users').get()
            .then((querySnapshot) => {
                    querySnapshot.docs.forEach(doc => {
                        student.push(doc.data())
                  });
                dispatch({type:'GET_STUDENTS', student})
            }).catch(err => {
                dispatch({type: 'ERROR', err})
            })
    
}

// export const addCategoryIntoDB = (dispatch) => {
//     const db = dbFactory.create('firebase');
//     const user = db.auth().currentUser;
//     db.firestore().collection('categories').doc(user.uid).get()
//         .then((res)=>{
//             dispatch({type: 'ADD_CATEGORY', category: res.data()})          
//         }).catch(err => {
//             dispatch({type: 'ERROR', err})
//         })
// }
