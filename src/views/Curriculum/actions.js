import { getCategoryFromDB } from './../../database/dal/firebase/categoryDal'

export const getCategory = () => {
    return (dispatch) => {
        getCategoryFromDB(dispatch);
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
/* export const deleteCategory = () => {
    return {
        type: 'DELETE_CATEGORY',

    }
}
export const viewCategory = () => {
    return {
        type: 'VIEW_CATEGORY'
    }
} */
