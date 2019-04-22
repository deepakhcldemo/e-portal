import { getTeachersFromDBBasedOnCategory } from '../../../database/dal/firebase/studentDal';


export const getTeachersBasedOnCateogy = (filterBy, filterBasedON ) => {
    
    return (dispatch) => {
        getTeachersFromDBBasedOnCategory(dispatch, filterBy, filterBasedON);
    }
}
