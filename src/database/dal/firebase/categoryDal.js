import dbFactory from '../../dbFactory';

export const getCategoryIntoDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    db.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.firestore().collection('categories').doc(user.uid).get()
            .then((res) => {
                const category = (res.data())? res.data() : []
                dispatch({type:'GET_CATEGORY', category})
            }).catch(err => {
                dispatch({type: 'ERROR', err})
            })
        }
      });
    
    /* const user = db.auth().currentUser;
         */
}

export const addCategoryIntoDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    const user = db.auth().currentUser;
    db.firestore().collection('categories').doc(user.uid).get()
        .then((res)=>{
            dispatch({type: 'ADD_CATEGORY', category: res.data()})          
        }).catch(err => {
            dispatch({type: 'ERROR', err})
        })
}
