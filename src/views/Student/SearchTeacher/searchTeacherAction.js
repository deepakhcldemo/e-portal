import { getTeachersFromDBBasedOnCategory } from '../../../database/dal/firebase/studentDal';


export const getTeachersBasedOnCateogy = (selectedSubject) => {
    return (dispatch) => {
        getTeachersFromDBBasedOnCategory(dispatch,selectedSubject);
    }
}
