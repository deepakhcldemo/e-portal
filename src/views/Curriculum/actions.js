import { saveFileMetaDataFromDB } from './../../database/dal/firebase/curriculumDal'

/* export const getCurrentUser = () => {
    return (dispatch) => {
        getCurrentUserFromDB(dispatch);
    }
} */

export const saveFileMetaData = (fileName, user, docRef, fields, type) => {
    return (dispatch) => {
        saveFileMetaDataFromDB(dispatch, fileName, user, docRef, fields, type);
    }
}
/* export const getCurrentUser = () => {
    return (dispatch) => {
        getCurrentUserFromDB(dispatch);
    }
}
export const getStorage = () => {
    return (dispatch) => {
        getStorageRef(dispatch);
    }
}

export const openModal = () => {
    return {
        type: 'OPEN'
    }
}*/
