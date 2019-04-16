import { getCategoryFromDB } from './../../database/dal/firebase/categoryDal'
import { getCurrentUserFromDB, saveFileMetaDataFromDB } from './../../database/dal/firebase/curriculumDal'

export const getCurrentUser = () => {
    return (dispatch) => {
        getCurrentUserFromDB(dispatch);
    }
}
export const getCategory = () => {
    return (dispatch) => {
        getCategoryFromDB(dispatch);
    }
}
export const saveFileMetaData = (fileName, uid) => {
    return (dispatch) => {
        saveFileMetaDataFromDB(dispatch, fileName, uid);
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
}

export const closeModal = () => {
    return {
        type: 'CLOSE'
    }
}
 *//* export const deleteCategory = () => {
    return {
        type: 'DELETE_CATEGORY',

    }
}
export const viewCategory = () => {
    return {
        type: 'VIEW_CATEGORY'
    }
} */
