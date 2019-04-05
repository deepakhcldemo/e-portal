import { getCategoryIntoDB, addCategoryIntoDB/* , deleteCategory,editCategory */ } from './../../database/dal/firebase/categoryDal'

export const getCategory = () => {
    return (dispatch) => {
        getCategoryIntoDB(dispatch);
    }
}

export const addCategory = (pId, categoryName) => {    
    return (dispatch) => {
        addCategoryIntoDB(dispatch)        
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
