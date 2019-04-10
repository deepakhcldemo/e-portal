import { getCategoryFromDB, manageCategoryFromDB } from './../../database/dal/firebase/categoryDal'

export const getCategory = () => {
    return (dispatch) => {
        getCategoryFromDB(dispatch);
    }
}
export const manageCategory = (tree, state, type) => {
    return (dispatch) => {
        manageCategoryFromDB(dispatch, tree, state, type);
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