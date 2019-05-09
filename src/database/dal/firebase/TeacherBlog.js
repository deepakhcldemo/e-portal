import dbFactory from '../../dbFactory';
import { toastr } from "react-redux-toastr";
const getDbRef = collectionName => {
    const db = dbFactory.create("firebase");
    const ref = db.firestore().collection(collectionName);
    return ref;
  };



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



export const getImageUrl = (name ,id) => {
    const db = dbFactory.create("firebase");
    return db
      .storage()
      .ref("blogs/" + id)
      .child(name)
      .getDownloadURL();
  };


  export const SaveBlog = blogDetails => {
    const db = dbFactory.create("firebase");
    db.firestore()
      .collection("Blogs")
      .doc(blogDetails.id)
      .set(blogDetails)
      .then(() => {
        toastr.success(" Request created successfully.");
      });
  };
  






