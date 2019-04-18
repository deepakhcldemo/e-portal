import {getTeachersFromDBBasedOnCategory} from '../../../database/dal/firebase/studentDal'


export const getTeachersBasedOnCateogy = (filterValue) => {
    debugger
    return (dispatch) => {
        getTeachersFromDBBasedOnCategory(dispatch, filterValue);
    }
}