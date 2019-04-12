import dbFactory from '../../dbFactory';

export const getCurriculumFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    db.firestore().collection("curriculum").doc('0').get()
        .then(function(doc) {
            if (doc.exists) {                
                dispatch({type:'GET_CURRICULUM', category: [doc.data()]})
            } 
    }).catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}

export const manageCategoryFromDB = async (dispatch, tree, state, type) => {
    const db = dbFactory.create('firebase');    
    const treeData = await manageTree(tree, state, type);
    console.log(treeData);
    db.firestore().collection('category').doc('0').set(treeData[0])
    .then((res)=>{
        console.log(res)
        dispatch({type: 'ADD_CATEGORY', category: treeData})          
    }).catch(err => {
        dispatch({type: 'ERROR', err})
    })
}
