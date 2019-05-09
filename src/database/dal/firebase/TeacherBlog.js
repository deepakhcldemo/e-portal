import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
    const db = dbFactory.create("firebase");
    const ref = db.firestore().collection(collectionName);
    return ref;
  };

export const getBlogListFromDBOrCount = (startAt, itemsPerPage, count = false) => {
    let query = getDbRef("blogs").orderBy("created", "desc");
    if(!count)
    //query = query.startAt(startAt).limit(itemsPerPage);
    console.log(query)
    return query;
}

export const getBlogsFromDB = (dispatch) => {
    let data = [];
    const db = dbFactory.create('firebase');
    db.firestore().collection("Blogs")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data(), 'BlogsList');
            data.push(doc.data())
            console.log('data', data);
        })
        dispatch({type:'GET_BLOGSLIST', BlogsListData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}






