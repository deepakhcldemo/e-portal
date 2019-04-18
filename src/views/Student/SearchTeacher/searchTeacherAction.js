import {getTeachersFromDBBasedOnCategory} from '../../../database/dal/firebase/studentDal'


export const getTeachersBasedOnCateogy = (dispatch , filterValue) => {
    debugger
    return (dispatch) => {
        getTeachersFromDBBasedOnCategory(dispatch, {value : filterValue});
    }
}